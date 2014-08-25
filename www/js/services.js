angular.module('starter.services', [])

.factory('Gospel', function() {
  var gospelDetails = [
    { 
      id: 0, 
      name: 'Grace',
      headlines: [
        'Heaven is a free gift',
        'It is not earned or deserved'
      ]
    },
    { 
      id: 1, 
      name: 'Man',
      headlines: [
        'Is a sinner',
        'Cannot save himself'
      ]
    },
    { 
      id: 2, 
      name: 'God',
      headlines: [
        'Is merciful',
        'Is just'
      ]
    },
    { 
      id: 3, 
      name: 'Jesus',
      headlines: [
        'Infinite God/Man',
        'Paid for our sin'
      ]
    },
    { 
      id: 4, 
      name: 'Faith',
      headlines: [
        'Not temporal faith',
        'Trusting Jesus alone'
      ]
    },
  ];

  return {
    all: function() {
      return gospelDetails;
    },
    categories: function () {
      return gospelDetails.map(function (i) { return i.name; })
    },
    get: function(gospelId) {
      // Simple index lookup
      return gospelDetails[gospelId];
    }
  }
})

.factory('BibleVerseProvider', function ($http) {
  return {
    get: function () {
      return $http.get('data/verses.json');
    }
  }
})