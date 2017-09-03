var StudentService = angular.module("StudentService", []);

StudentService.factory('StudentAPI', function ($http) {
   
    var urlBase = "http://localhost:60793/api/";

    var StudentAPI = {};
    
    StudentAPI.getStudents = function (student) {
        return $http.get(urlBase+"students");
    };


    StudentAPI.addStudent = function (studentToAdd) {
        return $http.post(urlBase + "students/", studentToAdd);
    };

    StudentAPI.editStudent = function (studentToUpdate) {
        return $http({
            method: 'put',
            url: urlBase + "students/" + studentToUpdate.S_Id,
            data: studentToUpdate
        });
    };

    StudentAPI.deleteStudent = function (studentToDelete) {
        return $http({
            method: 'delete',
            url: urlBase + "students/" + studentToDelete.S_Id
        });
    };

    return StudentAPI;
});

StudentService.factory('TokeService', function () {
    var TokeService = {};
    
    return TokeService;
})

StudentService.factory('StudentAPI_Token', ['$http', '$q', 'TokeService', function ($http, $q, TokeService) {
    var urlBase = "http://localhost:60793/";
    var StudentAPI_Token = {};

    TokeService.CurrentToken = null;
    StudentAPI_Token.getToken = function (username,password) {
        var obj = { 'username': username, 'password': password, 'grant_type': 'password' };
        Object.toparams = function ObjectsToParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        }

        var defer = $q.defer();
        $http({
            method: 'post',
            url: urlBase + "/token",
            data: Object.toparams(obj),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
            TokeService.CurrentToken = response.data;
            StudentAPI_Token.token = response.data;
            defer.resolve(response.data);
        }, function (error) {
            defer.reject(error.data);
        })
        return defer.promise;
    }
    StudentAPI_Token.logout = function () {
        TokeService.CurrentToken = null;
        
    }
    return StudentAPI_Token;
}])