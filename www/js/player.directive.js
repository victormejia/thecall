angular.module('starter')
  .filter('secToMin', function () {
    return function () {

    }
  })
  .directive('player', function ($ionicPopup, $interval) {

    function link(scope, element, attrs) {
      
      var mediaTimer, getDurationTimer, getDurationCounter = 0;

      scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Error reading file.'
        });
      };

      scope.ui = {
        playing: false,
        duration: 0,
        position: 0,
        error: false,
        onError: function () {
          scope.$apply(function () {
            scope.showAlert();
            scope.ui.error = true;
          });
          clearInterval(getDurationTimer);
          clearInterval(mediaTimer);
        },
        onMediaStatus: function (status) {
          var playing;
          switch (status) {
            case Media.MEDIA_RUNNING:
              playing = true;
              break;
            case Media.MEDIA_PAUSED:
              playing = false;
              break;
          }
          scope.$apply(function () {
            scope.ui.playing = playing;
          });
        }
      };

      scope.togglePlay = function () {
        if (window.Media) {
          if (scope.ui.playing) {
            scope.media.pause();
            clearInterval(mediaTimer);
          }
          else {
            scope.ui.play();
          }
        }
      };

      scope.ui.play = function () {
        if (!scope.media) {
          scope.media = new Media(attrs.player, null, scope.ui.onError, scope.ui.onMediaStatus );
        }

        // timer to update position
        mediaTimer = setInterval(function () {
          scope.media.getCurrentPosition(function (position) {
              scope.$apply(function () {
                scope.ui.position = position > -1 ? Math.ceil(position) : 0;
              });
            }
          );
        }, 1000);

        // timer to get duration
        getDurationTimer = setInterval(function () {
          getDurationCounter++;
          if (getDurationCounter > 20) {
            clearInterval(getDurationCounter);
          }
          var duration = scope.media.getDuration();
          if (duration > 0) {
            clearInterval(getDurationTimer);
            scope.$apply(function () {
              scope.ui.duration = Math.ceil(duration);
            });
          }
        }, 100);

        if (!scope.ui.error) {
          scope.media.play({ playAudioWhenScreenIsLocked : true });
        }
      };

    }

    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      template: ['<div class="range" style="border:1px solid #ececec;">',
                    '<i ng-class="{\'ion-ios7-play\': !ui.playing, \'ion-ios7-pause\': ui.playing}" class="icon" ng-click="togglePlay()"></i>',
                    '<span>{{ui.position}}</span>',
                    '<input type="range" name="volume" min="0" max="{{ui.duration}}" value="0" ng-model="ui.position">',
                    '<span>{{ui.duration}}</span>',
                  '</div>'].join(''),
      link: link
    }
  });




