app.controller("myCtrl", function ($scope, $http) {
    $http.get("/task/getTasks")
        .then(function(response){
           $scope.taskInfo = response.data;
           $scope.totalTasks = response.data.length;
        });

    $scope.completedCount = 0;



    $scope.addTask = function(task){
        document.getElementById("output").value = "";
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
        });
    };

    $scope.deleteTask = function(task){
        $http.delete("task/deleteTask/" + task.id);



        for (var i = $scope.taskInfo.length - 1; i >= 0; i--) {
            if ($scope.taskInfo[i].id === task.id) {
                if($scope.taskInfo[i].status === 'done'){
                    $scope.completedCount--;
                }
                $scope.taskInfo.splice(i, 1);
            }
        }
        $scope.totalTasks--;


    };

    $scope.moveRight = function(task){

        if(task.status === 'todo'){
            task.status='doing';
        }else if(task.status ==='doing'){
            task.status='done';
            $scope.completedCount++;
        }

        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    };

    $scope.moveLeft = function(task){

        if(task.status === 'doing'){
            task.status='todo';
        }else if(task.status ==='done'){
            task.status='doing';
            $scope.completedCount--;
        }

        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    };



    $scope.countLimit = function(){
        document.getElementById("output").onkeyup = function(){
            var count = this.value.length;
        }
    };

    $scope.getTextCountColour = function(count){
        if(70-count < 0){
            return "red";
        }else{
            return "black";
        }
    };






});