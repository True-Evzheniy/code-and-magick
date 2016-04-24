'use strict';


function Gallery() {
  var self = this;

  var overlay = document.querySelector('.overlay-gallery');
  var preview = document.querySelector('.overlay-gallery-preview');
  var previewImage = preview.appendChild(new Image());
  this.Images = [];

  // this.init = function(evt) {
  //
  // }

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
    overlay.classList.remove('invisible');
    self.showPhoto(self.currentImage);
  };

  this.showPhoto = function(number) {
    self.Images.forEach(function(item) {
      if(item.id === number) {
        previewImage.src = item.src;
      }
    });
  };

}

module.exports = new Gallery();
