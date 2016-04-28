'use strict';

var gallery = require('./gallery');
var photogallery = document.querySelector('.photogallery');
photogallery.addEventListener('click', gallery.init);
