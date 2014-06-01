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
	  //alert('/AngularSpringApp/studenci/wykladyStudenta?studentId='+studentId);
		$(".studentDetails").not("#studentIdFullData_"+studentId).hide();
		$(".hideDetails").hide();
		$(".showDetails").show();
		$("#deleteStudent_"+studentId).attr("disabled","disabled");

		$("#studentIdShowData_"+studentId).hide();
	  $http.get('/AngularSpringApp/studenci/wykladyStudenta?studentId='+studentId).
	  		success(function(data){
	  			$scope.zaliczeniaStudenta=data;

	  			$scope.grades = [{value:"2"},
	  			                 {value:"2.5"},
	  			                 {value:"3"},
	  			                 {value:"3.5"},
	  			                 {value:"4"},
	  			                 {value:"4.5"},
	  			                 {value:"5"}];
	  			$scope.grade = [];
	  			for(var i = 0; i < data.length ; i++){
	  				for(var j = 0; j < $scope.grades.length; j++){
	  					
	  					if(data[i].ocena == $scope.grades[j].value){
	  						$scope.grade[i] = $scope.grades[j];
	  						break;
	  					}
	  				}
	  			}
	  			//$scope.grade[0] = $scope.grades[2];
	  			console.log(data);
	  			$("#studentIdFullData_"+studentId).show();
	  			$("#studentIdHideData_"+studentId).show();
	  			$("#deleteStudent_"+studentId).removeAttr("disabled");
	  		});
  };
  $scope.ukryjSzczegoly=function(studentId){
		$("#studentIdFullData_"+studentId).hide();
		$("#studentIdHideData_"+studentId).hide();
		$("#studentIdShowData_"+studentId).show();
  };
  $scope.usunStudenta=function(studentId){
	  $http.get('/AngularSpringApp/studenci/usunStudenta?studentId='+studentId).
		success(function(data){
			//alert(data);
			if(data=="true"){
				$("#studentDataWrapper_"+studentId).remove();
			}
		});
  }
});

