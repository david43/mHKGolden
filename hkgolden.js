// ==UserScript==
// @name         My Fancy New Userscript
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://*.hkgolden.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==
	var css_style = "\
	<style>\
		.TopicBox_Author{\
			overflow:hidden;\
		}\
		.View_PageSelectPanel{\
			padding:0px;\
		}\
		.custom_contorl{\
			width:100%;\
			border-top:1px solid #000;\
			padding: 4px;\
			background-color: #336699;\
			color:#fff;\
		}\
		.custom_contorl .image_count{\
			width:32%;\
		}\
	</style>\
\
	";



$( document ).ready(function() {
	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}
	$('body').append(css_style);

	$('.TopicAd,.TopicBox_PageSelect,iframe').remove();
	$('.Image').click();
	$('.View_PageSelectPanel').append('<div class="custom_contorl"></div>');
	$('.custom_contorl').append('<div class="image_count">' + $('.Image').length  + '</div>');
	var post_id = $.urlParam('message'); 
	var ajax_count = 0 + parseInt($('.View_PageSelect option[selected]').next().val());
    var subdomain = document.location.host.substr(0,document.location.host.indexOf('.'));
	ajax_preload_post();

	function ajax_preload_post(){
		$.ajax({
		url: 'http://'+subdomain+'.hkgolden.com/view.aspx?message=' + post_id + '&page=' + ajax_count,
	})
	.done(function(data) {
		$(data).find('.ReplyBox').each(function(index,ajax_txt){
			$('.ReplyBox').last().after(ajax_txt);
			if (index === $(data).find('.ReplyBox').length - 1) {
				$('.TopicAd,.TopicBox_PageSelect').remove();
				$('.Image').click();
				$('.image_count').html($('.Image').length);
			}
		});
		
		console.log(ajax_count,'ajax_loadpost');
	
		if($('.View_PageSelect option:eq(-2)').val() > ajax_count)
		{
			ajax_count++;
			ajax_preload_post();
		}
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
	});
	}
});

