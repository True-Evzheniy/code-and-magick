'use strict';

var gallery = require('./gallery');
gallery.hashHandler();
var photogallery = document.querySelector('.photogallery');
photogallery.addEventListener('click', gallery.init);
window.addEventListener('hashchange', gallery.hashHandler);
