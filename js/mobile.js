(function($){
var delta = 0;
    dragThreshold = 0.15;// "percentage" to drag before engaging
    dragStart = null;	 // used to determine touch / drag distance
    percentage = 0,
    slides = $('.slide'),
    target,
    previousTarget;

function touchStart(event) {

	if (dragStart !== null) { return; }
	if (event.originalEvent.touches) {
		event = event.originalEvent.touches[0];
	}

	// where in the viewport was touched
	dragStart = event.clientY;

	// make sure we're dealing with a slide
	target = slides.eq(currentSlideIndex)[0];

	// disable transitions while dragging
	target.classList.add('no-animation');

	previousTarget = slides.eq(currentSlideIndex-1)[0];
	previousTarget.classList.add('no-animation');
}

function touchMove (event) {

	if (dragStart === null) { return; }
	if (event.originalEvent.touches) {
		event = event.originalEvent.touches[0];
	}

	delta = dragStart - event.clientY;
	percentage = delta / windowHeight;

	// Going down/next. Animate the height of the target element.
	if (percentage > 0) {
		target.style.height = (100-(percentage*100))+'%';
		if (previousTarget) {
			previousTarget.style.height = ''; 	// reset
		}
	}

	// Going up/prev. Animate the height of the _previous_ element.
	else if (previousTarget) {
		previousTarget.style.height = (-percentage*100)+'%';
		target.style.height = '';	// reset
	}

	// Don't drag element. This is important.
	return false;
}

function touchEnd () {

	dragStart = null;
	target.classList.remove('no-animation');
	if (previousTarget) {
		previousTarget.classList.remove('no-animation');
	}

	if (percentage >= dragThreshold) {
		nextSlide();
	}
	else if ( Math.abs(percentage) >= dragThreshold ) {
		prevSlide();
	} else {
		// show current slide i.e. snap back
		showSlide();
	}

	percentage = 0;

}

$('.slide').on({
	'touchstart': touchStart,
	'touchmove': touchMove,
	'touchend': touchEnd
});

})(jQuery);