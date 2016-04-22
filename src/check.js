'use strict';
module.exports = (function() {
  function getMessage(a, b) {
    var value;
    if(a === true) {
      value = 'Я попал в ' + b;
    }

    if(a === false) {
      value = 'Я никуда не попал';
    }

    if(typeof a === 'number') {
      value = 'Я прыгнул на ' + a * 100 + ' сантиметров';
    }

    if(Array.isArray(a) && Array.isArray(b)) {
      var summ = 0;
      for(var i = 0; i < a.length; i++) {
        summ += a[i] * b[i];
      }
      value = 'Я прошёл ' + summ + ' метров';
    }

    if(Array.isArray(a) && !Array.isArray(b)) {
      summ = 0;
      for(i = 0; i < a.length; i++) {
        summ += a[i];
      }
      value = 'Я прошёл ' + summ + ' шагов';
    }

    return value;

  }
})();
