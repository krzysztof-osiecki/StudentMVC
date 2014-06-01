var app = angular.module('student', []);
//TODO gdzieś na koniec ogarnac jquery z angularem
app.controller('MainCtrl', function($scope,$http) {
  $scope.name = "Felipe";
  $scope.pokazStudentow=function(){
	$http.get('/AngularSpringApp/studenci/lista').
                success(function(data) {
                $scope.studenci = data;
                console.log(data);
            });
        }
  $scope.ping=function(){
		$http.get('/AngularSpringApp/studenci/ping').
	                success(function(data) {
	                	alert(data);
	            });
	        }
  $scope.getWykladyStudenta=function(studentId){
	  $http.get('/AngularSpringApp/studenci/wykladyStudenta?studentId='+studentId).
	  		success(function(data){
	  			$scope.zaliczeniaStudenta=data;
	  			alert(data);
	  			console.log(data);
	  		});
  };
});

