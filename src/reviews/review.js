'use strict';

var createDomReview = require('./create-dom-review');


function Review(data, container) {
  this.data = data;
  this.element = createDomReview(data);
  this.element.addEventListener('click', this.onClickQuizHendler);
  container.appendChild(this.element);
}

Review.prototype.onClickQuizHendler = function(evt) {
  if(evt.target.classList.contains('review-quiz-answer')) {
    evt.target.classList.add('review-quiz-answer-active');
  }
};

Review.prototype.remove = function() {
  this.element.removeEventListener('click', this.onClickQuizHendler);
  this.element.parentNode.removeChild(this.element);
};

module.exports = Review;
