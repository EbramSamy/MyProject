
var MyApp = angular.module("MyApp", ['ngRoute', 'StudentService']);



MyApp.config(['$httpProvider', function ($httpProvider) {
    var interceptor = function (TokeService, $q, $location) {

        return {
            request: function (config) {
                var currentToken = TokeService.CurrentToken;
                if (currentToken != null) {
                    config.headers['Authorization'] = 'Bearer ' + currentToken.access_token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {

                    return $q.reject(rejection);
                }
                if (rejection.status === 403) {

                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }

        }
    }
    var params = ['TokeService', '$q', '$location'];
    interceptor.$inject = params;
    $httpProvider.interceptors.push(interceptor);
}]);

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
        });
    //.otherwise({
    //    redirectTo: '/Home'
    //});

}]);


MyApp.controller("LogInController", function ($scope, StudentAPI_Token) {
    $scope.isNavBarVisible = false;
    $scope.isLogInVisible = true;
    $scope.isLoaderVisible = false;
    $scope.getToken = function () {
        $scope.isLoaderVisible = true;
        var getToken = StudentAPI_Token.getToken;
        var onSuccess = function (response) {

            $scope.token = StudentAPI_Token.token;
            $scope.isNavBarVisible = true;
            $scope.isLogInVisible = false;
            $scope.isLoaderVisible = false;
        };

        var onFail = function (reason) {
            $scope.error = reason;
        };

        getToken($scope.username, $scope.password).then(onSuccess, onFail);
    };


});


MyApp.controller("AddController", function ($scope, StudentAPI) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = position;
            console.log(position)
            


            var codeLatLng = function (lat, lng) {
                var geocoder;
                geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results[0].formatted_address);
                        $scope.S_Address = results[0].formatted_address;
                        $scope.$apply();
                    }

                });
            };

            codeLatLng(position.coords.latitude, position.coords.longitude);




        });


    }
    $scope.addStudent = function () {
        var studentToAdd = {
            'S_Name': $scope.S_Name,
            'S_PhoneNo': $scope.S_PhoneNo,
            'S_Address': $scope.S_Address
            
        };
        var onSuccess = function (response) {
            alert("Student Added");
            $scope.S_Name = undefined;
            $scope.S_PhoneNo = undefined;
            $scope.S_Address = undefined;

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
        $scope.S_PhoneNo = sItem.S_PhoneNo;
        $scope.S_Address = sItem.S_Address;
    };

    $scope.updateStudent = function () {
        var studentToUpdate = {
            'S_Id': $scope.selectedItem,
            'S_Name': $scope.S_Name,
            'S_PhoneNo': $scope.S_PhoneNo,
            'S_Address': $scope.S_Address
        };

        var onSuccessUpdate = function (response) {
            alert("Student Updated");
            $scope.selectedItem = "Select Student";
            $scope.S_Name = undefined;
            $scope.S_PhoneNo = undefined;
            $scope.S_Address = undefined;
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
        $scope.S_PhoneNo = sItem.S_PhoneNo;
        $scope.S_Address = sItem.S_Address;
    };

    $scope.deleteStudent = function () {
        var studentToDelete = {
            'S_Id': $scope.selectedItem
        };

        var onSuccessDelete = function (response) {
            alert("Student Deleted");
            $scope.selectedItem = "Select Student";
            $scope.S_Name = undefined;
            $scope.S_PhoneNo = undefined;
            $scope.S_Address = undefined;
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
    $scope.isTableVisible = false;
    $scope.isLoaderVisible = true;
    var onSuccess = function (response) {
        $scope.students = response.data;
        $scope.isLoaderVisible = false;
        $scope.isTableVisible = true;

    };

    var onFail = function (reason) {
        $scope.error = reason;
    };

    var getStudents = StudentAPI.getStudents;


    getStudents().then(onSuccess, onFail);



});


