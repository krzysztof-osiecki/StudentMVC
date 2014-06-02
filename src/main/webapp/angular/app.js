var app = angular.module('student', []);
var baseGrades = [];
var baseLectures = [];
var lecturesArray = []; //do tworzenia studenta

//TODO gdzieś na koniec ogarnac jquery z angularem
app.controller('MainCtrl', function($scope,$http) {
	$http.get('/AngularSpringApp/studenci/pobierzOceny').
	    success(function(data) {
	    baseGrades = data;
	    	    
	    for(var i = 0; i < baseGrades.length ; i++){
	    	var min = i;	    	
	    	for(var j=i+1 ; j < baseGrades.length; j++){
	    		if(baseGrades[j].wysokosc < baseGrades[min].wysokosc){
	    			min = j;
	    		}
	    	}
	    	var tmp = baseGrades[i];
	    	baseGrades[i] = baseGrades[min];
	    	baseGrades[min] = tmp;
	    }
	    console.log(data);
	});
	
	$http.get('/AngularSpringApp/studenci/pobierzWyklady').
	    success(function(data) {
	    baseLectures = data;
	    	    
	    for(var i = 0; i < baseLectures.length ; i++){
	    	var min = i;	    	
	    	for(var j=i+1 ; j < baseLectures.length; j++){
	    		if(baseLectures[j].przedmiot < baseLectures[min].przedmiot){
	      			min = j;
	    		}
	    	}
	    	var tmp = baseLectures[i];
	    	baseLectures[i] = baseLectures[min];
	    	baseLectures[min] = tmp;
	    }
	    
	    console.log(data);
	});
  $scope.name = "Felipe";
  
  $scope.pokazStudentow=function(){
	$http.get('/AngularSpringApp/studenci/lista').
                success(function(data) {
                $scope.studenci = data;
                console.log(data);
                $(".searchMenu").hide();
            	$(".createStudentMenu").hide();
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
	  			
	  			for(var i = 0; i < $scope.zaliczeniaStudenta.length ; i++){
	  		    	var min = i;	    	
	  		    	for(var j=i+1 ; j < $scope.zaliczeniaStudenta.length; j++){
	  		    		if($scope.zaliczeniaStudenta[j].przedmiot < $scope.zaliczeniaStudenta[min].przedmiot){
	  		      			min = j;
	  		    		}
	  		    	}
	  		    	var tmp = $scope.zaliczeniaStudenta[i];
	  		    	$scope.zaliczeniaStudenta[i] = $scope.zaliczeniaStudenta[min];
	  		    	$scope.zaliczeniaStudenta[min] = tmp;
	  		    }
	  			
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
	  if(confirm("Jesteś pewien?")){
		  $http.get('/AngularSpringApp/studenci/usunStudenta?studentId='+studentId).
			success(function(data){
				//alert(data);
				if(data=="true"){
					$("#studentDataWrapper_"+studentId).remove();
				}
			});
	  }
	  else{
		  
	  }
  };
  
  $scope.wystawOcene=function(zaliczenieId,ocena){
	  $http.get('/AngularSpringApp/studenci/wystawOcene?'
			  +'&zaliczenieId='+zaliczenieId
			  +'&ocena='+ocena).
		success(function(data){
			//alert(data);
			if(data=="true"){
				$(".saveSuccess").show().delay(800).fadeOut("slow");
			}
			
		});
  };
  
  $scope.zapiszDaneStudenta=function(studentId,studentImie,studentNazwisko){

	  $http.get('/AngularSpringApp/studenci/zapiszDaneStudenta?'
			  +'studentId='+studentId
			  +'&imie='+studentImie
			  +'&nazwisko='+studentNazwisko)
		.success(function(data){
			//alert(data);
			if(data=="true"){
				$(".saveSuccess").show().delay(800).fadeOut("slow");
			}
		});
  };
  $scope.pokazMenuWyszukiwania=function(){
	  $(".searchMenu").toggle();
	  $(".createStudentMenu").hide();
  };
  
  $scope.szukajStudentow=function(index,imie,nazwisko){
	  alert('localhost:8080/AngularSpringApp/studenci/szukajStudentow?'
			  +'studentIndex='+index
			  +'&studentName='+imie
			  +'&studentSurname='+nazwisko);
	  if( typeof index==="undefined"
		  &&
		  typeof imie==="undefined"
		  &&
		  typeof nazwisko==="undefined"){
		  alert("Podaj przynajmniej jedno kryterium");
	  }else{
		  alert(1);
	  }
  };
  
  $scope.pokazMenuTworzeniaStudenta=function(){
	  $scope.lectures = baseLectures;
	  lecturesArray = [];
	  $(".searchMenu").hide();
	  $(".createStudentMenu").toggle();	  
  };
  
  $scope.dodajStudenta=function(imie,nazwisko){
	  alert('localhost:8080/AngularSpringApp/studenci/dodajStudenta?'
			  +'studentName='+imie
			  +'&studentSurname='+nazwisko
			  +'&lectures='+lecturesArray.toString());
	  if(typeof imie === "undefined"
		  ||
		  typeof nazwisko === "undefined"
		  ||
		  lecturesArray == [] || lecturesArray.length == 0 || lecturesArray == null){
		  alert("Wypełnij poprawnie formularz i zaznacz wykłady");
	  }
	  else{
		  alert("ok");
	  }
  };
  
  $scope.toggleLecture=function(wykladId,opcja){
	  if(opcja){
		  lecturesArray.push(wykladId);	
		  //alert("dodaje do listy "+wykladId);
	  }
	  else{
		  var t = lecturesArray.indexOf(wykladId);
		  if(t!=-1){
			  lecturesArray.splice(t,1);
		  }
		  //alert("usuwa "+wykladId);
	  };
	  //alert(lecturesArray.toString());
  };
  
});

