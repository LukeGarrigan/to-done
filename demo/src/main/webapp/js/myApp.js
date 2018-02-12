var app = angular.module('myApp', ['ngMaterial', 'ngDragDrop']);

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

