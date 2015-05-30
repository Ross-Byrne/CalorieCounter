angular.module('Calorie Counter', ['ionic', 'Calorie Counter.controllers', 'Calorie Counter.services'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
      		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url: "/app",
    	abstract: true,
    	templateUrl: "templates/menu.html"
	})

	.state('app.home', {
		url: "/home",
		views: {
			'menuContent': {
				templateUrl: "templates/home.html",
				controller: 'HomeCtrl'
			}
		}
	})
	
	.state('app.calories', {
		url: "/calories",
		views: {
			'menuContent': {
				templateUrl: "templates/calories.html",
				controller: 'CalorieCtrl'
			}
		}
	})
	
	.state('app.updateDetails', {
		url: "/updateDetails",
		views: {
			'menuContent': {
				templateUrl: "templates/updateDetails.html",
				controller: 'UpdateCtrl'
			}
		}
	})
	
	.state('app.activityLevel', {
		url: "/activityLevel",
		views: {
			'menuContent': {
				templateUrl: "templates/activityLevel.html",
				controller: 'ActivityCtrl'
			}
		}
	})

  .state('app.settings', {
		url: "/settings",
    	views: {
			'menuContent': {
				templateUrl: "templates/settings.html",
				controller: 'SettingsCtrl'
      }
    }
  });
	
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/home');
});
