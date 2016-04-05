'use strict';
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var reviewTemplate = document.querySelector('#review-template');
var elementToClone;
reviewsFilter.classList.add('invisible');

if('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
}


function renderReview(data, container) {
  var element = elementToClone.cloneNode(true);
  var imgTemplate = element.querySelector('img');
  var textReview = element.querySelector('.review-text');
  var reviewRating = element.querySelector('.review-rating');
  reviewRating.style.display = 'inline-block';
  for(var i = 0; i < data.rating - 1; i++) {
    reviewRating.parentNode.insertBefore(reviewRating.cloneNode(true), reviewRating.nextSibling);
  }
  var avatarImage = new Image(124, 124);
  textReview.textContent = data.description;
  avatarImage.src = data.author.picture;
  avatarImage.onload = function() {
    imgTemplate.src = data.author.picture;
    imgTemplate.width = avatarImage.width;
    imgTemplate.height = avatarImage.height;
  };
  avatarImage.onerror = function() {
    element.classList.add('review-load-failure');
  };
  imgTemplate.alt = imgTemplate.title = data.author.name;
  container.appendChild(element);
}

window.reviews.forEach(function(item) {
  renderReview(item, reviewsList);
});
reviewsFilter.classList.remove('invisible');
