var url = "http://localhost:60793/api/student/";

var myapp = angular.module("myApp", []);




var MainController = function ($scope, $http) {

    var onSuccess = function (response) {
        $scope.students = response.data;
        console.log(response.data + "Here");
    };

    var onFail = function (reason) {
        $scope.error = reason;
    };

    var getStudents = function () {
        $http.get(url)
            .then(onSuccess, onFail);
    };

    getStudents();
};

myapp.controller("MainController", MainController);