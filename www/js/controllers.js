angular.module('Calorie Counter.controllers', ['Calorie Counter.services'])

// controller for Home Page
.controller('HomeCtrl', function($scope, $localstorage) {
	
	// variables
	// default values for user
	$scope.user = {
		name: "Default User",
		gender: "Default",
		weightKG: 0,
		heightCM: 0,
		ageInYears: 0,
		BMR: 0,
		activityLevel: 0,
		dailyCals: 0,
		calsConsumed: 0
	};
	
	// functions to be fired when the view is the active view
	$scope.$on("$ionicView.afterEnter", function(){
  
		// load user details if they are there
		if($localstorage.getObject('user') != null){
			$scope.user = $localstorage.getObject('user');
		}
		else{ // otherwise save defaults
			
			// save default values
			$localstorage.setObject('user', $scope.user);
		} // if
	});
	
}) // HomeCtrl

// controller for the calories page
.controller('CalorieCtrl', function($scope, $localstorage, $state, $ionicHistory, $ionicPopup) {
	// variables
	// array of food objects 
	$scope.foodItems = [];
	
	// functions to be fired when the view is the active view
	$scope.$on("$ionicView.beforeEnter", function(){
  
		// load user details if they are there
		if($localstorage.getObject('user') != null){
			$scope.user = $localstorage.getObject('user');
		}
		else{ // otherwise save defaults
			// save default values
			$localstorage.setObject('user', $scope.user);
		} // if
		
		// load food Items
		if($localstorage.getObject('foodItems') != null){
			$scope.foodItems = $localstorage.getObject('foodItems');
		}
		else{ // otherwise save defaults
			// save default values
			$localstorage.setObject('foodItems', $scope.foodItems);
		} // if
		
	});
	
	// function for adding a new food Item
	// Ionic is being buggy, this funtion wont work 
	// if I try do anymore in it
	$scope.addNewFoodItem = function(){
		var cals = 100;
		// add calories to calsConsumed
		$scope.user.calsConsumed += cals;
		
		$scope.foodItems.push({name: "Bread", calories: cals});
	} // addNewFoodItem()
	
	// function for saving and exiting from the calorie page
	$scope.saveAndExit = function(){
		// save user details and food Items
		$localstorage.setObject('foodItems', $scope.foodItems);	
		$localstorage.setObject('user', $scope.user);
		// disable back button when you move 
		// back to the home page
		$ionicHistory.nextViewOptions({
    		disableBack: true
  		});
		// go to home page
		$state.go('app.home');
	} // saveAndExit()
	
	// confirm delete all food items
 	$scope.showConfirm = function() {
   	var confirmPopup = $ionicPopup.confirm({
     		title: 'Delete All Food Items',
     		template: 'Are you sure you want to delete all food items?'
   	}); // confirmPopup()
   	confirmPopup.then(function(res) {
     		if(res) { // if yes
				// get info
				$scope.foodItems = $localstorage.getObject('foodItems');
				$scope.user = $localstorage.getObject('user');
				
				// emplty food items array and 
				// reset cals consumed
				$scope.foodItems = [];
				$scope.user.calsConsumed = 0;
				
				// save changes
				$localstorage.setObject('foodItems', $scope.foodItems);
				$localstorage.setObject('user', $scope.user);
     		} else { // if no
				// dont delete information
     		} // if
   	}); // confirmPopup.then()
 	}; // showConfirm()
		
}) // CalorieCtrl

// controller for updating user settings
.controller('UpdateCtrl', function($scope, $localstorage, $state) {
	// variables
	// values for activity levels options
	$scope.activityLevels = {
		option1: "Don't exercise or exercise little.",
		option2: "Light exercise or sports 1 - 3 days a week.",
		option3: "Exercise moderately and/or play sports 3 - 5 days a week.",
		option4: "Strenuous sports or hard exercise 6 - 7 days a week.",
		option5: "Very physically challenging jobs or exercise, eg 2 workouts a day."
	};
	
	// users text discription for activity level
	$scope.userActivityLevel = "Select An Activity Level";
	
	// functions to be fired when the view is entered
	$scope.$on("$ionicView.beforeEnter", function(){
  
		// load user details
		$scope.user = $localstorage.getObject('user');
		
		// map activity level to text discription
		if($scope.user.activityLevel == 1.2){
			$scope.userActivityLevel = $scope.activityLevels.option1;	
		} else if($scope.user.activityLevel == 1.375){
			$scope.userActivityLevel = $scope.activityLevels.option2;
		} else if($scope.user.activityLevel == 1.55){
			$scope.userActivityLevel = $scope.activityLevels.option3;
		}else if($scope.user.activityLevel == 1.725){
			$scope.userActivityLevel = $scope.activityLevels.option4;
		}else if($scope.user.activityLevel == 1.9){
			$scope.userActivityLevel = $scope.activityLevels.option5;
		} // if else
	});
	
	// function to update user's name
	$scope.updateDetails = function(){  
		// calculate personal basal metabolic rate / BMR
		// for women
		if($scope.user.gender == "Female"){
			$scope.user.BMR = ((9.6 * $scope.user.weightKG) +
				(1.8 * $scope.user.heightCM) -
				(4.7 * $scope.user.ageInYears) + 655);
		} // if
		
		// for men
		if($scope.user.gender == "Male"){
			$scope.user.BMR = ((13.7 * $scope.user.weightKG) +
				(5 * $scope.user.heightCM) -
				(6.8 * $scope.user.ageInYears) + 66);
		} // if
		
		// calculate daily calorie needs based on 
		// user BMR and activity level
		$scope.user.dailyCals = Math.round($scope.user.BMR * $scope.user.activityLevel);
		
	  	// save users deatails
	  	$localstorage.setObject('user', $scope.user);
	}; // updateDetails()
	
	$scope.goToActivityLevel = function(){
		// save users deatails
	  	$localstorage.setObject('user', $scope.user);
		
  		$state.go('app.activityLevel');
	} // goToActivityLevel()
	
}) // UpdateCtrl

// controller for Activity Level page
.controller('ActivityCtrl', function($scope, $localstorage, $ionicHistory) {
	// variables
	// values for activity levels options
	$scope.activityLevels = {
		option1: "Don't exercise or exercise little.",
		option2: "Light exercise or sports 1 - 3 days a week.",
		option3: "Exercise moderately and/or play sports 3 - 5 days a week.",
		option4: "Strenuous sports or hard exercise 6 - 7 days a week.",
		option5: "Very physically challenging jobs or exercise, eg 2 workouts a day."
	};
	
	// functions to be fired when the view is entered
	$scope.$on("$ionicView.enter", function(){
 
		// load user details
		$scope.user = $localstorage.getObject('user');
	});
	
	// to go back to last view from select activity page
	$scope.goBack = function(){
		// save users deatails
	  	$localstorage.setObject('user', $scope.user);
		
  		$ionicHistory.goBack();
	} // goBack()
   
}) // ActivityCtrl

// controller for settings page
.controller('SettingsCtrl', function($scope, $localstorage, $ionicPopup) {
	// variables
	// values for activity levels options
	$scope.activityLevels = {
		option1: "Don't exercise or exercise little.",
		option2: "Light exercise or sports 1 - 3 days a week.",
		option3: "Exercise moderately and/or play sports 3 - 5 days a week.",
		option4: "Strenuous sports or hard exercise 6 - 7 days a week.",
		option5: "Very physically challenging jobs or exercise, eg 2 workouts a day."
	};
	
	// users text discription for activity level
	$scope.userActivityLevel = "Select An Activity Level";
	
	// functions to be fired when the view is entered
	$scope.$on("$ionicView.enter", function(){
 
		// load user details
		$scope.user = $localstorage.getObject('user');
		
		// map activity level to text discription
		if($scope.user.activityLevel == 1.2){
			$scope.userActivityLevel = $scope.activityLevels.option1;	
		} else if($scope.user.activityLevel == 1.375){
			$scope.userActivityLevel = $scope.activityLevels.option2;
		} else if($scope.user.activityLevel == 1.55){
			$scope.userActivityLevel = $scope.activityLevels.option3;
		}else if($scope.user.activityLevel == 1.725){
			$scope.userActivityLevel = $scope.activityLevels.option4;
		}else if($scope.user.activityLevel == 1.9){
			$scope.userActivityLevel = $scope.activityLevels.option5;
		} // if else
	});
	
	// confirm delete all user info
 	$scope.showConfirm = function() {
   	var confirmPopup = $ionicPopup.confirm({
     		title: 'Delete All User Information',
     		template: 'Are you sure you want to delete all user information?'
   	}); // confirmPopup()
   	confirmPopup.then(function(res) {
     		if(res) { // if yes
				// delete all user information
       		$scope.user = {
					name: "Default User",
					gender: "Default",
					weightKG: 0,
					heightCM: 0,
					ageInYears: 0,
					BMR: 0,
					activityLevel: 0,
					dailyCals: 0,
					calsConsumed: 0	
				};
				$scope.userActivityLevel = "Select An Activity Level";
				// empty foodItems array
				$scope.foodItems = $localstorage.getObject('foodItems');
				$scope.foodItems = [];
				$localstorage.setObject('foodItems', $scope.foodItems);
				// save changes
				$localstorage.setObject('user', $scope.user);
     		} else { // if no
				// dont delete information
     		} // if
   	}); // confirmPopup.then()
 	}; // showConfirm()
   
}); // SettingsCtrl

   	