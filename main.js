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
//             $('#results').append(CreateTableView(res)).fadeIn();

				var array = typeof json != 'object' ? JSON.parse(json) : json; 
    
			    $.each(array, function (i, value) {
			        var list = "<li class='hidden' >" + "<img src'" + array[i].image + "' alt=''/>" + "<span>" + array[i].title + "</span>" + "<span>" + array[i].id + "</span>"
			        $('.hold').append(list);
			    });
			    
			    function loadMore(){
			        $(".hold .hidden").slice(0,10).removeClass("hidden");
			    }
			    
			    loadMore();
			    
			    $("#btnLoadMore").on("click",loadMore);



            
        }
    });
    
    
    
        
});

// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateTableView(objArray, theme, enableHeader) {
    // set optional theme parameter
    if (theme === undefined) {
        theme = 'table'; //default theme
    }
 
    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }
 
    // If the returned data is an object do nothing, else try to parse
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;    
 
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
		
		// 		VARS
		        var obj = array[i];
		        var link = array[i].url;
		        var title = array[i].title;
		        var id = array[i].id;
				var img = array[i].image;
				var tags = array[i].tags;
				for ( var tag in tags[i] ) {
					tagList = tags[i][tag];
				}
				
				var profile = array[i].profile;
		
				str += '<tr data-link="'+ link +'"><td><img src="'+ img +'" class="img-responsive"/></td><td><h3>'+ title +'</h3></td>';
				str += '<td>'+ tagList +'</td>';
				str += '<td>'+ profile +'</td>';
				str += '<td><h1>'+ i +'<h1></td>';
				str += '</tr>';
						
				
		/*
		        for (var index in array[i]) {
		            str += '<td>' + array[i][index] + '</td>';
		        }
		*/
				
				
		
		        
		    }
    str += '</tbody>'
    str += '</table>';
    return str;
}



