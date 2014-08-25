angular.module('starter.filters', [])

.filter('questionnaireAnswer', function () {
  return function (input) {
    if (typeof input === 'boolean') {
      return input ? 'Yes' : 'No';
    }

    return input;
  }
});