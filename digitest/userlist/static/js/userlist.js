$(document).ready(function(){
	$(".userlist").sortable();
	$(".btn-get").on("click", function() {
			get_list("default");
		});

});

function get_list(name) {
	name = name || 'default'; 
	$.ajax({
		url: "/userlist/get_list",
		data: {"name":name},
		success: parse_list,
		
	});
}

function parse_list(data) {
	var list = $.parseJSON(data["list"]);
	var rows = $.parseJSON(data["rows"]);
	
	var list_element = $(".userlist");
	
	// borro las filas
	list_element.empty()
	
	for (i in rows){
		var row = rows[i];
		var id= row["pk"];
		var content = row["fields"]["content"];
		var position = row["fields"]["position"];
		var element = '<div id="row'+id+'" class="listrow">'+content+'</div>';
		// Agrego la fila a la lista
		$(element).appendTo(list_element);	
	}

}
