app.controller("myCtrl", function ($scope, $http, $mdDialog) {
    $http.get("/task/getTasks").then(function(response){
           $scope.taskInfo = response.data;
           $scope.totalTasks = response.data.length;
           $scope.toDoCount = 0;
           $scope.doingCount = 0;
           $scope.completedCount = 0;

           $scope.todo = [];
           $scope.doing = [];
           $scope.done = [];
            for(var i=0; i< $scope.taskInfo.length; i++){
               $scope.taskInfo[i].drag = true;
               if( $scope.taskInfo[i].status === 'todo'){
                   $scope.todo.push($scope.taskInfo[i]);
                   $scope.toDoCount++;
               }else if( $scope.taskInfo[i].status === 'doing'){
                   $scope.doing.push($scope.taskInfo[i]);
                   $scope.doingCount++;
               }else if($scope.taskInfo[i].status === 'done') {
                   $scope.done.push($scope.taskInfo[i]);
                   $scope.completedCount++;
               }
           }
        });




    $scope.sortableOptions = {
        connectWith: ".apps-container",

        stop: function(e, ui){
            var movedColumn = false;
            if($scope.toDoCount !== $scope.todo.length){
                movedColumn = true;
                for(var i=0; i< $scope.todo.length; i++){
                    $scope.todo[i].status="todo";
                    $scope.todo[i].sequenceNumber = i;
                }
                $scope.toDoCount = $scope.todo.length;
                if($scope.toDoCount > 0){
                    updateTasksSequenceNumbers($scope.todo);
                }
            }

            if($scope.doingCount !== $scope.doing.length){
                movedColumn = true;
                for(var i=0; i< $scope.doing.length; i++){
                    $scope.doing[i].status="doing";
                    $scope.doing[i].sequenceNumber = i;
                }
                $scope.doingCount = $scope.doing.length;
                if($scope.doingCount > 0){
                    updateTasksSequenceNumbers($scope.doing);
                }
            }

            if($scope.completedCount !== $scope.done.length){
                movedColumn = true;
                for(var i=0; i< $scope.done.length; i++){
                    $scope.done[i].status="done";
                    $scope.done[i].sequenceNumber = i;
                }
                $scope.completedCount = $scope.done.length;

                if($scope.completedCount > 0){
                    updateTasksSequenceNumbers($scope.done);
                }
            }


            // some ordering has changed within one column
            if(!movedColumn){
                var status = ui.item.sortable.model.status;

                if(status === "todo"){
                    updateOneColumn(status ,$scope.todo);
                }else if(status === "doing"){
                    updateOneColumn(status, $scope.doing);
                }else if(status === "done"){
                    updateOneColumn(status, $scope.done);
                }
            }
        }
    };

    function updateOneColumn(status, column) {
        for(var i=0; i<column.length; i++){
                column[i].sequenceNumber = i;
            }
        updateTasksSequenceNumbers(column);
    }


    function updateTasksSequenceNumbers(tasks){
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
                    $scope.todo.push(response.data);
                    $scope.toDoCount++;
                }else if(response.data.status==="doing"){
                    $scope.doing.push(response.data);
                    $scope.doingCount++;
                }else if(response.data.status==="done"){
                    $scope.done.push(response.data);
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
        if(task.status === "todo"){
            for(var i =$scope.todo.length -1; i>=0 ; i--){
                if($scope.todo[i].id === task.id){
                    $scope.todo.splice(i, 1);
                }
            }
            task.toDoCount--;
        }else if(task.status === "doing"){
            for(var i =$scope.doing.length -1; i>=0; i--){
                if($scope.doing[i].id === task.id){
                    $scope.doing.splice(i, 1);
                }
            }
        }else if(task.status === "done"){
            for(var i =$scope.done.length -1; i>=0; i--){
                if($scope.done[i].id === task.id){
                    $scope.done.splice(i, 1);
                }
            }
        }

        $scope.totalTasks--;


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