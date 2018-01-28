app.controller("myCtrl", function ($scope, $http) {


    $scope.taskInfo = [];


    $scope.addTask = function(hello){
        hello.status = "todo";
        var json = JSON.stringify(hello);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response){
            $scope.message = response.data.message;
            $scope.taskInfo.push(response.data);
        });
    };

    $scope.deleteTask = function(task){
        $http.delete("task/deleteTask/" + task.id);


        var toBeDeleted = {};
        var indexOfTask;

        angular.forEach($scope.taskInfo, function(value, index){
            if(value.id === task.id){
                toBeDeleted = value;
            }
        });

        indexOfTask = $scope.taskInfo.indexOf(toBeDeleted);
        $scope.taskInfo.splice(indexOfTask);
    };

    $scope.moveRight = function(task){

        if(task.status === 'todo'){
            task.status='doing';
        }else if(task.status ==='doing'){
            task.status='done';
        }

        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    }

    $scope.moveLeft = function(task){

        if(task.status === 'doing'){
            task.status='todo';
        }else if(task.status ==='done'){
            task.status='doing';
        }

        var json = JSON.stringify(task);
        $http.post("task/update", json, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

    }




});