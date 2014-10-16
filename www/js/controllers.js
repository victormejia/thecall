angular.module('starter.controllers', [])

.controller('GospelCtrl', function($scope, Gospel) {
  $scope.gospelDetails = Gospel.all();
})

.controller('GospelDetailCtrl', function($scope, $stateParams, Gospel, $ionicModal) {
  $scope.gospelDetail = Gospel.get($stateParams.gospelId);
  $scope.gospelDetailUrl = 'templates/gospel/gospel-' + $scope.gospelDetail.name + '.html';

  $ionicModal.fromTemplateUrl('templates/gospel/recite/recite-' + $scope.gospelDetail.name + '.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('BibleVerseCtrl', function($scope, BibleVerseProvider, Gospel, $ionicModal, $ionicSwipeCardDelegate, $ionicPopup, $window) {
  BibleVerseProvider.get().then(function (rsp) {
    $scope.verses = rsp.data;
  });

  $scope.verseCategories = Gospel.categories();

  $ionicModal.fromTemplateUrl('templates/tools/bible-verses.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(gospelPoint) {
    $scope.currentGospelPoint = gospelPoint;
    $scope.modal.show().then(function () {
      $scope.cardsCopy = angular.copy($scope.verses[gospelPoint]);
      $scope.cardsCopy.push('All done! Start over?');
      $scope.cardLimit = $scope.cardsCopy.length;
      $scope.cards = [];
      $scope.currentCard = 0;
      $scope.cards.push($scope.cardsCopy[0]);

      // check whether to show the coach mark
      var shownBibleVerseCoachMark = !!JSON.parse(window.localStorage['shownBibleVerseCoachMark'] || null);
      if (!shownBibleVerseCoachMark) {
          var coachPopup = $ionicPopup.alert({
            title: 'Hello :)',
            template: 'Swipe down or tap "Next" to view the next verse.',
            okText: 'Got it!'
          });

          coachPopup.then(function(res) {
            $window.localStorage.setItem('shownBibleVerseCoachMark', true);
          });
        };
    });
  };
  $scope.closeModal = function() {
    $scope.modal.hide().then(function () {
      $scope.cards = [];
      $scope.currentCard = 0;
    })
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.cardSwiped = function(index) {
    $scope.currentCard++;
    if ($scope.currentCard === $scope.cardLimit) {
      $scope.currentCard = 0;
    }
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
      var newCard = $scope.cardsCopy[$scope.currentCard];
      $scope.cards.push(newCard);
  };

  $scope.startOver = function () {
    $scope.currentCard = 0;
  };

  $scope.$watch('currentCard', function (newVal, oldVal) {
    if (newVal !== oldVal) {
      if (newVal === ($scope.cardLimit -1) ) {
        $scope.nextText = 'OK';
      }
      else {
        $scope.nextText = 'Next';
      }
    }
  })
})

.controller('CardCtrl', function ($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function () {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
})

.controller('QuestionnaireCtrl', function($scope, $ionicActionSheet, $filter, $ionicPopup) {

  $scope.resetForm = function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Reset Form',
      template: 'Are you sure you want to reset the form?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        angular.forEach($scope.form, function (val, key) {
          typeof val.value === 'boolean' ? (val.value = false) : (val.value = '');
        });
      }
    });

  };

  $scope.emailForm = function () {
    var body = [];
    angular.forEach($scope.form, function (val, key) {
      body.push(val.text + ' ' + $filter('questionnaireAnswer')(val.value));
    });

    if(window.plugins && window.plugins.emailComposer) { 
      window.plugins.emailComposer.showEmailComposerWithCallback(
        null,
        'Spiritual Questionnaire', // Subject
        body.join('<br /><br />'),           // Body
        null,                      // To
        null,                      // CC
        null,                      // BCC
        true,                      // isHTML
        null,                      // Attachments
        null                       // Attachment Data
      );
    }
  };

  $scope.actions = [$scope.resetForm, $scope.emailForm];

  $scope.showActions = function () {
    $ionicActionSheet.show({
      buttons: [
       { text: 'Reset' },
       { text: 'Email' }
     ],
     cancelText: 'Cancel',
     buttonClicked: function(index) {
       $scope.actions[index]();
       return true;
     }
    })
  };

  $scope.form = {
    helpOut: { text: 'Would you help us out by answering a few questions?', value: false },
    spiritualInterest: { text: 'There seems to be a rise of interest in religion today. Are you <strong>more</strong> interested in spiritual things now, than you were 5 years ago?', value: false },
    supremeGod: { text: 'Do you see God as a supreme being to Whom you must ultimately answer?', value: false} ,
    pray: { text: 'Do you in some way pray every day?', value: false},
    attendChurch: { text: 'Do you attend a church?', value: false},
    churchName: { text: 'Would you mind sharing the name of the church you attend or have attended in the past?', value: '' },
    churchEternalLife: { text: 'Do you think that a church should help people discover eternal life – that is, how to get to heaven?', value: false },
    name: { text: 'May I have your name?', value: '' },
    diagnosticHeaven: { text: 'Have you come to the place in your spiritual life where you <strong>know for certain</strong> that if you were to die today, you would go to Heaven?', value: false },
    shareEternalLife: { text: 'May I share with you what the Bible has to say about eternal Life?', value: false },
    diagnosticBeforeGod: { text: 'Let me ask you one more question: If you were to die today and stand before God, and He were to say to you, "Why should I let you into My heaven?" What would you say?', value: ''}
  }
});
