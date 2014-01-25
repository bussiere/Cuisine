/*
 *  shareit - Creates a dynamic, vertical sharing bar to the left of a WordPress post and hides it if browser window is too small
 *  Copyright 2010 Monjurul Dolon, http://mdolon.com/
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://devgrow.com/shareit
 */
;(function($) {
$.fn.shareit = function(options) {
	var defaults = { minwidth: 1000};
	var opts = $.extend(defaults, options); var o = $.meta ? $.extend({}, opts, $$.data()) : opts;


	var w = $(window).width();
	var shareit = $('#shareit');
	var shareitx = $('#shareitx');
	var parent = $(shareit).parent().width();
	if($('#shareit').length > 0)
	{
		shareit_init();
		var start = $('#shareit').parent().offset().top;
		shareit_scroll();
		
	}
	function shareit_init(){

		$(shareit).css('width',o.swidth+'px');
		
		if (o.position == 'right'){ 
			var padding=$(shareit).parent().css('padding-left').replace("px","");
			o.leftOffset-=padding;
			$(shareit).css('marginLeft',o.leftOffset+"px");
		} else {
		
			o.leftOffset=$(shareit).parent().offset().left;
			$(shareit).css('marginLeft',o.leftOffset+"px");
			$(shareit).css('left',0-o.leftOffset);
		}
		
		if(w < o.minwidth && o.horizontal) $(shareitx).slideDown();
		else $(shareit).fadeIn();
		$.event.add(window, "scroll", shareit_scroll);
		$.event.add(window, "resize", shareit_resize);
		return $(shareit).offset().top;
	}
	function shareit_resize() {
		var w = $(window).width();
		if(w<o.minwidth){
			$(shareit).fadeOut();
			if(o.horizontal) $(shareitx).slideDown();
		}else{
			$(shareit).fadeIn();
			if(o.horizontal) $(shareitx).slideUp();
		}
	}
	function shareit_scroll() {
		var p = $(window).scrollTop();
		var w = $(window).width();
		$(shareit).css('position', 'fixed');
		if(o.alignVertical==1)
			$(shareit).css('top',((p+o.top)>start) ? o.top : start-p);
		else	
			$(shareit).css('top',o.top);

	}
	

};
})(jQuery);