// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters', 'ionic.contrib.ui.cards'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    } 
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.gospel', {
      url: '/gospel',
      views: {
        'tab-gospel': {
          templateUrl: 'templates/tab-gospel.html',
          controller: 'GospelCtrl'
        }
      }
    })
    .state('tab.gospel-detail', {
      url: '/gospeldetail/:gospelId',
      views: {
        'tab-gospel': {
          templateUrl: 'templates/gospel/gospel-detail.html',
          controller: 'GospelDetailCtrl'
        }
      }
    })


    .state('tab.tools', {
      url: '/tools',
      views: {
        'tab-tools': {
          templateUrl: 'templates/tab-tools.html'
        }
      }
    })
    .state('tab.tool-bible', {
      url: '/tools/bible',
      views: {
        'tab-tools': {
          templateUrl: 'templates/tools/tool-bible.html',
          controller: 'BibleVerseCtrl'
        }
      }
    })

    .state('tab.questionnaire', {
      url: '/questionnaire',
      views: {
        'tab-questionnaire': {
          templateUrl: 'templates/tab-questionnaire.html',
          controller: 'QuestionnaireCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/gospel');

})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
