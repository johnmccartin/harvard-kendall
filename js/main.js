
$(document).ready(function(){

	var block_height = $(window).height() / 2;
	$('.content-block').height(block_height);

	var ifr_height = block_height;
	$('iframe.carto-db').css('height',block_height);

});