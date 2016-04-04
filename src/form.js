'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formReviewTextarea = formContainer.querySelector('#review-text');
  var formNameInput = formContainer.querySelector('#review-name');
  var labelNameInput = formContainer.querySelector('.review-fields-name');
  var labelReviewTextarea = formContainer.querySelector('.review-fields-text');
  var formSubmitBtn = formContainer.querySelector('.review-submit');
  var formLabelsFild = formContainer.querySelector('.review-fields');

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

  formNameInput.required = true;
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

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
