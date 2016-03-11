var app = angular.module('tvchat', [
	'ionic',
  'ionic.service.core',
	'ngCordova',
	'firebase',
	'angularMoment',
  'ionic.service.push',
  'ionic.service.analytics',
	'tvchat.controllers',
	'tvchat.services',
	'tvchat.filters',
	'tvchat.utils'
]);


app.constant("FIREBASE_URL", 'https://ionic-tvchat-test.firebaseio.com');
app.constant("FACEBOOK_APP_ID", '474011059451126');
app.constant()

app.run(function ($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function () {
    $ionicAnalytics.register();
  });
});

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    var deploy = new Ionic.Deploy();
    deploy.watch().then(
      function noop() {
      },
      function noop() {
      },
      function hasUpdate(hasUpdate) {
        console.log("Has Update ", hasUpdate);
        if (hasUpdate) {
          console.log("Calling ionicDeploy.update()");
          deploy.update().then(function (deployResult) {
          // deployResult will be true when successfull and
          // false otherwise
          }, function (deployUpdateError) {
          // fired if we're unable to check for updates or if any
          // errors have occured.
            console.log('Ionic Deploy: Update error! ', deployUpdateError);
          }, function (deployProgress) {
          // this is a progress callback, so it will be called a lot
          // deployProgress will be an Integer representing the current
          // completion percentage.
            console.log('Ionic Deploy: Progress... ', deployProgress);
          });
        }
      }
    );
  });
});

app.run(function ($rootScope, $ionicPlatform, $cordovaStatusbar) {


		$ionicPlatform.ready(function () {

			// Hide the accessory bar by default
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			// Color the iOS status bar text to white
			if (window.StatusBar) {
				$cordovaStatusbar.overlaysWebView(true);
				$cordovaStatusbar.style(0); //Light
			}
		});
	});

app.config(function ($stateProvider, $urlRouterProvider, FACEBOOK_APP_ID) {
	openFB.init({appId: FACEBOOK_APP_ID});
});

app.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('intro', {
				url: '/',
				templateUrl: 'templates/intro.html',
				controller: 'IntroCtrl'
			})

			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: 'MenuCtrl'
			})

			.state('app.search', {
				url: "/search",
				views: {
					'menuContent': {
						templateUrl: "templates/search.html",
						controller: 'SearchCtrl'
					}
				}
			})

			.state('app.show', {
				url: "/show/:showId",
				cache: false,
				views: {
					'menuContent': {
						templateUrl: "templates/show.html",
						controller: 'ShowCtrl'
					}
				}
			})
		;

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');

	});
