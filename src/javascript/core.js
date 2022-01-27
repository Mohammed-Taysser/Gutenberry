window.onload = function () {
  'use strict';

  // eslint-disable-next-line max-len
  window.console.info('This is a browser feature intended for developers. Do not paste any code here given to you by someone else. It may compromise your account or have other negative side effects. have a good day');

  document.body.classList.remove('load');

  main_skilition();

  // * --------------------
  // * footer current year
  // * --------------------
  const current_year = new Date().getFullYear().toString();
  document.querySelector('#current_year').textContent = current_year;
};

// eslint-disable-next-line max-lines-per-function
function main_skilition() {
  'use strict';

  enable_bootstrap_tooltip();

  // * ----------------------------
  // * toggle menu & search button
  // * ----------------------------
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

  document.addEventListener('click', function (event) {
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
      if (search_popup.classList.contains('open')) {
        search_popup.classList.toggle('open');
      }
    }
  }

  active_moved_label_effect();

  profile_copy_user_id();

  // * ------------------------------
  // * profile change avatar cropper
  // * ------------------------------
  if (document.getElementById('js-profile-avatar')) {
    change_user_avatar();
  }
};

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

  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

/**
 * get canvas drawn of the cropped image.
 * @param {*} cropped_avatar 
 * @returns {HTMLCanvasElement} canvas drawn of the cropped image.
 */
function get_cropped_avatar(cropped_avatar) {
  'use strict';
  return cropped_avatar.getCroppedCanvas({
    width: 80,
    height: 80,
    fillColor: '#fff',
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
    aspectRatio: 1,
    dragMode: 'none',
    zoomable: false,
    minContainerWidth: 350,
    minContainerHeight: 350,
    toggleDragModeOnDblclick: false,
    zoomOnWheel: false,
    viewMode: 3,
  });
}

/**
 * check needed technology to generate url of uploaded image
 * @param {File} image file object of uploaded image
 * @returns {String} url of uploaded image
 */
function generate_new_avatar_url(image) {
  'use strict';
  if (URL) {
    return URL.createObjectURL(image);
  }
  return '';
}

/**
 * addEventListener for both focus and blur of input element
 */
function active_moved_label_effect() {
  'use strict';
  const input_container = document.querySelectorAll('.custom-form-input-container .custom-form-input');

  if (input_container) {
    input_container.forEach(input => {
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
  if (event.target.value.length > 0) {
    event.target.classList.add('has-content');
  } else {
    event.target.classList.remove('has-content');
  }
}

/**
 * profile page: copy user id from input
 */
function profile_copy_user_id() {
  'use strict';
  const user_id_btn = document.getElementById('js-profile-user-btn'),
    user_id_input = document.getElementById('js-profile-user-input');

  if (user_id_btn && user_id_input) {
    const old_data_copy_title = user_id_btn.dataset.bsOriginalTitle;
    user_id_btn.onclick = function () {
      copy_to_clipboard(user_id_input.value);
      user_id_btn.dataset.bsOriginalTitle = 'copied';
      setTimeout(() => {
        user_id_btn.dataset.bsOriginalTitle = old_data_copy_title;
      }, 1000);
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
    if (this.files[0]) {
      send_image_to_cropper(generate_new_avatar_url(this.files[0]));
    }
  };

  function send_image_to_cropper(url) {
    profile_modal_image.src = url;
    bootstrap.Modal.getOrCreateInstance(modal).show();
  }

  modal.addEventListener('show.bs.modal', function () {
    avatar_cropper_instance = create_avatar_cropper_instance(profile_modal_image);
  });
  modal.addEventListener('hide.bs.modal', function () {
    setTimeout(() => {
      avatar_cropper_instance.destroy();
    }, 1000);
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

  //? incase: send cropped avatar to server
  cropped_avatar.toBlob(function (blob) {
    const formData = new FormData();
    formData.append('avatar', blob, 'avatar.jpg');

    //*  then make AJAX request here
  });
}

//  jQuery start from here 👾
// $(document).ready(function () {});
