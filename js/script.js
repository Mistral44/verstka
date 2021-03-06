/*global Sly */
jQuery(function ($) {
	'use strict';

	// Detect IE.
	// Feature detection of "transform-style: preserve-3d" doesn't work, so this
	// is the only way how to fall back to a 2D front page example in IE that
	// doesn't have a full support of 3D transforms across the board.
	document.getElementsByTagName('html')[0].className += ' ' +
		(~window.navigator.userAgent.indexOf('MSIE') ? 'ie' : 'no-ie');

	// ==========================================================================
	//   Header example
	// ==========================================================================
	var $example = $('#example');
	var $frame = $example.find('.frame'); window.frr = $frame;
	var sly = new Sly($frame, {
		horizontal: 1,
		itemNav: 'basic',
		activateMiddle: 1,
		smart: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: 1,
		scrollBar: $example.find('.scrollbar'),
		scrollBy: 1,
		pagesBar: $example.find('.pages'),
		activatePageOn: 'click',
		speed: 200,
		moveBy: 600,
		elasticBounds: false,
		dragHandle: 1,
		dynamicHandle: false,
		clickBar: 1,

	}).init();

	$( window ).resize(function() {
	  sly.reload();
	});

	$('.banner-slide').slick({
		dots: true,
  		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></button>',
  		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></button>',
  		responsive: [
		{
		  breakpoint: 768,
		  settings: {
		    arrows: false,
		  }
		},
		]
	});

	$('.catalog-list').slick({
		slidesToShow: 4,
  		swipeToSlide: true,
  		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></button>',
  		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></button>',
  		responsive: [
		{
		  breakpoint: 1300,
		  settings: {
		    slidesToShow: 3,
		  }
		},
		{
		  breakpoint: 992,
		  settings: {
		  	slidesToShow: 2,
		  }
		},
		{
		  breakpoint: 768,
		  settings: {
		    slidesToShow: 2,
		    arrows: false,
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
		    slidesToShow: 1,
		    arrows: false,
		  }
		}
		]
	});

	$('.popular-goods__gallery').slick({
		slidesToShow: 3,
  		swipeToSlide: true,
  		// variableWidth: true,
  		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></button>',
  		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></button>',
  		responsive: [
		{
		  breakpoint: 768,
		  settings: {
		    slidesToShow: 2,
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
		    slidesToShow: 3,
		  }
		},
		]
	});

	$('.nav-catalog-list a').click(function(){
		$(this).parents('.catalog-wrap').find('.catalog-cont').addClass('hide');
		$(this).parent().siblings().removeClass('active');
		var id = $(this).attr('href');
		$(id).removeClass('hide');
		$(this).parent().addClass('active');
		$('.catalog-list').each(function() {
          $(this).slick("getSlick").refresh();
        });
		return false
	});
});

$('.menu-toggle').click(function(){
	$('.menu').slideToggle(500, function(){
		var menu = $(this);

		if(menu.css('display') == 'none') {
			menu.attr('style', '');
		}
	});
});

$nav_tabs_slider = $('.nav-catalog-list');
	settings = {
		slidesToShow: 1,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></button>',
  		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></button>',
	}

$nav_tabs_slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
		$(this).parents('.catalog-wrap').find('.catalog-cont').addClass('hide');
		$(this).find('.slick-current').siblings().removeClass('active');
		var id = $(this).find('.slick-current a').attr('href');
		$(id).removeClass('hide');
		$(this).find('.slick-current').addClass('active');
		$('.catalog-list').each(function() {
          $(this).slick("getSlick").refresh();
        });
		return false
	})

$(window).on('resize load', function(){
	if($(window).width() > 750) {
		if($nav_tabs_slider.hasClass('slick-initialized')) {
			$nav_tabs_slider.slick('unslick')
		}
		return
	}
	if(!$nav_tabs_slider.hasClass('slick-initialized')) {
		return $nav_tabs_slider.slick(settings)
	}
})

function initMap() {
    var coordinates = {lat: 49.988820, lng: 36.232322}, // Координаты центра карты 
        markerImg = 'img/marker.png', //  Иконка для маркера  
   
    // создаем карту и настраеваем 
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 16, // определяет первоначальный масштаб
        disableDefaultUI: true, // убирает элементы управления
        // scrollwheel: true, // отключает масштабирование колесиком мыши (бывает полезно, если карта на всю ширину страницы и перебивает прокрутку вниз).
    	
    });

    // маркер
    marker = new google.maps.Marker({
        position: coordinates, // координаты маркера 
        map: map, //  ставим маркер в карту с id map
        animation: google.maps.Animation.DROP, // анимация маркера DROP / BOUNCE
        icon: markerImg,
    });

    // Отцентровка карты при ресайзе
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});

}

// Запускаем карту при загрузки страницы
google.maps.event.addDomListener(window, 'load', initMap); 