jQuery( document ).ready(function( $ ) {	
		
	$( '#results' ).on( 'click', 'tr', function () { 
		window.location.href = $(this).data('link');
	});


	var items = [];
	
	$.getJSON('data/articles.json', function(json) {
		$.each(json.medications, function(index, orders) {
			$.each(this, function() {
				$.each(this, function() {
					items.push('<div class="row">'+this.id+"\t"+this.title+"\t"+this.publish_at+"\t"+this.shares+"\t"+this.views+"\t"+this.words+"\t"+'</div>'+"\n");
				});
			});
		});
	
		$('<div>', {
			"class":'loaded',
			html:items.join('')
		}).appendTo("body");	
	});
});