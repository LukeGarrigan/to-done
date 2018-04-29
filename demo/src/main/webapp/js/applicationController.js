app.controller("registerController", function ($scope, $http) {


    $scope.user = {};

    $scope.username = "";
    $scope.password = "";
    $scope.email = "";

    $scope.isAuthorised = false;

    $scope.registerUser = function () {
        $scope.user.username = $scope.username;
        $scope.user.password = $scope.password;
        $scope.user.email = $scope.email;

        var userAsJson = JSON.stringify($scope.user);
        $http.post("user/create", userAsJson, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response) {
            if (userAlreadyExists(response.data)) {

            } else {
                $scope.isAuthorised = true;
            }
        });
    };


    function userAlreadyExists(data) {
        return data === null || data === "";
    }


});