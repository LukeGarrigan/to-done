var app = angular.module('myApp', ['ngMaterial', 'ui.sortable', 'ui.bootstrap.contextMenu']);


app.directive("loginOrRegister", function(){
    return {
        templateUrl: 'login-or-register.html'
    }
});

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

