angular.module('Calorie Counter.services', [])

// factory for saving application data
.factory('$localstorage', ['$window', function($window) {
	return {
			
		// save a single string to local storage
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
			
		// loading a single string from local storage
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
			
		// saving an object to local storage
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
			
		// loading an object from local storage
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || null);
		}
	}
}]);