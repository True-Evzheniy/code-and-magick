'use strict';

var arrImgToParse = document.querySelectorAll('.photogallery img');
var overlay = document.querySelector('.overlay-gallery');
var arrPhotos = [];
var currentPhoto;
var preview = document.querySelector('.overlay-gallery-preview');
var numberTotal = document.querySelector('.preview-number-total');
var numberCurrent = document.querySelector('.preview-number-current');
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

function initGallery() {
  currentPhoto = preview.appendChild(new Image());
  numberTotal.innerHTML = arrPhotos.length;
}

function showPhoto(number) {
  currentPhoto.setAttribute('src', arrPhotos[number].src);
  numberCurrent.innerHTML = ++number;
}
debugger;
