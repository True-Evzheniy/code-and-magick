'use strict';


function Gallery() {

  this.overlay = document.querySelector('.overlay-gallery');
  this.preview = document.querySelector('.overlay-gallery-preview');
  this.previewImage = this.preview.appendChild(new Image());
  this.btnNext = document.querySelector('.overlay-gallery-control-right');
  this.btnPrevious = document.querySelector('.overlay-gallery-control-left');
  this.numberCurrent = document.querySelector('.preview-number-current');
  this.numberTotal = document.querySelector('.preview-number-total');
  this.btnClose = document.querySelector('.overlay-gallery-close');
  this.photogallery = document.querySelector('.photogallery');
  this.Images = [];

  this.getImages = this.getImages.bind(this);

  this.getCurrentImgId = this.getCurrentImgId.bind(this);

  this.getImgId = this.getImgId.bind(this);

  this.init = this.init.bind(this);

  this.showGallery = this.showGallery.bind(this);

  this.showPhoto = this.showPhoto.bind(this);

  this.getSrcImgById = this.getSrcImgById.bind(this);

  this.showNextPhoto = this.showNextPhoto.bind(this);

  this.showPreviousPhoto = this.showPreviousPhoto.bind(this);

  this.closeOnEsc = this.closeOnEsc.bind(this);

  this.hideGallery = this.hideGallery.bind(this);

  this._onCloseClick = this._onCloseClick.bind(this);

  this.hashHandler = this.hashHandler.bind(this);

}

Gallery.prototype.getImages = function(container) {
  var nodeImages = container.querySelectorAll('img');
  this.Images = [];
  Array.prototype.forEach.call(nodeImages, function(item, i) {
    this.Images.push({src: item.getAttribute('src'), id: i});
  }.bind(this));
};

Gallery.prototype.getCurrentImgId = function(image) {
  this.Images.forEach(function(item) {
    if(item.src === image.getAttribute('src')) {
      this.currentImage = item.id;
      location.hash = 'photo/' + image.getAttribute('src');
    }
  }.bind(this));
};

Gallery.prototype.getImgId = function(src) {
  this.Images.forEach(function(item) {
    if(item.src === src) {
      this.currentImage = item.id;
    }
  }.bind(this));
};

Gallery.prototype.init = function(evt) {
  evt.preventDefault();
  this.getImages(this.photogallery);
  this.getCurrentImgId(evt.target);
};

Gallery.prototype.showGallery = function(str) {
  this.getImages(this.photogallery);
  this.getImgId(str);
  this.numberCurrent.innerHTML = this.currentImage + 1;
  this.numberTotal.innerHTML = this.Images.length;
  this.overlay.classList.remove('invisible');
  this.showPhoto(this.currentImage);
  this.btnNext.addEventListener('click', this.showNextPhoto);
  this.btnPrevious.addEventListener('click', this.showPreviousPhoto);
  this.btnClose.addEventListener('click', this._onCloseClick);
  window.addEventListener('keydown', this.closeOnEsc);
};

Gallery.prototype.getSrcImgById = function(id) {
  var src;
  this.Images.forEach(function(item) {
    if(item.id === id) {
      this.currentImage = item.id;
      src = item.src;
    }
  }.bind(this));
  return src;
};

Gallery.prototype.showNextPhoto = function(evt) {
  evt.preventDefault();
  this.currentImage += 1;
  // Дошли до конца - начнем с начала
  if( this.currentImage > this.Images.length - 1 ) {
    this.currentImage = 0;
  }
  this.numberCurrent.innerHTML = this.currentImage + 1;
  location.hash = 'photo/' + this.getSrcImgById(this.currentImage);
};

Gallery.prototype.showPhoto = function(number) {
  this.Images.forEach(function(item) {
    if(item.id === number) {
      this.previewImage.src = item.src;
    }
  }.bind(this));
};

Gallery.prototype.showPreviousPhoto = function(evt) {
  evt.preventDefault();
  this.currentImage -= 1;
  // Дошли до начала - начнем с конца
  if( this.currentImage < 0 ) {
    this.currentImage = this.Images.length - 1;
  }
  this.numberCurrent.innerHTML = this.currentImage + 1;
  location.hash = 'photo/' + this.getSrcImgById(this.currentImage);
};

Gallery.prototype.closeOnEsc = function(evt) {
  if(evt.keyCode === 27) {
    location.hash = '';
  }
};

Gallery.prototype.hideGallery = function() {
  this.btnClose.removeEventListener('click', this._onCloseClick);
  this.btnPrevious.removeEventListener('click', this.showPreviousPhoto);
  this.btnNext.removeEventListener('click', this.showNextPhoto);
  window.removeEventListener('keydown', this.closeOnEsc);
  this.Images = [];
  this.overlay.classList.add('invisible');
};

Gallery.prototype._onCloseClick = function(evt) {
  if(evt.target.classList.contains('overlay-gallery-close')) {
    location.hash = '';
  }
};

Gallery.prototype.hashHandler = function() {
  var re = /#photo\/(\S+)/;
  if( location.hash.match(re)) {
    this.showGallery(location.hash.match(re)[1]);
  } else if (location.hash === '') {
    this.hideGallery();
  }
};

module.exports = new Gallery();
