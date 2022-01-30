/* global bootstrap */
/* Vanilla JS start here 🌟 */

window.onload = function () {
  'use strict';

  // warn user from console
  window.console.info('This is a browser feature intended for developers. Do not paste any code here given to you by someone else. It may compromise your account or have other negative side effects. have a good day');

  // remove loader class from body
  document.body.classList.remove('load');

  // call main function
  main_function();

  // footer current year
  const current_year = new Date().getFullYear().toString();
  document.querySelector('#current_year').textContent = current_year;
};

// eslint-disable-next-line max-lines-per-function
function main_function() {
  'use strict';

  enable_bootstrap_tooltip();

  /* toggle menu & search button  */

  const close_button = document.querySelector('#js-close-button'),
    menu_links = document.querySelector('#js-main-links ul'),
    search_button = document.querySelector('#search-button'),
    search_popup = document.querySelector('#search-popup'),
    search_popup_content = document.querySelector('#search-popup .content');

  search_button.onclick = function (event) {
    event.stopPropagation();
    event.preventDefault();
    document.querySelector('#search-popup input.input-search').focus();
    search_popup.classList.toggle('open');
  };

  search_popup_content.onclick = function (event) {
    event.stopPropagation();
  };

  menu_links.onclick = function (event) {
    event.stopPropagation();
  };

  close_button.onclick = function (event) {
    event.stopPropagation();
    this.classList.toggle('transform');
    menu_links.classList.toggle('open');
  };

  document.addEventListener('click', (event) => {
    window_toggle_navbar_menu(event);
    window_toggle_searchbar(event);
  });

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
      if (search_popup.classList.contains('open'))
        search_popup.classList.toggle('open');

    }
  }

  active_moved_label_effect();

  profile_copy_user_id();

  /* profile change avatar cropper */
  if (document.getElementById('js-profile-avatar'))
    change_user_avatar();

  // about-us page: our team slider
  our_team_slider();

  // powerful s\auto complete
  search_auto_complete();

}

/**
 * copy text to clipboard
 * @param {String} text text to be copy
 * @returns {Void} no return
 */
function copy_to_clipboard(text) {
  'use strict';
  const temp_textarea = document.createElement('textarea');
  temp_textarea.value = text;
  document.body.appendChild(temp_textarea);
  temp_textarea.select();
  document.execCommand('copy');
  document.body.removeChild(temp_textarea);
}

/**
 * use to enable bootstrap tooltip everywhere
 * see docs for further info
 * https://getbootstrap.com/docs/5.1/components/tooltips/#example-enable-tooltips-everywhere
 */
function enable_bootstrap_tooltip() {
  'use strict';
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

  tooltipTriggerList.map(tooltip_element => new bootstrap.Tooltip(tooltip_element));
}

/**
 * get canvas drawn of the cropped image.
 * @param {*} cropped_avatar
 * @returns {HTMLCanvasElement} canvas drawn of the cropped image.
 */
function get_cropped_avatar(cropped_avatar) {
  'use strict';
  return cropped_avatar.getCroppedCanvas({
    width:                 80,
    height:                80,
    fillColor:             '#fff',
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
  });
}

/**
 * generate cropper instance
 * @param {Element} image The target image or canvas element for cropping.
 * @returns {Object} cropped image as object
 */
function create_avatar_cropper_instance(image) {
  'use strict';
  return new Cropper(image, {
    aspectRatio:              1,
    dragMode:                 'none',
    zoomable:                 false,
    minContainerWidth:        350,
    minContainerHeight:       350,
    toggleDragModeOnDblclick: false,
    zoomOnWheel:              false,
    viewMode:                 3,
  });
}

/**
 * check needed technology to generate url of uploaded image
 * @param {File} image file object of uploaded image
 * @returns {String} url of uploaded image
 */
function generate_new_avatar_url(image) {
  'use strict';
  if (URL)
    return URL.createObjectURL(image);

  return '';
}

/**
 * addEventListener for both focus and blur of input element
 */
function active_moved_label_effect() {
  'use strict';
  const input_container = document.querySelectorAll('.custom-form-input-container .custom-form-input');

  if (input_container) {
    input_container.forEach((input) => {
      input.addEventListener('blur', input_has_content);
      input.addEventListener('focus', input_has_content);
    });
  }
}

/**
 * use to add or remove animation if input has content
 * @param {Element} event the input target of effect
 * @returns {Void} no return
 */
function input_has_content(event) {
  'use strict';
  if (event.target.value.length > 0)
    event.target.classList.add('has-content');
  else
    event.target.classList.remove('has-content');
}

/**
 * profile page: copy user id from input
 */
function profile_copy_user_id() {
  'use strict';
  const user_id_btn = document.getElementById('js-profile-user-btn'),
    user_id_input = document.getElementById('js-profile-user-input'),
    DELAY_AFTER_COPY = 1000;

  if (user_id_btn && user_id_input) {
    const old_data_copy_title = user_id_btn.dataset.bsOriginalTitle;
    user_id_btn.onclick = function () {
      copy_to_clipboard(user_id_input.value);
      user_id_btn.dataset.bsOriginalTitle = 'copied';
      setTimeout(() => {
        user_id_btn.dataset.bsOriginalTitle = old_data_copy_title;
      }, DELAY_AFTER_COPY);
    };
  }
}

// eslint-disable-next-line max-lines-per-function
function change_user_avatar() {
  'use strict';
  let avatar_cropper_instance = null;

  const modal = document.getElementById('change-avatar-modal'),
    profile_modal_image = modal.querySelector('#js-profile-modal-image');

  document.getElementById('js-profile-avatar-file-uploader').onchange = function () {
    if (this.files[0])
      send_image_to_cropper(generate_new_avatar_url(this.files[0]));
  };

  function send_image_to_cropper(url) {
    profile_modal_image.src = url;
    avatar_cropper_instance = create_avatar_cropper_instance(profile_modal_image);
    bootstrap.Modal.getOrCreateInstance(modal).show();
  }

  modal.addEventListener('show.bs.modal', () => {

    // avatar_cropper_instance = create_avatar_cropper_instance(profile_modal_image);
  });
  modal.addEventListener('hide.bs.modal', () => {
    avatar_cropper_instance.destroy();
  });

  document.getElementById('js-profile-save-avatar-btn').onclick = function () {
    const output = get_cropped_avatar(avatar_cropper_instance);
    bootstrap.Modal.getOrCreateInstance(modal).hide();
    document.getElementById('js-profile-avatar').src = output.toDataURL();
    send_new_avatar_to_server(output);
  };
}

/**
 * not complete yet
 * @param {*} cropped_avatar
 */
function send_new_avatar_to_server(cropped_avatar) {
  'use strict';

  // incase: send cropped avatar to server
  cropped_avatar.toBlob((blob) => {
    const formData = new FormData();
    formData.append('avatar', blob, 'avatar.jpg');

    // then make AJAX request here
  });
}

/**
 * create slider for our team
 */
const OUR_TEAM_SLIDER_CONFIG = {
  type:        'carousel',
  perView:     3,
  focusAt:     'center',
  autoplay:    5000,
  hoverpause:  false,
  breakpoints: {
    992: {
      perView: 2,
    },
    768: {
      perView: 1,
    },
  },
};

function our_team_slider() {
  'use strict';
  const our_team_container = document.getElementById('js-our-team');
  if(our_team_container)
    new Glide('#js-our-team', OUR_TEAM_SLIDER_CONFIG).mount();

}

/*
 * ---------------------
 * auto complete setting
 * ---------------------
 */

const SEARCH_HISTORY = load_history(),
  MAX_HISTORY_NUMBER = 3,
  SEARCH_DATA = [
    'How to work with the chess layout for Gutenberg?',
    'Top-5 ways to minimalism with the grid layouts.',
    'Easy tips on how to add pictures in the gallery.',
    'New ZeGuten plugin with widgets for content.',
    'Main steps to perfect content with Gutenberg.',
    'Your site can work quickly without errors.',
  ];

/**
 * get stored search history from localStorage if exist else, return empty array
 * @returns {(Array| [])} history item
 */
function load_history() {
  'use strict';
  if(localStorage.getItem('search-history'))
    return localStorage.getItem('search-history').split(',');
  return [];
}

/**
 * get message of number of results found
 * @param {Object} search_Data data of user searching query
 * @returns {HTMLDivElement} html element content message
 */
function no_results_message(search_Data) {
  'use strict';
  const message = document.createElement('div');
  message.setAttribute('class', 'result-message');
  message.innerHTML = `<span>No Results Found for "${ search_Data.query }"</span>`;
  return message;
}

/**
 * get message that there no results found
 * @param {Object} search_Data data of user searching query
 * @returns {HTMLDivElement} html element content message
 */
function show_results_number(search_Data) {
  'use strict';
  const { query, matches } = search_Data,
    message = document.createElement('div');
  message.setAttribute('class', 'result-message');
  message.innerHTML = `Found <strong>${ matches.length }</strong> matching results for <strong>"${ query }"</strong>`;
  return message;
}

/**
 * determine to show number of results if there exist a matching items else show no results found
 * @param {Object} search_Data data of user searching query
 * @returns {HTMLDivElement} html element content message
 */
function show_result_message(search_Data) {
  'use strict';
  if (search_Data.results.length)
    return show_results_number(search_Data);

  return no_results_message(search_Data);
}

/**
 * create a html element contain recent history items
 * @param {Object} recentSearch data of recent search items
 * @returns {HTMLDivElement}
 */
function create_history(recentSearch) {
  'use strict';
  const historyBlock = document.createElement('div');
  historyBlock.setAttribute('class', 'history');
  historyBlock.innerHTML = '<small class="recent-text">Recent Searches</small>';
  recentSearch.slice(0, MAX_HISTORY_NUMBER).forEach((item) => {
    const recentItem = document.createElement('div');
    recentItem.setAttribute('class', 'history-item');
    recentItem.innerHTML = item;
    historyBlock.append(recentItem);
  });

  const separator = document.createElement('hr');
  separator.setAttribute('style', 'margin: 5px 0 0 0;');
  historyBlock.append(separator);
  return historyBlock;
}

const AUTO_COMPLETE_CONFIG = {
  selector:    '#js-search-page',
  placeHolder: 'What are you looking for ?',
  data:        {
    src: SEARCH_DATA,
  },
  resultItem: {
    highlight: {
      render: true,
    },
  },
  resultsList: {
    element: (list, results_data) => {
      'use strict';
      const recent_search = SEARCH_HISTORY.reverse();

      if(recent_search.length)
        list.prepend(create_history(recent_search));

      list.prepend(show_result_message(results_data));
    },
    noResults: true,
  },
};

/**
 * modify current history with new search item. the save a copy to localStorage
 * @param {String} current_selected title of selected item
 */
function save_to_history(current_selected) {
  'use strict';
  SEARCH_HISTORY.filter(item => item !== current_selected);
  SEARCH_HISTORY.push(current_selected);
  localStorage.setItem('search-history', SEARCH_HISTORY.toString());
}

/**
 * add event click to history items to work as original search items
 * then remove that event on close search item menu
 * @param {Object} auto_complete instance of autoComplete
 * @param {HTMLElement} input search input
 */
function make_history_clickable(auto_complete, input) {
  'use strict';
  function select_new_value(event){
    input.value = event.target.textContent;
    auto_complete.close();
  }
  input.addEventListener('open', () => {
    input.nextElementSibling.querySelectorAll('.history .history-item').forEach((item) => {
      item.addEventListener('click', select_new_value);
    });
  });
  input.addEventListener('close', () => {
    input.nextElementSibling.querySelectorAll('.history .history-item').forEach((item) => {
      item.removeEventListener('click', select_new_value);
    });
  });
}

function search_auto_complete() {
  'use strict';
  const search_input = document.getElementById('js-search-page');
  if(search_input){
    const autoCompleteJS = new autoComplete(AUTO_COMPLETE_CONFIG);
    search_input.addEventListener('selection', (event) => {
      const current_selected = event.detail.selection.value;
      save_to_history(current_selected);
      search_input.value = current_selected;
    });
    search_input.addEventListener('focus', () => {
      autoCompleteJS.start();
    });

    make_history_clickable(autoCompleteJS, search_input);
  }
}

const NAVBAR_AUTO_COMPLETE_CONFIG = {
  selector:    '#js-search-navbar',
  placeHolder: 'What are you looking for ?',
  data:        {
    src: SEARCH_DATA,
  },
  resultItem: {
    highlight: {
      render: true,
    },
  },
  resultsList: {
    element: (list, results_data) => {
      'use strict';
      const recent_search = SEARCH_HISTORY.reverse();

      if(recent_search.length)
        list.prepend(create_history(recent_search));

      list.prepend(show_result_message(results_data));
    },
    noResults: true,
  },
};

/* jQuery start from here 👾 */
// $(document).ready(function () {});
