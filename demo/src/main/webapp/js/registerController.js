app.controller("registerController", function ($scope, $http) {


    $scope.user = {};

    $scope.password = "";
    $scope.email = "";

    $scope.isAuthorised = false;

    $scope.registerUser = function () {
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
                $scope.$parent.userId = response.data.id;
                $scope.isAuthorised = true;
            }
        });
    };

    $scope.loginUser = function () {
        $scope.user.password = $scope.password;
        $scope.user.email = $scope.email;

        var userAsJson = JSON.stringify($scope.user);
        $http.post("user/login", userAsJson, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response) {
            if(response.data !== '' && response !== null) {
                $scope.$parent.userId = response.data.id;
                $scope.isAuthorised = true;
            }
        });
    };


    function userAlreadyExists(data) {
        return data === null || data === "";
    }


});