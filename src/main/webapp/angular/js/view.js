
$(document).ready(function(){
	$("body").on("click","button.showDetails",function(){
		$(".studentDetails").not("#studentIdFullData_"+$(this).attr("id").split("_")[1]).hide();
		//$("#studentIdFullData_"+$(this).attr("id").split("_")[1]).toggle();
	});
});