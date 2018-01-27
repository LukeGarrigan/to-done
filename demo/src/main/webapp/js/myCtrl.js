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
    }


});