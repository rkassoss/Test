jQuery( document ).ready(function( $ ) {	
		
	$( '#results' ).on( 'click', 'tr', function () { 
		window.location.href = $(this).data('link');
	});
		
	
	//grab data from data/articles.js show only 10 items at the time
	$.ajax({
        type: "POST",
        url: "data/articles.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{}",
        success: function(json) {
            $('#results').append(CreateTableView(json)).fadeIn();
            			    
		    loadMore();
		    
		    $("#btnLoadMore").on("click",function() {
			    loadMore();
		    });	
        }
    });
    
});

function loadMore() {
	    if ($("#results .table tr").hasClass('.hidden')) {
		    console.log('There is More!');
	    } else {
		    console.log('No More');
	    }
		$("#results .hidden").slice(0,10).removeClass("hidden");
	}

// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateTableView(objArray) {
     
    // If the returned data is an object do nothing, else try to parse
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;   
   
	var str = '<table class="table table-striped">';
		     
	// table head
        str += '<thead><tr>';
        str += '<th>Image</th><th>title</th><th>Words</th><th>Profile</th><th>Published At</th>';
        str += '</tr></thead>';

		    // table body
		    str += '<tbody>';
		    for (var i = 0; i < array.length; i++) {
		
			// 	vars
		        var obj = array[i];
		        var link = array[i].url;
		        var title = array[i].title;
		        var id = array[i].id;
				var img = array[i].image;
				var profile = array[i].profile;
				var words = array[i].words;
				var publish = array[i].publish_at;
				
				
/*
				$.each(array, function(key, value){
				    $.each(value, function(key, value){
						console.log(key, value);
				    });
				});
*/
		
				str += '<tr class="hidden" data-link="'+ link +'"><td style="width: 100px;"><img src="'+ img +'" class="img-responsive"/></td><td>'+ title +'</td>';
				str += '<td>'+ words +'</td>';
				str += '<td>'+ profile.first_name +' '+ profile.last_name +'</td><td>'+ publish +'</td>';
				str += '</tr>';
		        
		    }
    str += '</tbody>'
    str += '</table>';
    return str;
}



