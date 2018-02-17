app.controller("myCtrl", function ($scope, $http, $mdDialog) {
    $http.get("/task/getTasks").then(function(response){
           $scope.taskInfo = response.data;
           $scope.totalTasks = response.data.length;
           $scope.toDoCount = 0;
           $scope.doingCount = 0;
           $scope.completedCount = 0;


            for(var i=0; i< $scope.taskInfo.length; i++){
               $scope.taskInfo[i].drag = true;
               if( $scope.taskInfo[i].status === 'todo'){
                   $scope.toDoCount++;
               }else if( $scope.taskInfo[i].status === 'doing'){
                   $scope.doingCount++;
               }else if($scope.taskInfo[i].status === 'done') {
                   $scope.completedCount++;
               }
           }
        });


    $scope.sortableOptions = {
        stop: function(e, ui){
            var status = ui.item.sortable.model.status;
            var count =0;
            var tasksToBeUpdated = [];
            for(var i=0; i<$scope.taskInfo.length; i++){
                if($scope.taskInfo[i].status === status){
                    $scope.taskInfo[i].sequenceNumber = count;
                    tasksToBeUpdated[count] = $scope.taskInfo[i];
                    count++;
                }
            }

            updateTasks(tasksToBeUpdated);

        }
    };


    function updateTasks(tasks){
        var json = JSON.stringify(tasks);
        $http.post("task/updateTasksSequenceNumbers", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }



    /**
     *
     * Checks whether a task is valid, and displays popups if not!
     *
     * @param task
     * @param ev
     * @returns {boolean}
     */
    $scope.isValidTask = function(task, ev){
        if(70-task.message.length < 0){
            $scope.showAlert(ev, "Too long");
            return false;
        }
        for(var i=0; i<$scope.taskInfo.length; i++){
            if(task.message === $scope.taskInfo[i].message){
                // to check that its not checking its own task
                if(task.id !== $scope.taskInfo[i].id){
                    // do some kind of popup
                    $scope.showAlert(ev, "Exists");
                    return false;
                }
            }
        }
        return true;
    };



    $scope.addTask = function(task,status, ev){
        task.status = status;

        // check highest sequence number in current column
        var highestNumber = -1;
        for(var i=0; i< $scope.taskInfo.length; i++) {
            if($scope.taskInfo[i].sequenceNumber > highestNumber && $scope.taskInfo[i].status === status){
                highestNumber = $scope.taskInfo[i].sequenceNumber;
            }
        }
        // we want the sequence to be the next highest as tasks are added to the bottom
        highestNumber = highestNumber +1;
        task.sequenceNumber = highestNumber;

        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response){
            $scope.message = response.data.message;

            // check first that the task isn't in the task list

            var exists = false;
            for(var i =0; i< $scope.taskInfo.length; i++){
                if(response.data.id===$scope.taskInfo[i].id){
                    $scope.taskInfo[i].message = response.data.message;
                    exists = true;
                    break;
                }
            }
            if(!exists){
                $scope.taskInfo.push(response.data);
                $scope.totalTasks++;
                if(response.data.status==="todo"){
                    $scope.toDoCount++;
                }else if(response.data.status==="doing"){
                    $scope.doingCount++;
                }else if(response.data.status==="done"){
                    $scope.completedCount++;
                }

                // set to null, so on submit of a new task the status
                // doesn't have an affect on the message count
                $scope.task = null;
            }

        });
    };

    $scope.deleteTask = function(task){
        $http.delete("task/deleteTask/" + task.id);



        for (var i = $scope.taskInfo.length - 1; i >= 0; i--) {
            if ($scope.taskInfo[i].id === task.id) {
                if($scope.taskInfo[i].status === 'done'){
                    $scope.completedCount--;
                }else if ($scope.taskInfo[i].status === 'todo'){
                    $scope.toDoCount--;
                }else if ($scope.taskInfo[i].status === 'doing'){
                    $scope.doingCount--;
                }
                $scope.taskInfo.splice(i, 1);
            }
        }
        $scope.totalTasks--;


    };


    /**
     * shifting the task to the right
     *
     * @param task
     */
    $scope.moveRight = function(task){

        if(task.status === 'todo'){
            task.status='doing';
            $scope.toDoCount--;
            $scope.doingCount++;
        }else if(task.status ==='doing'){
            task.status='done';
            $scope.completedCount++;
            $scope.doingCount--;
        }
        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    };


    /**
     *
     * shifting the task to the left
     *
     * @param task
     */
    $scope.moveLeft = function(task){

        if(task.status === 'doing'){
            task.status='todo';
            $scope.doingCount--;
            $scope.toDoCount++;
        }else if(task.status ==='done'){
            task.status='doing';
            $scope.completedCount--;
            $scope.doingCount++;
        }

        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    };


    /**
     *
     * If the user writes over the specified character count, the text goes red to inform them of their naughtiness
     * @param count
     * @returns {string}
     */
    $scope.getTextCountColour = function(count){
        if(70-count < 0){
            return "red";
        }else{
            return "black";
        }
    };

    /**
     * Returns the count a tasks message,
     * @param task
     * @returns {number}
     */
    $scope.getTextCount = function(task){
        if(task !== undefined && task != null) {
            // task has already been submitted, reset the count
            if (task.status == null) {
                return task.message.length;
            }
        }
        return 0;
    };


    $scope.showAlert = function(ev, message) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(message==='Too long' ? 'Come on, keep it short!' : 'The task already exists!')
                .textContent(message==='Too long' ? 'Make your task title nice and short, if you need more space maybe consider splitting the task into multiple tasks!' : 'Look at your board silly, its already there!')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    $scope.showPrompt = function(ev, status) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Create a new task!')
            .textContent('Be sure to keep it short and sweet!')
            .placeholder('Task')
            .ariaLabel('New Task')
            .initialValue('')
            .targetEvent(ev)
            .ok('Add!')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            task = {};
            task.message = result;
            if($scope.isValidTask(task, ev)){
                $scope.addTask(task, status, ev);
            }

        }, function() {
            $scope.status = 'You didn\'t name your dog.';
        });
    };

    $scope.editTask = function(ev, task) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Edit your task!')
            .textContent('Be sure to keep it short and sweet!')
            .placeholder('Task')
            .ariaLabel('New Task')
            .initialValue(task.message)
            .targetEvent(ev)
            .ok('Submit!')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {

            var temp = task.message;
            task.message = result;
            if($scope.isValidTask(task, ev)){
                $scope.addTask(task, task.status, ev);
            }else{
                setTimeout(function() {
                    $scope.editTask(ev, task);
                }, 2000);
            }
            task.message = temp;

        });
    };


    $scope.showConfirm = function(ev, task) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this task?')
            .textContent('There will be no trace of this task, it will disappear into the ether!')
            .ariaLabel('')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(function() {
            $scope.deleteTask(task);
        });
    };



});