
'use strict';
var elementToClone;
var reviewTemplate = document.querySelector('#review-template');


if('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
}


function createDomReview(data) {
  var element = elementToClone.cloneNode(true);
  var imgTemplate = element.querySelector('img');
  var textReview = element.querySelector('.review-text');
  var reviewRating = element.querySelector('.review-rating');
  var reviewDate = element.querySelector('.review-date');
  var reviewUsefulness = element.querySelector('.review-usefulness');
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
  reviewDate.innerHTML = new Date(data.date).toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'});
  reviewUsefulness.innerHTML = data.review_usefulness;
  return element;
}

module.exports = createDomReview;
