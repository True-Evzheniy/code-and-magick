'use strict';
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var reviewTemplate = document.querySelector('#review-template');
var elementToClone;
reviewsFilter.classList.add('invisible');
var reviews = document.querySelector('.reviews');
var dataReviews;
function getReviews(successFn) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
  xhr.timeout = 10000;
  xhr.send();

  xhr.onreadystatechange = function() {
    if(xhr.readyState !== 4) {
      reviews.classList.add('reviews-list-loading');
    } else {
      if(xhr.status !== 200) {
        reviews.classList.add('reviews-load-failure');
      } else {
        reviews.classList.remove('reviews-list-loading');
        var d = JSON.parse(xhr.responseText);
        successFn(d);
      }
    }
  };
  xhr.ontimeout = function() {
    reviews.classList.add('reviews-load-failure');
  };

}


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
  container.appendChild(element);
}

function renderReviews(data) {
  clean();
  data.forEach(function(item) {
    renderReview(item, reviewsList);
    reviewsFilter.classList.remove('invisible');
  });
}
function start(data) {
  dataReviews = data;
  renderReviews(dataReviews);
  enabledFilters(dataReviews);
}
function clean() {
  reviewsList.innerHTML = '';
}
function enabledFilters(data) {
  reviewsFilter.onclick = function(evt) {
    var id = evt.target.id;
    var dataToSort = data.slice('');
    switch(id) {
      case 'reviews-all':
        renderReviews(dataToSort);
        break;
      case 'reviews-recent':
        var compareDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);
        renderReviews(
          dataToSort
            .sort(function(a, b) {
              return new Date(b.date) - new Date(a.date);
            })
            .filter(function(item) {
              return (compareDate - new Date(item.date)) < 0;
            }));
        break;
      case 'reviews-good':
        renderReviews(
          dataToSort
            .sort(function(a, b) {
              return b.rating - a.rating;
            })
            .filter(function(item) {
              return item.rating >= 3;
            }));
        break;
      case 'reviews-bad':
        renderReviews(
          dataToSort
            .sort(function(a, b) {
              return a.rating - b.rating;
            })
            .filter(function(item) {
              return item.rating < 3;
            }));
        break;
      case 'reviews-popular':
        renderReviews(
          dataToSort.sort(function(a, b) {
            return b.review_usefulness - a.review_usefulness;
          }));
        break;
    }
  };
}

getReviews(start);
