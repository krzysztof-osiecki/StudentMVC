
$(document).ready(function(){
	$(".hideDetails").hide();
	$("body").on("click","button.showDetails",function(){

		//$("#studentIdFullData_"+$(this).attr("id").split("_")[1]).show();
		
		//$(this).hide();
	});
	$("body").on("click","button.hideDetails",function(){
		//$("#studentIdFullData_"+$(this).attr("id").split("_")[1]).hide();
		//$("#studentIdShowData_"+$(this).attr("id").split("_")[1]).show();
		//$(this).hide();
	});
});