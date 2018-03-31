app.controller("register", function ($scope, $http) {


    $scope.user = {};

    $scope.username = "";
    $scope.password = "";
    $scope.email = "";


    $scope.registerUser = function() {
        $scope.user.username = $scope.username;
        $scope.user.password = $scope.password;
        $scope.user.email = $scope.email;

        var userAsJson = JSON.stringify($scope.user);
        $http.post("user/update", userAsJson, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    };


});