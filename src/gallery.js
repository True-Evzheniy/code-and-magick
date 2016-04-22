'use strict';
module.export = (function() {
  var arrImgToParse = document.querySelectorAll('.photogallery img');
  var overlay = document.querySelector('.overlay-gallery');
  var arrPhotos = [];
  var photogallery = document.querySelector('.photogallery');
  var currentPhoto;
  var preview = document.querySelector('.overlay-gallery-preview');
  var numberTotal = document.querySelector('.preview-number-total');
  var numberCurrent = document.querySelector('.preview-number-current');
  var currentNumberPhotoInArr;

  // получение массива изображений
  function getPhotos(arr) {
    Array.prototype.forEach.call(arr, function(item, i) {
      arrPhotos.push({src: item.getAttribute('src'), id: i});
    });
  }

  getPhotos(arrImgToParse);

  function showGallery(numberImg) {
    overlay.classList.remove('invisible');
    showPhoto(numberImg);
  }

  window.showGallery = showGallery;
  window.getPhotos = getPhotos;


  // Инициализация
  function initGallery() {
    currentPhoto = preview.appendChild(new Image());
    numberTotal.innerHTML = arrPhotos.length;
    overlay.addEventListener('click', _onCloseClick);
    overlay.addEventListener('click', showPreviousPhoto);
    overlay.addEventListener('click', showNextPhoto);
    photogallery.addEventListener('click', onOpenGallery);
    window.addEventListener('keydown', closeOnEsc);
  }

  // обработчик кликов по изображениям на странице
  function onOpenGallery(evt) {
    // Если кликнутое изображение есть в нодлисте, вызвать Fn показа галереи с этим индексом.
    var numberImg = Array.prototype.indexOf.call(arrImgToParse, evt.target);
    if(numberImg > -1) {
      showGallery(numberImg);
    }
  }

  initGallery();

  // Показать фото по номеру
  function showPhoto(number) {
    currentPhoto.setAttribute('src', arrPhotos[number].src);
    numberCurrent.innerHTML = number + 1;
    currentNumberPhotoInArr = number;
  }

  // клик по крестику
  function _onCloseClick(evt) {
    if(evt.target.classList.contains('overlay-gallery-close')) {
      overlay.classList.add('invisible');
    }
  }


  // Показать следующее фото
  function showNextPhoto(evt) {
    if(evt.target.classList.contains('overlay-gallery-control-right')) {
      currentNumberPhotoInArr += 1;
      console.log(currentNumberPhotoInArr);
      // Дошли до конца - начнем с начала
      if( currentNumberPhotoInArr > arrPhotos.length - 1 ) {
        currentNumberPhotoInArr = 0;
      }
      showPhoto(currentNumberPhotoInArr);
    }
  }

  // Показать предыдущее фото
  function showPreviousPhoto(evt) {
    if(evt.target.classList.contains('overlay-gallery-control-left')) {
      currentNumberPhotoInArr -= 1;
      // Перелистываем с начала на конец галереи
      if( currentNumberPhotoInArr < 0 ) {
        currentNumberPhotoInArr = arrPhotos.length - 1;
      }
      showPhoto(currentNumberPhotoInArr);
    }
  }

  function closeOnEsc(evt) {
    if(evt.keyCode === 27) {
      overlay.classList.add('invisible');
    }
  }
})();
