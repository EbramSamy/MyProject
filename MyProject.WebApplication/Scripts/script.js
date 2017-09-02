
var MyApp = angular.module("MyApp", ['ngRoute', 'StudentService']);


MyApp.config(['$routeProvider', function ($routeProvider) {


    $routeProvider.
        when('/Add', {
            templateUrl: 'Views/add.html',
            controller: 'AddController'
        }).
        when('/Edit', {
            templateUrl: 'Views/edit.html',
            controller: 'EditController'
        }).
        when('/Delete', {
            templateUrl: 'Views/delete.html',
            controller: 'DeleteController'
        }).
        when('/Home', {
            templateUrl: 'Views/home.html',
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/Home'
        });

}]);

MyApp.controller("AddController", function ($scope) {
    $scope.message = "in Add View";

});

MyApp.controller("EditController", function ($scope) {
    $scope.message = "in Edit View";

});

MyApp.controller("DeleteController", function ($scope) {
    $scope.message = "in Delete View";

});

MyApp.controller("HomeController", function ($scope, StudentAPI) {

        var onSuccess = function (response) {
        $scope.students = response.data;
    };

    var onFail = function (reason) {
        $scope.error = reason;
    };

    var getStudents = StudentAPI.getStudents;


    getStudents().then(onSuccess, onFail);



});


