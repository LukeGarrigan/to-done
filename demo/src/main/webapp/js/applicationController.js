app.controller("applicationController", function ($scope) {


    $scope.userId = "";


    $scope.isUserLoggedIn = function(){
        return $scope.userId !== "" && $scope.userId !== null;
    }

});