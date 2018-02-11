var app = angular.module('myApp', ['ngMaterial'], ['angularjs-dragula(angular)']);

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

app.directive('myOnKeyDownCall', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            scope.$apply(function (){
                scope.$eval(attrs.ngEnter);
            });
            event.preventDefault();
        });
    };
});