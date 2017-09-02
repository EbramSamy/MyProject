var StudentService = angular.module("StudentService", []);

StudentService.factory('StudentAPI', function ($http) {
   
    var urlBase = "http://localhost:60793/api/";
    var StudentAPI = {};
    
    StudentAPI.getStudents = function (student) {
        return $http.get(urlBase+"student");
    };


    StudentAPI.addStudent = function (studentToAdd) {
        return $http.post(urlBase + "student/", studentToAdd);
    };

    StudentAPI.editStudent = function (studentToUpdate) {
        return $http({
            method: 'put',
            url: urlBase + "student/" + studentToUpdate.S_Id,
            data: studentToUpdate
        });
    };

    StudentAPI.deleteStudent = function (studentToDelete) {
        return $http({
            method: 'delete',
            url: urlBase + "student/" + studentToDelete.S_Id
        });
    };

    return StudentAPI;
});