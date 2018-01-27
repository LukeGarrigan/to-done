var app = angular.module("myApp", []);


app.directive("myTestDirective", function(){
    return {
        template: "<h1> My To-Done List</h1>"
    };

});