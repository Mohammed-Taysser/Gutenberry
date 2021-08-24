/*jslint browser: true*/
/*global $*/
$(function () {
	'use strict';
	bsCustomFileInput.init();
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();


	// toggle menu & search button
	let close_button = document.querySelector('#close-button')
	let menu_links = document.querySelector('#main-links ul')

	let search_button = document.querySelector('#search-button')
	let search_popup = document.querySelector('#search-popup')
	let search_popup_content = document.querySelector('#search-popup .content')

	search_button.onclick = function (e) {
		e.stopPropagation();
		search_popup.classList.toggle('open')
	};

	search_popup_content.onclick = function (e) {
		e.stopPropagation();
	};

	close_button.onclick =  function(e) {
		document.querySelector('#main-links ul').classList.toggle('open')
		document.querySelectorAll('#close-button > span').forEach(span => span.classList.toggle('transform'))
		e.stopPropagation();
	}

	document.querySelector('#main-links ul').onclick = function (e) {
		e.stopPropagation();
	};

	document.addEventListener('click', (e) => {

		if (e.target != menu_links && e.target != close_button) {
			if (menu_links.classList.contains('open')) {
				document.querySelectorAll('#close-button > span').forEach(span => span.classList.toggle('transform'))
				menu_links.classList.toggle('open');
			}
		}

		if (e.target != search_popup_content && e.target != search_button) {
			if (search_popup.classList.contains('open')) {
				search_popup.classList.toggle('open');
			}
		}

	});

});