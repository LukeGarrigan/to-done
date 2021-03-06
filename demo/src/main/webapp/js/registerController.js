app.controller("registerController", function ($scope, $http) {


    $scope.user = {};
    $scope.password = "";
    $scope.email = "";
    $scope.isAuthorised = false;
    $scope.loginErrorMessage = "";
    $scope.registerErrorMessage = "";

    $scope.registerUser = function () {
        if (!passwordsMatch()) {
            $scope.registerErrorMessage = "Passwords do not match";
        } else {
            registerNewUser();
        }
    };

    var passwordsMatch = function () {
        return $scope.password === $scope.confirmPassword;
    };

    var registerNewUser = function () {
        $scope.user.password = $scope.password;
        $scope.user.confirmPassword = $scope.confirmPassword;
        $scope.user.email = $scope.email;

        var userAsJson = JSON.stringify($scope.user);
        $http.post("user/create", userAsJson, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response) {
            $scope.$parent.userId = response.data.id;
            $scope.isAuthorised = true;
        }, function myFailure(response) {
            $scope.registerErrorMessage = response.data.message;
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
            if (response.data !== '' && response !== null) {
                $scope.$parent.userId = response.data.id;
                $scope.isAuthorised = true;
            }
        }, function errorCallback(response) {
            $scope.loginErrorMessage = response.data.message;
        });
    };


});