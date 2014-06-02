var app = angular.module('student', []);
var baseGrades = [];
//TODO gdzieś na koniec ogarnac jquery z angularem
app.controller('MainCtrl', function($scope,$http) {
	$http.get('/AngularSpringApp/studenci/pobierzOceny').
	    success(function(data) {
	    baseGrades = data;
	    
	    for(var i = 0; i < baseGrades.length ; i++){
	    	console.log();
	    }
	    
	    for(var i = 0; i < baseGrades.length ; i++){
	    	var min = 0;
	    	for(var j=i+1 ; j < baseGrades.length; j++){
	    		console.log(baseGrades[j].wysokosc+ " <?> "+ baseGrades[min].wysokosc);
	    		if(baseGrades[j].wysokosc < baseGrades[min].wysokosc){
	    			console.log("ok");
	    			min = j;
	    		}
	    	}
	    	var tmp = baseGrades[i];
	    	baseGrades[i] = baseGrades[min];
	    	baseGrades[min] = tmp;
	    }
	    
	    console.log(data);
	});
  $scope.name = "Felipe";
  
  $scope.pokazStudentow=function(){
	$http.get('/AngularSpringApp/studenci/lista').
                success(function(data) {
                $scope.studenci = data;
                console.log(data);
            });
        };
  $scope.ping=function(){
		$http.get('/AngularSpringApp/studenci/ping').
	                success(function(data) {
	                	alert(data);
	            });
	        };
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
	  			$scope.grades = baseGrades;	  			
	  			$scope.grade = [];
	  			for(var i = 0; i < data.length ; i++){
	  				for(var j = 0; j < $scope.grades.length; j++){	  	
	  					if(data[i].ocena == $scope.grades[j].wysokosc){
	  						$scope.grade[i] = $scope.grades[j];
	  						break;
	  					}
	  				}
	  			}
	  			
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
  };
  
  $scope.wystawOcene=function(zaliczenieId,ocena){
	  $http.get('/AngularSpringApp/studenci/wystawOcene?'
			  +'&zaliczenieId='+zaliczenieId
			  +'&ocena='+ocena).
		success(function(data){
			//alert(data);
			if(data=="true"){
				$(".gradeSuccess").show().delay(800).fadeOut("slow");
			}
			
		});
  };
});

