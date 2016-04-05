'use strict';

(function() {
  var browserCookies = require('browser-cookies');

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formReviewTextarea = formContainer.querySelector('#review-text');
  var formNameInput = formContainer.querySelector('#review-name');
  var labelNameInput = formContainer.querySelector('.review-fields-name');
  var labelReviewTextarea = formContainer.querySelector('.review-fields-text');
  var formSubmitBtn = formContainer.querySelector('.review-submit');
  var formLabelsFild = formContainer.querySelector('.review-fields');
  var form = formContainer.querySelector('.review-form');
  var radioArr = formContainer.querySelectorAll('[id^=review-mark]');

  function formCheck() {
    if(formNameInput.value.trim()) {
      labelNameInput.classList.add('invisible');
    } else {
      labelNameInput.classList.remove('invisible');
    }
    if(formReviewTextarea.value.trim()) {
      labelReviewTextarea.classList.add('invisible');
    } else {
      labelReviewTextarea.classList.remove('invisible');
    }
    if(formReviewTextarea.required) {
      if(formNameInput.value.trim() && formReviewTextarea.value.trim()) {
        formSubmitBtn.disabled = false;
        formLabelsFild.classList.add('invisible');
      } else {
        formSubmitBtn.disabled = true;
        formLabelsFild.classList.remove('invisible');
      }
    } else {
      labelReviewTextarea.classList.add('invisible');
      if(formNameInput.value.trim()) {
        formSubmitBtn.disabled = false;
        formLabelsFild.classList.add('invisible');
      } else {
        formSubmitBtn.disabled = true;
        formLabelsFild.classList.remove('invisible');
      }
    }
  }

  function getTimeEnd() {
    var now = new Date();
    var birthday = new Date(now.getFullYear(), 8, 11, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    if(now < birthday) {
      birthday = new Date(now.getFullYear() - 1, 8, 11, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    }
    return 2 * now - birthday;
  }
  function getCheckedRadio() {
    for(var i = 0; i < radioArr.length; i++) {
      if(radioArr[i].checked) {
        break;
      }
    }
    return i;
  }
  function checkedRadio(num) {
    for(var i = 0; i < radioArr.length; i++) {
      radioArr[i].checked = false;
    }
    radioArr[num].checked = true;
  }
  formNameInput.required = true;
  checkedRadio(browserCookies.get('radio') || 2);
  formNameInput.value = browserCookies.get('name') || 'Вася Пупкин';
  formReviewTextarea.value = browserCookies.get('review') || '';
  formCheck();

  formContainer.onchange = function(evt) {
    var target = evt.target.id;
    if(target === 'review-mark-1' || target === 'review-mark-2') {
      formReviewTextarea.required = true;
      formCheck();
    } else if(target === 'review-mark-3' || target === 'review-mark-4' || target === 'review-mark-5') {
      formReviewTextarea.required = false;
      formCheck();
    }
  };

  formContainer.oninput = function() {
    formCheck();
  };

  form.onsubmit = function(e) {
    var timeEnd = getTimeEnd();
    e.preventDefault();
    browserCookies.set('name', formNameInput.value, {expires: timeEnd});
    browserCookies.set('review', formReviewTextarea.value, {expires: timeEnd});
    browserCookies.set('radio', getCheckedRadio() + '', {expires: timeEnd});
    form.submit();
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
