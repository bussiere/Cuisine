$j = jQuery.noConflict();

var HK = {};

HK.commons = {

	init: function() {
		//
		//	HEADER
		$j(document).scroll(function() {
			if($j(this).scrollTop() >= 122) {
				if("none" == $j("#header-container2").css("display")) {
					$j("#header-container2").show();
				}
			} else {
				$j("#header-container2").hide();
			}
		});
		//
		//	PLACEHOLDER CHECKER
		if (!Modernizr.input.placeholder) {
			$j('[placeholder]').focus(function() {
				var input = $j(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $j(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$j('[placeholder]').parents('form').submit(function() {
				$j(this).find('[placeholder]').each(function() {
					var input = $j(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
					}
				})
			});
		}
		//
		// KCODE
		$j(function() {
			var kKeys = [];
			function Kpress(e){
				kKeys.push(e.keyCode);
				if (kKeys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
					jQuery(this).unbind("keydown", Kpress);
					kExec();
				}
			}
			$j(document).keydown(Kpress);
		});

		function kExec() {
			var dennis_nedry = '<a href="http://www.youtube.com/embed/KTG5genOiNs?autoplay=1" id="fancykcode"></a>';
			if ($j("#kcode").size() > 0) {
				$j("#kcode").append(dennis_nedry);
				$j("#fancykcode").fancybox({
				"width" : 768,
				"height" : 432,
				"transitionIn" : "none",
				"transitionOut" : "none",
				"type" : "iframe"
				});
				$j("#fancykcode").click();
			}
		}
		//
		// STICKY LIKEBAR
		function sticky(firstId, secondId, pixelScrolled, topPosition, stickerWidth, stickerHeight, background, backgroundRecovery) {
			$j(document).scroll(function() {
				if($j(this).scrollTop() >= pixelScrolled) {
					firstId.css("position", "fixed");
					firstId.css("top", topPosition);
					firstId.css("width", stickerWidth);
					firstId.css("background-color", background);
					secondId.css("height", stickerHeight);
				} else {
					firstId.css("position", "static");
					firstId.css("width", "100%");
					firstId.css("background-color", backgroundRecovery);
					secondId.css("height", "0px");
				}
			});
		}

		var windowsize = $j(window).width();
		var content_height = $j(".content-left").height();

		if ($j(".sticker-like").size() > 0) {
			if (windowsize < 640) {
				sticky($j(".sticker-like"), $j(".sticker-hidden"), $j(".sticker-like").offset().top - 45, "22px", "100%", "63px", "#f9f9f9", "#f9f9f9");
			} else {
				sticky($j(".sticker-like"), $j(".sticker-hidden"), $j(".sticker-like").offset().top - 50, "40px", "685px", "85px", "#f9f9f9", "#f9f9f9");
			}
		}
		if ($j(".content-articles").size() > 0 && $j("#nuovo_articles").size() > 0) {
			var nuovo_offset = $j("#nuovo_articles").offset().top;
			if (content_height > nuovo_offset) {
				sticky($j("#nuovo_articles"), $j(".nuovo_hidden"), nuovo_offset + 180, "55px", "301.046875px", $j("#nuovo_articles").height(), "#FFFFFF", "transparent");
			}
		}
		if ($j(".content-basics.hotfun-basics").size() > 0 && $j("#ad2").size() > 0) {
			var ad2_offset = $j("#ad2").offset().top;
			var hotfun_basics_offset = $j(".hotfun-basics").offset().top;
			if (content_height > ad2_offset) {
				sticky($j("#ad2"), $j(".ad2_hidden"), ad2_offset + 180, "55px", "301.046875px", $j("#ad2").height(), "transparent", "transparent");
			}
		}
		if ($j(".sticker-like-test").size() > 0) {
			sticky($j(".sticker-like-test"), $j(".sticker-hidden"), $j(".sticker-like-test").offset().top - 50, "50px", "685px", "45px", "#f9f9f9", "#f9f9f9");
		}
		//
		// FANCY CLICK
		if ($j(".article img").size() > 0) {
			$j('.article img').each(function() {
				var src		 = $j(this).attr('data-original') ||  $j(this).attr('src');
				var $that 	 = $j(this);

				if (src.match(/w_/)) {
					data = {filename: src};

					// verifier si il y a une version de l'image sans prefix (taille reele)
					$j.post('/server.php?action=get-real-image-filename', data, function(response){
						response = $j.parseJSON(response);
						if (response !== false) {
							$that.wrap('<a class="fancybox" rel="group" href="' + response + '" target="_blank"></a>');
						}
					});
				}
			});
			
			$j(".article").on("focusin", function() {
				$j(".fancybox").fancybox({
					'centerOnScroll'	: true,
					'cyclic'			: true,
					'titlePosition'		: 'over',
					'margin'			: 90,
					'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
						return '<p style="text-align:center;">\
									<span id="fancybox-title-over"><a href="' + this.href + '" class="fancybox-link" target="_blank">Voir l\'image en taille réelle</a></span>\
								</p>';
					},
					'onComplete'		: function() {
						var content = '<center><iframe src="http://hitek.fr/banner/720x90_dfp.php" scrolling="no" style="width:720px;left:50%;margin-left:-360px;height:90px;padding:0;background:white;overflow:hidden;position: absolute;"></iframe></center>';
						$j('#fancybox-wrap').append(content);
					}
				});
			});
			
			$j(".article img").click(function() {
				$j(".article").focusin();
			});
		}
		//
		// LAZY LOAD
		if ($j("img.lazy").size() > 0) {
			$j(".article img.lazy").show().lazyload();
		}
		//
		// DISPLAY INTEGRATION
		if (habillage) {
			HK.commons.clear_skin();
			HK.commons.set_skin(habillage);
		}
		//
		// DISPLAY EXPAND FOOTER
		if (footer_expand) {
			HK.commons.set_expand(footer_expand);
		}
	},
	//
	// SET INTEGRATION
	set_skin: function(habillage) {
		$j("#wrap").unbind("click");
		$j(".habillage").css("background-image", "url('http://static.hitek.fr/img/integrations/"+habillage.path+"')");
		if ("transparent" != habillage.color) {
			$j("body").css("background-image", "none");
			$j("body").css("background-color", habillage.color);
		}
		$j(".habillage").show();
		$j("#wrap").css("margin-top", habillage.top+"px");
		$j("#wrap").click(function(e) {
			if (e.pageX != 0) {	// fix safari bug
				if (e.pageX < (($j(window).width()/2) - ($j(".content-container").width()/2))) {
					// gauche
					window.open(habillage.link_left, "_blank");
				} else if(e.pageX > (($j(window).width()/2) + ($j(".content-container").width()/2))) {
					// droite
					window.open(habillage.link_right, "_blank");
				}
			}
		});
		$j("#wrap").css("cursor", "pointer");
		$j(".content-container").css("cursor", "default");
	},
	//
	// CLEAR INTEGRATION
	clear_skin: function() {
		$j("#wrap").unbind("click");
		$j(".habillage").css("background-image", "none");
		$j("body").css("background-image", "url('http://static.hitek.fr/img/bg.png')");
		$j("body").css("background-color", "#F2F2F2");
		$j(".habillage").hide();
		$j("#wrap").css("margin-top", "0px");
	},
	//
	// SET EXPAND FOOTER
	set_expand: function(footer_expand) {
		adTab = footer_expand;
		jQuery.getScript('http://hitek.fr/scripts/extend-footer-js.js');
	}
	//
};

HK.popup = {
	init: function () {
		//
		//	FB POPUP FOR DESKTOP
		$j("#fb_close").click(function() {
			close_fb_popup("#fb_popup");
		});

		$j('.fb_popup_background').click(function() {
			close_fb_popup("#fb_popup");
			return false;
		});

		function close_fb_popup (variable) {
			if ($j(variable).css("display") == "block") {
				$j(variable).fadeOut(200, function() {
					$j(this).remove();
				});
			}
		}
		if ($j(".fb_popup_container").size() > 0) {
			$j(document).scroll(function() {
				if ($j(this).scrollTop() >= 10) {
					$j(".fb_popup_container").css("position", "fixed");
				} else {
					$j(".fb_popup_container").css("position", "absolute");
				}
			});
		}
		//
		//	SOCIAL LOCK
		if ($j(".fb-rappel").size() > 0) {
			// LOCK ON ARTICLE WITH FB CALLBACK
			FB.Event.subscribe("edge.create",
			function(response) {
				if ("none" == $j(".articles-liked-rappel").css("display")) {
					$j(".articles-liked-rappel").show(function() {
						$j("#fb_liked").show();
					});
					$j("#fb_liked_close").click(function() {
						close_fb_popup(".articles-liked-rappel");
					});
				}
			});
			// LOCK ON ARTICLE WITH TWITTER CALLBACK
			twttr.ready(function (twttr) {
				twttr.events.bind('tweet', function (event) {
					if ("none" == $j(".articles-liked-rappel").css("display")) {
						$j(".articles-liked-rappel").show(function() {
							$j("#twitter_liked").show();
						});
						$j("#fb_liked_close").click(function() {
							close_fb_popup(".articles-liked-rappel");
						});
					}
					console.log("callback");
				});
			});
		}
		//
	}
};

HK.home = {
	init: function () {
		//
		// NEW NEWS
		function close(idOne, idTwo) {
			if ($j(idOne).size() > 0) {
				$j(idOne).click(function() {
					if("block" == $j(idTwo).css("display")) {
						$j(idTwo).hide("slide", {
							direction: "up",
							easing: "easeInQuad"
						}, 1000);
					}
				});
			}
		}
		//
		close("#close-news", ".news-message");
		close("#close-switch", "#changemsg");
	}
}

HK.carousel = {
	init: function () {
		//
		// MAIN SLIDER
		if ($j("#featured").size() > 0) {
			$j("#featured").orbit({
				advanceSpeed: 2000,
				pauseOnHover: true,
				startClockOnMouseOut: true,
				startClockOnMouseOutAfter: 300,
				directionalNav: false,
				bullets: true
			});
		}
		//
	}
};


HK.touchSlider = {

	init: function() {
		// home touch scroll slider
		$j(document).ready(function() {
			if ($j(".mobile-carousel").size() > 0) {
				$j(".mobile-carousel").carouFredSel({
					auto: true,
					/*swipe: {
						onTouch: true,
						fx: 'cover'
					},*/
					items: {
						visible: 1,
						width: '100%'
					},
					scroll: {
						fx: 'cover'
					},
					onCreate: function() {
						$j('.mobile-carousel').show();
						$j('#hot-title').show();
						$j('.image_carousel .slide').css('width', $j(window).width());
						$j(".mobile-carousel").trigger('updateSizes');
					}
				});
			}
		});
	}
};

HK.youtube = {

	init: function() {
		//
		// FANCYBOX YOUTUBE
		if ($j(".fancyvideo").size() > 0) {
			$j("a[rel=fancybox]").fancybox();
			$j(".fancyvideo").fancybox({
			"width" : 768,
			"height" : 432,
			"transitionIn" : "none",
			"transitionOut" : "none",
			"type" : "iframe"
			});
		}
		//
		// YOUTUBE "SLIDER" AND HIS FRIENDS
		function slidePaginYt(condition, selector, divOne, divTwo) {
			if ($j(condition).size() > 0) {
				$j(selector).click(function() {
					if ("none" == $j(divTwo).css("display")) {
						$j(divOne).fadeOut(function(){
							$j(divTwo).fadeIn();
						});

					} else {
						$j(divTwo).fadeOut(function(){
							$j(divOne).fadeIn();
						});
					}
				});
			}
		}
		slidePaginYt(".content_youtube", ".y_next-prev", ".y_div_1", ".y_div_2");
		slidePaginYt("#popular_articles", ".p_next-prev", ".p_div_1", ".p_div_2");
		//
	}
};

HK.comments = {

	init: function () {
		//
		// COMMENTS REPLY
		$j("#gocomment").click(function() {
			$j("html, body").animate({ scrollTop: $j("#comments").offset().top - 135 }, 300);
		});

		if ($j(".comment-reply").size() > 0) {

			var parent, author, reply;

			$j(document).on("click", ".comment-reply", function() {
				parent = $j(this).attr("data-comment");
				author = $j(this).attr("data-author");
				$j("#repondre").html("Répondre à <a class=\"pointer\">"+author+"</a>");
				$j("#cancel-reply").html("<a class=\"pointer\">Annuler la réponse</a>");
				$j("#parent_ref").val(parent.replace("comment-", ""));
				$j("html, body").animate({ scrollTop: $j("#repondre").offset().top - 140 }, 300);
			});

			$j(document).on("click", ".reply-size", function() {
				reply = $j(this).attr("data-reply");
				$j("html, body").animate({ scrollTop: $j("#"+reply).offset().top - 140 }, 300);
			});

			$j("#repondre").click(function() {
				$j("html, body").animate({ scrollTop: $j("#"+parent).offset().top - 140 }, 300);
			});

			$j("#cancel-reply").click(function() {
				$j("html, body").animate({ scrollTop: $j("#"+parent).offset().top - 140 }, 300);
				$j("#repondre").html("Laisser un commentaire");
				$j("#cancel-reply").html("");
				$j("#parent_ref").val(0);
			});

		}
		//
		// VERIF FORM
		if ($j(".forms").size() > 0) {
			$j("#forms").submit(function() {

				var bReturn = true;
				
				if ($j("#comments-success-message").html() != "" && $j("#comments-error-message").html() == "") {
					$j("#comments-success-message").css("display", "none");
					// bReturn = false;
				}
				
				$j("#name").css({borderLeft: "1px solid #e9e9e9"});
				$j("#comments-error-message").html('');

				if ($j.trim($j("#name").val()).length == 0) {
					$j("#name").css({borderLeft: "4px solid #a22728"});
					$j("#comments-error-message").html('<p>Vous n’avez pas renseigné de nom. Veuillez réessayer.</p>');
					bReturn = false;
				}

				$j("#mail").css({borderLeft: "1px solid #e9e9e9"});

				var email = $j("#mail").val();
				var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

				if (!reg.test(email)) {
					$j("#mail").css({borderLeft: "4px solid #a22728"});
					$j("#comments-error-message").html('<p>Votre email n’est pas renseigné ou n’est pas valide. Veuillez réessayer.</p>');
					bReturn = false;
				}

				$j("#website").css({borderLeft: "1px solid #e9e9e9"});

				if ($j("#website").val().length > 0) {
					if (!isUrl($j.trim($j("#website").val()))) {
						$j("#website").css({borderLeft: "4px solid #a22728"});
						$j("#comments-error-message").html('<p>Attention, l\'adresse de votre site web n\'est pas conforme, verifiez son format. (http://www.site.fr)</p>');
						bReturn = false;
					}
				}

				$j("#message").css({borderLeft: "1px solid #e9e9e9"});

				if ($j.trim($j("#message").val()).length == 0) {
					$j("#message").css({borderLeft: "4px solid #a22728"});
					$j("#comments-error-message").html('<p>Vous n’avez pas renseigné de commentaire. Veuillez réessayer.</p>');
					bReturn = false;
				}

				return bReturn;

			});

		}
		//
		function isUrl(s) {
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			return regexp.test(s);
		}
		// like event binding
		//
		$j(document).on('click', '.like', function(e) {
			
			var button = $j(this);
			var id = 	$j(this).data('id');
			currVal = 	$j(this).attr('value');

			
			if (!$j(e.target).is(".activated")) {
				button.addClass("activated");
				
				// ajax request to script which +1 commentaire likes count
				data = {
					id:			id,
					curval:		currVal,
					method:		'ajax',
					type:		'like'
				};
	
				$j.post('/server.php?action=comment_vote', data, function(newval) {
					// here update dom value with received data
					if (newval.length >= 1 ) {
						$j('#like_count_'+id).html(newval);
					}
				});
			}

		});

		$j(document).on('click', '.dislike', function(e){
			
			var button = $j(this);
			var id = 		$j(this).data('id');
			currVal = 	$j(this).attr('value');
			
			if (!$j(e.target).is(".activated")) {
				button.addClass("activated");
				
				// ajax request to script which +1 commentaire likes count
				data = {
					id:			id,
					currval:	currVal,
					method:		'ajax',
					type:		'dislike'
				};
	
				$j.post('/server.php?action=comment_vote',data,function(newval){
					// here update dom value with received data
					if (newval.length >= 1 ) {
						$j('#dislike_count_'+id).html(newval);
					}
				});
			}
			
		});
		// load more comments
		//
		if ($j(".load-comments").size() > 0) {
			
			$j(".load-comments").click(function() {
				t = $j(this);
				$j.ajax({
					type: "POST",
					url: "/server.php?action=load_comments",
					data: {
						ref: t.attr("data-ref"),
						type: t.attr("data-type"),
						page: t.attr("data-page"),
					},
					dataType: "html",
					beforeSend: function(xhr) {
						t.html('<img src="http://static.hitek.fr/img/loading.gif">');
					}
				}).done(function(data) {
					var page = parseInt(t.attr("data-page")) + 1;
					var count = parseInt(t.attr("data-count"));
					var iter = parseInt(t.attr("data-iter"));
					$j("#comments .content-comments").last().after(data);
					t.attr("data-page", page);
					if ((page * iter) <= count) {
						t.html('Voir plus de commentaires');
					} else {
						t.parents(".content-footer").remove();
					}
				});
			});
			
		}
	}
}

HK.funpics = {

	init: function() {

		// top/flop event binding
		//
		if ($j(".top-flop-div").size() > 0) {
			// A COLOR WITH THAT
			$j(".top-flop-div.top-button").mouseover(function() {
				var id = $j(this).data('id');
	        	$j(".button_top_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_top_green.png')");
	        	$j("#like_count_" + id).attr("style", "color: #27a230 !important");
	        	$j(".top-flop-div.top-button").mouseleave(function() {
	        		if (!$j(".button_top_" + id).hasClass("activated")) {
		        		$j(".button_top_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_top_grey.png')");
		        		$j("#like_count_" + id).attr("style", "color: #c6c6c6 !important");
	        		}
	        	});
	     	});
			//
			
			$j('.top-button').click(function(e){
				if (!$j(e.target).is(".activated")) {
					// ajax request to script which +1 commentaire likes count
					var id = $j(this).data('id');
					var button = $j(".button_top_" + id);
					currVal = button.attr('value');
					button.addClass("activated");
	
					data = {
						id:			id,
						curval:		currVal,
						method:		'ajax',
						type:		'count_top'
					};
	
					$j.post('/server.php?action=picture_vote', data, function(newval){
						// here update dom value with received data
						if (newval.length >= 1 ) {
							$j('#like_count_'+id).html("&nbsp;&nbsp;"+newval+" TOP");
							$j("#like_count_"+id).addClass("green-like");
							button.addClass("activated");
						}
					});
				}
			});
			
			// A COLOR WITH THAT
			$j(".top-flop-div.flop-button").hover(function() {
				var id = $j(this).data('id');
	        	$j(".button_flop_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_flop_red.png')");
	        	$j(" #dislike_count_" + id).attr("style", "color: #a22728 !important");
	        	$j(".top-flop-div.flop-button").mouseleave(function() {
	        		if (!$j(".button_flop_" + id).hasClass("activated")) {
		        		$j(".button_flop_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_flop_grey.png')");
		        		$j(" #dislike_count_" + id).attr("style", "color: #c6c6c6 !important");
	        		}
	        	});
	     	});
			//
			
			$j('.flop-button').click(function(e){
				if (!$j(e.target).is(".activated")) {
					// ajax request to script which +1 commentaire likes count
					var id = $j(this).data('id');
					var button = $j(".button_flop_" + id);
					currVal = 	button.attr('value');
					button.addClass("activated");
	
					data = {
						id:			id,
						currval:	currVal,
						method:		'ajax',
						type:		'count_flop'
					};
	
					$j.post('/server.php?action=picture_vote',data,function(newval){
						// here update dom value with received data
						if (newval.length >= 1 ) {
							$j('#dislike_count_'+id).html("&nbsp;&nbsp;"+newval+" FLOP");
							$j("#dislike_count_"+id).addClass("red-like");
							button.addClass("activated");
						}
					});
				}
			});
		}
		//
	}

}

HK.bas = {

	init: function() {

		// top/flop event binding
		//
		if ($j(".top-flop-div-bas").size() > 0) {
			// A COLOR WITH THAT
				$j(".top-flop-div-bas.top-button").mouseover(function() {
					var id = $j(this).data('id');
		        	$j(".button_top_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_top_green.png')");
		        	$j("#like_count_" + id).attr("style", "color: #27a230 !important");
		        	$j(".top-flop-div-bas.top-button").mouseleave(function() {
		        		if (!$j(".button_top_" + id).hasClass("activated")) {
			        		$j(".button_top_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_top_grey.png')");
			        		$j("#like_count_" + id).attr("style", "color: #c6c6c6 !important");
		        		}
		        	});
		     	});
			//
			
			$j('.top-button').click(function(){
				// ajax request to script which +1 commentaire likes count
				var id = 	$j(this).data('id');
				var button = $j(".button_top_" + id);
				currVal = 	button.attr('value');

				data = {
					id:			id,
					curval:		currVal,
					method:		'ajax',
					type:		'count_top'
				};

				$j.post('/server.php?action=bas_vote',data,function(newval){
					// here update dom value with received data
					if (newval.length >= 1 ) {
						$j('#like_count_'+id).html("&nbsp;&nbsp;"+newval+" TOP");
						$j("#like_count_"+id).addClass("green-like");
						button.addClass("activated");
					}
				});
			});
			
			// A COLOR WITH THAT
				$j(".top-flop-div-bas.flop-button").hover(function() {
					var id = $j(this).data('id');
		        	$j(".button_flop_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_flop_red.png')");
		        	$j(" #dislike_count_" + id).attr("style", "color: #a22728 !important");
		        	$j(".top-flop-div-bas.flop-button").mouseleave(function() {
		        		if (!$j(".button_flop_" + id).hasClass("activated")) {
			        		$j(".button_flop_" + id).css("background-image", "url('http://static.hitek.fr/img/hitek_flop_grey.png')");
			        		$j(" #dislike_count_" + id).attr("style", "color: #c6c6c6 !important");
		        		}
		        	});
		     	});
			//
			
			$j('.flop-button').click(function(res){
				// ajax request to script which +1 commentaire likes count

				var id = $j(this).data('id');
				var button = $j(".button_flop_" + id);
				currVal = 	button.attr('value');

				data = {
					id:			id,
					currval:	currVal,
					method:		'ajax',
					type:		'count_flop'
				};

				$j.post('/server.php?action=bas_vote',data,function(newval){
					// here update dom value with received data
					if (newval.length >= 1 ) {
						$j('#dislike_count_'+id).html("&nbsp;&nbsp;"+newval+" FLOP");
						$j("#dislike_count_"+id).addClass("red-like");
						button.addClass("activated");
					}
				});
			});
		}
		//
	}

}

HK.mobile = {

	init: function() {
		//
		// STICKY HEADER
		if ($j("#sticker").size() > 0) {
			$j(document).scroll(function() {
				if($j(this).scrollTop() >= 80) {
					$j('#sticker').css("position", "fixed");
					$j('#sticker').css("top", "0");
				} else {
					$j('#sticker').css("position", "static");
				}
			});
			$j("#simple-menu").click(function(){
				if ("block" == $j("#sidr").css("display")) {
					$j('#sticker').css("left", "0px");
				} else if ("none" == $j("#sidr").css("display")) {
					$j('#sticker').css("left", "230px");
				}
			});
		}
		//
		// SWIPE MENU
		if ($j("#simple-menu").size() > 0) {
			$j('#simple-menu').sidr({
				speed: 0,
				side: 'left'
			});
		}
		//
		// HOVER -> CLICK
		if (Modernizr.touch) {
			if ($j(".touchme").size() > 0) {
				$j(".touchme").click(function(e){
					if ($j(".revealtouch").css("display") == "none") {
						$j(".revealtouch").show();
					} else {
						$j(".revealtouch").hide();
					}
				});
			}
		}
		//
		// PAGINATE ON CHANGE
		if ($j("#select-paginate").size() > 0) {
			$j("#select-paginate").change(function() {
				location = this.options[this.selectedIndex].value;
			});
		}
		//
		// MOBILE APP POPUP
		if ($j("#mobile_popup").size() > 0) {
			var images = ["app-popup-stark.gif", "app-popup-white.gif", "app-popup-vader.gif"];
			var i = 1;
			
			$j.each(images, function(key, value) {
				var img = document.createElement("img");
				img.src = "http://static.hitek.fr/img/"+value;
				// img.onload = function () {};
			});
			
			setInterval(function() {
				$j("#reviews").fadeOut("fast", function () {
					$j(this).attr("src", "http://static.hitek.fr/img/"+images[i]).fadeIn("fast");
					i = (i >= (images.length-1) ? 0 : (i+1));
			    });
			}, 3000)
		}
		//
	}
}

HK.products = {
	
	init: function() {
		if ($j(".tab-switcher").size() > 0) {
			$j(".tab-switcher").click(function() {
				var div_id = $j(this).attr("rel");
				$j(".article").stop().hide();
				$j("#"+div_id).show(0, function() {
					$j("html, body").animate({ scrollTop: $j(".breadcrumb").offset().top - 25 }, 300);
				});
           		$j(".tab-switcher").parent().removeClass("current");
           		$j(".tab-switcher").removeClass("current");
   				$j(this).parent().addClass("current");
   				$j(this).addClass("current");
			});
		}
	}
	
}

$j(document).ready(function() {

	HK.commons.init();
	HK.popup.init();
	HK.home.init();
	HK.carousel.init();
	HK.youtube.init();
	HK.comments.init();
	HK.funpics.init();
	HK.bas.init();
	HK.mobile.init();
	HK.touchSlider.init();
	HK.products.init();
	
});