// $(function () {
// 'use strict';

//   bsCustomFileInput.init();

//   // ----------- toggle value on input
//   $('input.input-effect').focusout(function () {
//     toggle_input_effect(this);
//   });

//   document.querySelectorAll('input.input-effect').forEach((item) => {
//     toggle_input_effect(item);
//   });

//   function toggle_input_effect(selector) {
//     if (selector.value !== '') {
//       selector.classList.add('has-content');
//     } else {
//       selector.classList.remove('has-content');
//     }
//   }

//   $('.profile-container').addClass('pre-enter');
//   setTimeout(function () {
//     $('.profile-container').addClass('on-enter');
//   }, 500);
//   setTimeout(function () {
//     $('.profile-container').removeClass('pre-enter on-enter');
//   }, 3000);
// });

// eslint-disable-next-line max-statements
(function () {
  'use strict';
  window.console.info('This is a browser feature intended for developers. Do not paste any code here given to you by someone else. It may compromise your account or have other negative side effects. have a good day');

  //  Enable tooltips everywhere
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')),
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    }),

    close_button = document.querySelector('#js-close-button'),
    menu_links = document.querySelector('#js-main-links ul'),
    search_button = document.querySelector('#search-button'),
    search_popup = document.querySelector('#search-popup'),
    search_popup_content = document.querySelector('#search-popup .content'),
    form_container = document.querySelectorAll('.custom-form-input-container .custom-form-input'),
    user_id_btn = document.getElementById('js-profile-user-btn'),
    user_id_input = document.getElementById('js-profile-user-input');
    
  // toggle menu & search button
  search_button.onclick = function (event) {
    event.stopPropagation();
    event.preventDefault();
    document.querySelector('#search-popup input.input-search').focus();
    search_popup.classList.toggle('open');
  };

  search_popup_content.onclick = function (event) {
    event.stopPropagation();
  };

  close_button.onclick = function (event) {
    menu_links.classList.toggle('open');
    this.classList.toggle('transform');
    event.stopPropagation();
  };

  menu_links.onclick = function (event) {
    event.stopPropagation();
  };

  document.addEventListener('click', window_click_event);

  // custom form moved effect
  if (form_container) {
    form_container.forEach(input => {
      input.addEventListener('blur', input_has_content);
      input.addEventListener('focus', input_has_content);
    });
  }

  document.querySelector('#current_year').textContent = new Date()
    .getFullYear()
    .toString();

  /**
* use to add or remove animation if input has content
* @param {Element} event the input target of effect
* @returns {Void} no return
*/
  function input_has_content(event) {
    if (event.target.value.length > 0) {
      event.target.classList.add('has-content');
    } else {
      event.target.classList.remove('has-content');
    }
  }

  function window_click_event(event) {
    window_toggle_navbar_menu(event);
    window_toggle_searchbar(event);
  }

  function window_toggle_navbar_menu(event) {
    if (event.target !== menu_links && event.target !== close_button) {
      if (menu_links.classList.contains('open')) {
        close_button.classList.toggle('transform');
        menu_links.classList.toggle('open');
      }
    }
  }

  function window_toggle_searchbar(event) {
    if (event.target !== search_popup_content && event.target !== search_button) {
      if (search_popup.classList.contains('open')) {
        search_popup.classList.toggle('open');
      }
    }
  }

  // profile copy user ID
  if (user_id_btn && user_id_input) {
    user_id_btn.onclick = function () {
      copy_to_clipboard(user_id_input.value);
    };
  }

  /**
   * copy text to clipboard
   * @param {String} text text to be copy
   */
  function copy_to_clipboard(text) {
    const temp_textarea = document.createElement('textarea');
    temp_textarea.value = text;
    document.body.appendChild(temp_textarea);
    temp_textarea.select();
    document.execCommand('copy');
    document.body.removeChild(temp_textarea);
  }

})();

//  jQuery start from here 👾
// $(document).ready(function () {});
