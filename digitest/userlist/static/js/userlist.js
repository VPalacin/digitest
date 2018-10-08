$(document).ready(function(){
	$(".userlist").sortable();
	$(".btn-get").on("click", function() {
			get_list("default");
		});
	$(".btn-save").on("click", function() {
			get_order();
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

function get_order(){

	var list_order = $.map($(".listrow"), function(n, i){
		  return n.id;
		});

	function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
	
	var csrfmiddlewaretoken = getCookie('csrftoken');



        $.ajax({
            data: {list_order:list_order, csrfmiddlewaretoken:csrfmiddlewaretoken},
            type: 'POST',
            url: '/userlist/get_order/'
       });
}