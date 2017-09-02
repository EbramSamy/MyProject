﻿
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

MyApp.controller("AddController", function ($scope, StudentAPI) {
    $scope.addStudent = function () {
        var studentToAdd = {
            'S_Name': $scope.S_Name
        };
        var onSuccess = function (response) {
            alert("Student Added");
            $scope.S_Name = undefined;
        };

        var onFail = function (reason) {
            $scope.error = reason;
            alert("Error in Adding" + reason);
        };

        var addStudent = StudentAPI.addStudent;


        addStudent(studentToAdd).then(onSuccess, onFail);

    };
   
});

MyApp.controller("EditController", function ($scope, StudentAPI) {

    $scope.selectedItem = "Select Student";
    $scope.isDeleteVisible = false;

    //#region GetStudents

    var onSuccessGetStudents = function (response) {
        $scope.students = response.data;
    };

    var onFailGetStudents = function (reason) {
        $scope.error = reason;
    };

    var getStudents = StudentAPI.getStudents;

    getStudents().then(onSuccessGetStudents, onFailGetStudents);

    //#endregion GetStudents


    $scope.itemSelected = function (sItem) {
        $scope.selectedItem = sItem.S_Id;
        $scope.isDeleteVisible = true;
        $scope.S_Name = sItem.S_Name;
    };

    $scope.updateStudent = function () {
        var studentToUpdate = {
            'S_Id': $scope.selectedItem,
            'S_Name': $scope.S_Name
        };

        var onSuccessUpdate = function (response) {
            alert("Student Updated");
            $scope.selectedItem = "Select Student";
            $scope.S_Name = undefined;
            $scope.isDeleteVisible = false;
            getStudents().then(onSuccessGetStudents, onFailGetStudents);
        };

        var onFailUpdate = function (reason) {
            $scope.error = reason;
            alert("Error in Updating" + reason);
        };

        var editStudent = StudentAPI.editStudent;


        editStudent(studentToUpdate).then(onSuccessUpdate, onFailUpdate);
    };
});

MyApp.controller("DeleteController", function ($scope, StudentAPI) {
    $scope.selectedItem = "Select Student";
    $scope.isDeleteVisible = false;

    //#region GetStudents

    var onSuccessGetStudents = function (response) {
        $scope.students = response.data;
    };

    var onFailGetStudents = function (reason) {
        $scope.error = reason;
    };

    var getStudents = StudentAPI.getStudents;

    getStudents().then(onSuccessGetStudents, onFailGetStudents);

    //#endregion GetStudents


    $scope.itemSelected = function (sItem) {
        $scope.selectedItem = sItem.S_Id;
        $scope.isDeleteVisible = true;
        $scope.S_Name = sItem.S_Name;
    };

    $scope.deleteStudent = function () {
        var studentToDelete = {
            'S_Id': $scope.selectedItem
        };

        var onSuccessDelete = function (response) {
            alert("Student Deleted");
            $scope.selectedItem = "Select Student";
            $scope.S_Name = undefined;
            $scope.isDeleteVisible = false;
            getStudents().then(onSuccessGetStudents, onFailGetStudents);
        };

        var onFailDelete = function (reason) {
            $scope.error = reason;
            alert("Error in Delete" + reason);
        };

        var deleteStudent = StudentAPI.deleteStudent;


        deleteStudent(studentToDelete).then(onSuccessDelete, onFailDelete);
    };
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


