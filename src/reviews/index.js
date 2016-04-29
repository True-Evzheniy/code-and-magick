'use strict';

var Review = require('./review');

module.export = (function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var filtersBtn = reviewsFilter.querySelectorAll('input');
  var reviewsList = document.querySelector('.reviews-list');
  reviewsFilter.classList.add('invisible');
  var reviews = document.querySelector('.reviews');
  var dataReviews;
  var reviewsFiltered;
  var PAGE_SIZE = 3;
  var loadPageBtn = document.querySelector('.reviews-controls-more');
  var counter = 0;
  var renderedReviews = [];
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

  function renderReviews(data, page) {
    if (!page) {
      page = 0;
      clean();
    }
    var tempData = data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    if(PAGE_SIZE >= data.length - PAGE_SIZE * page) {
      loadPageBtn.classList.add('invisible');
    } else {
      loadPageBtn.classList.remove('invisible');
    }
    tempData.forEach(function(item) {
      renderedReviews.push(new Review(item, reviewsList));
      reviewsFilter.classList.remove('invisible');
    });
  }

  function start(data) {
    dataReviews = data;
    var filter = localStorage.getItem('filter');
    var filteredData = filtring(filter, data);
    if (filteredData) {
      renderReviews(reviewsFiltered, counter);
      setFilterBtn(filter);
    } else {
      renderReviews(dataReviews);
    }
    enabledFilters(dataReviews);
    enabledBtn();
  }
  function clean() {
    // reviewsList.innerHTML = '';
    renderedReviews.forEach(function(item) {
      item.remove();
    });
    renderedReviews = [];
  }

  function setFilterBtn(filter) {
    Array.prototype.forEach.call(filtersBtn, function(item) {
      item.checked = false;
      if(item.id === filter) {
        item.checked = true;
      }
    });
  }

  function filtring(filterId, data) {
    var dataToSort = data.slice('');

    switch(filterId) {
      case 'reviews-all':
        reviewsFiltered = dataToSort;
        break;
      case 'reviews-recent':
        var compareDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);
        reviewsFiltered = dataToSort
          .sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
          })
          .filter(function(item) {
            return (compareDate - new Date(item.date)) < 0;
          });
        break;
      case 'reviews-good':
        reviewsFiltered = dataToSort
          .sort(function(a, b) {
            return b.rating - a.rating;
          })
          .filter(function(item) {
            return item.rating >= 3;
          });
        break;
      case 'reviews-bad':
        reviewsFiltered = dataToSort
          .sort(function(a, b) {
            return a.rating - b.rating;
          })
          .filter(function(item) {
            return item.rating < 3;
          });
        break;
      case 'reviews-popular':
        reviewsFiltered = dataToSort.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }
    return reviewsFiltered;
  }

  function enabledFilters(data) {
    reviewsFilter.onclick = function(evt) {
      counter = 0;
      var id = evt.target.id;
      var filteredData = filtring(id, data);
      if(filteredData) {
        localStorage.setItem('filter', id);
        renderReviews(reviewsFiltered, counter);
      }
    };
  }
  function enabledBtn() {
    loadPageBtn.onclick = function() {
      counter++;
      renderReviews(reviewsFiltered, counter);
    };
  }
  getReviews(start);
})();
