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
});

$(document).ready(function(){
	$("body").on("click","button.showDetails",function(){
		$(".studentDetails").hide();
		$("#studentIdFullData_"+$(this).attr("id").split("_")[1]).show();
	});
});
