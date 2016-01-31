jQuery( document ).ready(function( $ ) {	
	
	
	 $( '#results' ).on( 'click', 'tr', function () { 
		window.location.href = $(this).data('link');
	 });
	
	
	$.ajax({
        type: "POST",
        url: "data/articles.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{}",
        success: function(json) {
            $('#results').append(CreateTableView(json)).fadeIn();

			    
			    function loadMore(){
			        $("#results .hidden").slice(0,10).removeClass("hidden");
			    }
			    
			    loadMore();
			    
			    $("#btnLoadMore").on("click",loadMore);

// when numClicks > i*10
// load moreArticles.json

            
        }
    });
    
    
    
        
});

// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateTableView(objArray, theme, enableHeader) {
     
    // If the returned data is an object do nothing, else try to parse
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;   
    
/*
    $.each(array, function(key, value){
	    $.each(value, function(key, value){
	        console.log(key, value);
	    });
	});
*/
     
 
	var str = '<table class="' + theme + ' table-striped">';
		     
	// table head
    if (enableHeader) {
        str += '<thead><tr>';
        str += '<th>Image</th><th>title</th><th>Words</th><th>Submitted</th>';
        str += '</tr></thead>';
    }
		     
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
				var tags = array[i].tags;


				$.each(tags, function(key, value){
				    $.each(value, function(key, value){
				        console.log(key, value);
				        return value;
				    });
				});

			
				
				
		
				str += '<tr class="hidden" data-link="'+ link +'"><td><h1>'+ i +'<h1></td><td style="width: 100px;"><img src="'+ img +'" class="img-responsive"/></td><td><h3>'+ title +'</h3></td>';
				str += '<td>'+  +'</td>';
				str += '<td>'+ profile.first_name +' '+ profile.last_name +'</td>';
				str += '</tr>';
		        
		    }
    str += '</tbody>'
    str += '</table>';
    return str;
}



