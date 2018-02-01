app.controller("myCtrl", function ($scope, $http) {
    $http.get("/task/getTasks")
        .then(function(response){
           $scope.taskInfo = response.data;
           $scope.totalTasks = response.data.length;
           $scope.toDoCount = 0;
           $scope.doingCount = 0;
           $scope.completedCount = 0;


            for(var i=0; i<$scope.taskInfo.length; i++){
               if($scope.taskInfo[i].status === 'todo'){
                   $scope.toDoCount++;
               }else if($scope.taskInfo[i].status === 'doing'){
                   $scope.doingCount++;
               }else if($scope.taskInfo[i].status === 'done') {
                   $scope.completedCount++;
               }
           }
        });




    $scope.addTask = function(task){
        document.getElementById("output").value = "";

        for(var i=0; i<$scope.taskInfo.length; i++){
            if(task.message === $scope.taskInfo[i].message){
                // do some kind of popup
                return;
            }
        }

        task.status = "todo";
        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response){
            $scope.message = response.data.message;
            $scope.taskInfo.push(response.data);
            $scope.totalTasks++;
            $scope.toDoCount++;
            // set to null, so on submit of a new task the status
            // doesn't have an affect on the message count
            $scope.task = null;
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
        if(task !== undefined) {

            // task has already been submitted, reset the count
            if (task.status === undefined) {
                return task.message.length;
            }
        }
        return 0;
    }






});