'use strict';


function Gallery() {
  var self = this;

  var overlay = document.querySelector('.overlay-gallery');
  var preview = document.querySelector('.overlay-gallery-preview');
  var previewImage = preview.appendChild(new Image());
  var btnNext = document.querySelector('.overlay-gallery-control-right');
  var btnPrevious = document.querySelector('.overlay-gallery-control-left');
  var numberCurrent = document.querySelector('.preview-number-current');
  var numberTotal = document.querySelector('.preview-number-total');
  var btnClose = document.querySelector('.overlay-gallery-close');
  this.Images = [];

  this.getImages = function(container) {
    var nodeImages = container.querySelectorAll('img');
    Array.prototype.forEach.call(nodeImages, function(item, i) {
      self.Images.push({src: item.getAttribute('src'), id: i});
    });
  };

  this.getCurrentImgId = function(image) {
    self.Images.forEach(function(item) {
      if(item.src === image.getAttribute('src')) {
        self.currentImage = item.id;
      }
    });
  };

  this.init = function(evt) {
    evt.preventDefault();
    self.getImages(evt.currentTarget);
    self.getCurrentImgId(evt.target);
    self.showGallery();
  };

  this.showGallery = function() {
    numberCurrent.innerHTML = self.currentImage + 1;
    numberTotal.innerHTML = self.Images.length;
    overlay.classList.remove('invisible');
    self.showPhoto(self.currentImage);
    btnNext.addEventListener('click', self.showNextPhoto);
    btnPrevious.addEventListener('click', self.showPreviousPhoto);
    btnClose.addEventListener('click', self._onCloseClick);
    window.addEventListener('keydown', self.closeOnEsc);

  };

  this.showPhoto = function(number) {
    self.Images.forEach(function(item) {
      if(item.id === number) {
        previewImage.src = item.src;
      }
    });
  };

  this.showNextPhoto = function(evt) {
    evt.preventDefault();
    self.currentImage += 1;
    // Дошли до конца - начнем с начала
    if( self.currentImage > self.Images.length - 1 ) {
      self.currentImage = 0;
    }
    numberCurrent.innerHTML = self.currentImage + 1;
    self.showPhoto(self.currentImage);
  };

  this.showPreviousPhoto = function(evt) {
    evt.preventDefault();
    self.currentImage -= 1;
    // Дошли до начала - начнем с конца
    if( self.currentImage < 0 ) {
      self.currentImage = self.Images.length - 1;
    }
    numberCurrent.innerHTML = self.currentImage + 1;
    self.showPhoto(self.currentImage);
  };

  this.closeOnEsc = function(evt) {
    if(evt.keyCode === 27) {
      overlay.classList.add('invisible');
      self.hideGallery();
    }
  };

  this.hideGallery = function() {
    btnClose.removeEventListener('click', self._onCloseClick);
    btnPrevious.removeEventListener('click', self.showPreviousPhoto);
    btnNext.removeEventListener('click', self.showNextPhoto);
    window.removeEventListener('keydown', self.closeOnEsc);
    self.Images = [];
  };

  this._onCloseClick = function(evt) {
    if(evt.target.classList.contains('overlay-gallery-close')) {
      overlay.classList.add('invisible');
      self.hideGallery();
    }
  };

}

module.exports = new Gallery();
