function getMessage(a, b) {

  if(a === true) {
    return 'Я попал в ' +  b;
  }

  if(a === false) {
    return 'Я никуда не попал';
  }

  if(typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }

  if(Array.isArray(a) && Array.isArray(b)) {
    var summ = 0;
    for(var i = 0 ; i < a.length; i++) {
      summ += a[i] * b[i];
    }
    return 'Я прошёл ' + summ + ' метров';
  }

  if(Array.isArray(a)) {
    var summ = 0;
    for(var i = 0; i < a.length; i++) {
      summ += a[i];
    }
    return 'Я прошёл ' + summ + ' шагов';
  }

}
