var StudentService = angular.module("StudentService", []);

StudentService.factory('StudentAPI', function ($http) {
   
    var urlBase = "http://localhost:60793/api/";
    var StudentAPI = {};
    
    StudentAPI.getStudents = function () {
        return $http.get(urlBase+"student");
    };

    return StudentAPI;
});