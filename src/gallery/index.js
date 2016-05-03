'use strict';

var gallery = require('./gallery');
var photogallery = document.querySelector('.photogallery');
photogallery.addEventListener('click', gallery.init);

window.addEventListener('hashchange', function() {
  var re = /#photo\/(\S+)/;
  if( location.hash.match(re)) {
    gallery.showGallery(location.hash.match(re)[1]);
  } else if (location.hash === '') {
    gallery.hideGallery();
  }
});
