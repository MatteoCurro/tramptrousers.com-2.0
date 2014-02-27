(function($){
	// Variabili
	var delta = 0,
		currentSlideIndex = 0,
		slides = $('.slide'),
		numSlides = slides.length - 1,
		// Imposta quanto è necessario scrollare prima che cambi slide
		scrollThreshold = 10,
		ready = true,

		nav = $('nav'),
		nav_elements = nav.find('span');

	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// FUNZIONI VARIE
	//////////////////////////////////////////////
	//////////////////////////////////////////////

	// mostra la slide
	function showSlide() {
		// imposta la variabile ready su false per prevenire che scrollando "salti" una slide
		ready = false;
		// rimuove la classe active dove non necessaria (nascondendo quelle già visitate viene visualizzata quella corrente)
		slides.each(function(i, slide) {
			$(slide).toggleClass('active', (i >= currentSlideIndex));
		});

		activeNav();
		hideH1();
		// Aspetto 1 secondo prima di impostare ready su true per permettere di cambiare slide
		setTimeout(function() {
			ready = true;
			delta = 0;
		}, 1000);

	}

	// imposta la slide corrente a quella precedente
	function prevSlide() {
		currentSlideIndex--;

		if (currentSlideIndex < 1) {
			currentSlideIndex = 0;
		}
		showSlide();
	}

	// imposta la slide corrente a quella successiva
	function nextSlide() {
		currentSlideIndex++;

		if (currentSlideIndex > numSlides) {
			currentSlideIndex = numSlides;
		}
		showSlide();
	}

	function activeNav() {
		nav_elements.eq(currentSlideIndex).addClass('active').siblings().removeClass('active');
	}

	function hideH1() {
		// archivio la slide corrente
		var current_slide_title = slides.eq(currentSlideIndex).find('h1');
		console.log('loggato_h1');
		console.log(slides.eq(currentSlideIndex).find('h1'));

		current_slide_title.removeClass('hidden');
		current_slide_title.parent().prevAll().find('h1').addClass('hidden');
		current_slide_title.parent().nextAll().find('h1').removeClass('hidden');
	}









	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// NAVIGAZIONE CON SCROLL
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	function elmScroll (e) {
		// Scroll up
		if (ready && (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)) {
			delta--;
			if ( Math.abs(delta) >= scrollThreshold) {
			prevSlide();
			}
		}
		// Scroll down
		else if (ready) {
			delta++;
			if (delta >= scrollThreshold) {
				nextSlide();
			}
		}
		// evita che la pagina scrolli
		return false;
	}
	
	$(window).on({
		'DOMMouseScroll mousewheel': elmScroll
	});







	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// NAVIGAZIONE CON FRECCINE
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	$(document).keydown(function(e) {
		switch(e.keyCode) {
			// Freccia giù
			case 40:
				nextSlide();
				break;

			// Freccia su
			case 38:
				prevSlide();
				break;
		}
	});








	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// NAVIGAZIONE CON PALLINI
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	nav_elements.on('click', function() {
		// imposto la slide corrente ricavando l'indice dal corrispettivo indice dell'elemento nella navigazione
		currentSlideIndex = nav_elements.index($(this));
		// aggiungo la classe active all'elemento della navigazione
		activeNav();

		// archivio la slide corrente
		var currentSlide = slides.eq(currentSlideIndex);

		currentSlide.addClass('active');
		currentSlide.prevAll().removeClass('active');
		currentSlide.nextAll().addClass('active');
		hideH1();
	});



	

})(jQuery);