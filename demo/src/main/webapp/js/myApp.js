var app = angular.module('myApp', []);

app.directive("addNewTask", function(){
    return {
        templateUrl: 'add-new-task.html'
    };
});

app.directive("displayTasks", function(){
    return {
        templateUrl: 'display-tasks.html'
    };
});