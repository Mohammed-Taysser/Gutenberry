// eslint-disable-next-line max-statements
(function () {
  'use strict';
  // eslint-disable-next-line max-len
  window.console.info('This is a browser feature intended for developers. Do not paste any code here given to you by someone else. It may compromise your account or have other negative side effects. have a good day');

  // * ----------------------------
  // *  Enable tooltips everywhere
  // * ----------------------------
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')),
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

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

  // * -------------------------
  // * custom form moved effect
  // * -------------------------
  const form_container = document.querySelectorAll('.custom-form-input-container .custom-form-input');

  if (form_container) {
    form_container.forEach(input => {
      input.addEventListener('blur', input_has_content);
      input.addEventListener('focus', input_has_content);
    });
  }

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

  // * ---------------------
  // * profile copy user ID
  // * ---------------------
  const user_id_btn = document.getElementById('js-profile-user-btn'),
    user_id_input = document.getElementById('js-profile-user-input');

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

  // * ------------------------------
  // * profile change avatar cropper
  // * ------------------------------
  let avatar_cropper_instance = null;
  const change_avatar_modal = document.getElementById('change-avatar-modal'),
    profile_avatar = document.getElementById('js-profile-avatar'),
    profile_modal_image = document.getElementById('js-profile-modal-image'),
    profile_save_avatar_btn = document.getElementById('js-profile-save-avatar-btn'),
    avatar_uploader = document.querySelector('#js-profile-avatar-file-uploader');

  avatar_uploader.onchange = function () {
    const file_uploaded = this.files[0];
    if (file_uploaded) {
      if (URL) {
        upload_image_to_cropper(URL.createObjectURL(file_uploaded));
      } else if (FileReader) {
        const reader = new FileReader();
        reader.onload = function () {
          upload_image_to_cropper(reader.result);
        };
        reader.readAsDataURL(file_uploaded);
      }
    }

  };

  function upload_image_to_cropper(url) {
    avatar_uploader.value = '';
    profile_modal_image.src = url;
    bootstrap.Modal.getOrCreateInstance(change_avatar_modal).show();
  }

  change_avatar_modal.addEventListener('show.bs.modal', function () {
    avatar_cropper_instance = new Cropper(profile_modal_image, {
      aspectRatio: 1,
      dragMode: 'none',
      zoomable: false,
      minContainerWidth: 466,
      minContainerHeight: 466,
      toggleDragModeOnDblclick: false,
      zoomOnWheel: false,
      viewMode: 3,
    });
  });
  change_avatar_modal.addEventListener('hide.bs.modal', function () {
    setTimeout(() => {
      avatar_cropper_instance.destroy();
    }, 1000);
  });

  profile_save_avatar_btn.onclick = function () {
    const output = avatar_cropper_instance.getCroppedCanvas({
      width: 80,
      height: 80,
      fillColor: '#fff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    }),
      new_url = output.toDataURL();

    bootstrap.Modal.getOrCreateInstance(change_avatar_modal).hide();
    profile_avatar.src = new_url;

    // incase: send to server
    // output.toBlob(function (blob) {
    //   const formData = new FormData();
    //   formData.append('avatar', blob, 'avatar.jpg');
    //  then make AJAX request here
    // });
    // localStorage.setItem('profile-user-avatar', new_url);
  };

  // * --------------------
  // * footer current year
  // * --------------------
  const current_year = new Date().getFullYear().toString();
  document.querySelector('#current_year').textContent = current_year;

})();

//  jQuery start from here 👾
// $(document).ready(function () {});
