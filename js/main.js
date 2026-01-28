/*
	Phantom by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Touch?
			if (skel.vars.touch)
				$body.addClass('is-touch');

		// Forms.
			var $form = $('form');

			// Auto-resizing textareas.
				$form.find('textarea').each(function() {

					var $this = $(this),
						$wrapper = $('<div class="textarea-wrapper"></div>'),
						$submits = $this.find('input[type="submit"]');

					$this
						.wrap($wrapper)
						.attr('rows', 1)
						.css('overflow', 'hidden')
						.css('resize', 'none')
						.on('keydown', function(event) {

							if (event.keyCode == 13
							&&	event.ctrlKey) {

								event.preventDefault();
								event.stopPropagation();

								$(this).blur();

							}

						})
						.on('blur focus', function() {
							$this.val($.trim($this.val()));
						})
						.on('input blur focus --init', function() {

							$wrapper
								.css('height', $this.height());

							$this
								.css('height', 'auto')
								.css('height', $this.prop('scrollHeight') + 'px');

						})
						.on('keyup', function(event) {

							if (event.keyCode == 9)
								$this
									.select();

						})
						.triggerHandler('--init');

					// Fix.
						if (skel.vars.browser == 'ie'
						||	skel.vars.mobile)
							$this
								.css('max-height', '10em')
								.css('overflow-y', 'auto');

				});

			// Fix: Placeholder polyfill.
				$form.placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Menu.
			var $menu = $('#menu');

			$menu.wrapInner('<div class="inner"></div>');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menu
				.appendTo($body)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						if (href == '#menu')
							return;

						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				})
				.append('<a class="close" href="#menu">Close</a>');

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('click', function(event) {

					// Hide.
						$menu._hide();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

				});

		// Tilted card effect for tiles
		var $tiles = $('.tiles article');

		$tiles.each(function() {

			var $this = $(this);

			$this.on('mousemove', function(event) {

				var rect = $this[0].getBoundingClientRect();
				var x = event.clientX - rect.left;
				var y = event.clientY - rect.top;

				var centerX = rect.width / 2;
				var centerY = rect.height / 2;

				var rotateX = (y - centerY) / 15;
				var rotateY = (centerX - x) / 15;

				$this.css('transform', 'perspective(500px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.05, 1.05, 1.05)');

			});

			$this.on('mouseleave', function() {
				$this.css('transform', 'perspective(500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
			});

		});

		// Typewriter effect for header
		var texts = ['主打「酷酷的」设计风格', '做品牌设计', '交互界面设计', '互联网产品设计', '创意设计'];
		var typewriterEl = document.getElementById('typewriter');
		var cursorEl = document.querySelector('.cursor');
		var textIndex = 0;
		var charIndex = 0;
		var isTyping = true;
		var typingSpeed = 100;
		var deletingSpeed = 50;
		var pauseDuration = 3000;

		function type() {
			if (isTyping) {
				if (charIndex < texts[textIndex].length) {
					typewriterEl.textContent += texts[textIndex].charAt(charIndex);
					charIndex++;
					setTimeout(type, typingSpeed);
				} else {
					isTyping = false;
					setTimeout(type, pauseDuration);
				}
			} else {
				if (charIndex > 0) {
					typewriterEl.textContent = texts[textIndex].substring(0, charIndex - 1);
					charIndex--;
					setTimeout(type, deletingSpeed);
				} else {
					isTyping = true;
					textIndex = (textIndex + 1) % texts.length;
					setTimeout(type, typingSpeed);
				}
			}
		}

		function blinkCursor() {
			cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
			setTimeout(blinkCursor, 500);
		}

		// Initialize typewriter effect
		if (typewriterEl && cursorEl) {
			type();
			blinkCursor();
		}

	});

})(jQuery);