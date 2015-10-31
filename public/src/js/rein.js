
var app = angular.module('reinApp', []);
app.controller('reinCtrl', function($scope, $http, $window) {
	$scope.ownerNumberEmail;
	$scope.ownerEmail;
	$scope.message;
	$scope.currentRole;
	$scope.addEventFlag = false;
	$scope.isOwner = false;
	$scope.isVisitor = false;
	$scope.ownerEventsLoaded = false;
	$scope.ownerLoadedEvents = [];
	$scope.visitorLoadedEvents = [];
	$scope.eventDate;
	$scope.eventName;
	$scope.eventDesc;
	$scope.eventAddr;
	$scope.eventCity;
	$scope.eventCountry;
	$scope.eventLandmark;
	$scope.ownerAddedEvent = [];
	$scope.previousLoadedNumber;
	$scope.resetAddEvent = function(){
		$scope.eventDate = null;
		$scope.eventName = null;
		$scope.eventDesc = null;
		$scope.eventAddr = null;
		$scope.eventCity = null;
		$scope.eventCountry = null;
		$scope.eventLandmark = null;
	}
	$scope.turnOwner = function(){
		$scope.currentRole = "O";
		$scope.isVisitor =false;
		$scope.isOwner =true;
	};
	$scope.turnVisitor = function(){
		$scope.currentRole = "V";
		$scope.isVisitor =true;
		$scope.isOwner =false;
	};
	$scope.addEvent = function(){
		$scope.addEventFlag = !$scope.addEventFlag;
	}
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
	
	$scope.messages = [];
	$scope.uploadEvent = function(){
		if($scope.ownerNumberEmail === 'undefined'){
			alert('provide number or email');
		}
		var eventObject = {};
		if(!isNaN($scope.ownerNumberEmail)){
			eventObject.organizerNumber = parseInt($scope.ownerNumberEmail,10);
		}else{
			eventObject.organizerMail = $scope.ownerNumberEmail;
		}
		console.log(eventObject);
		eventObject.name = $scope.eventName;
		eventObject.description = $scope.eventDesc;
//		event.date = $scope.eventDate;
		eventObject.fullAddress = $scope.eventAddr;
		console.log(eventObject);
		eventObject.landmark = $scope.eventLandmark;
		eventObject.City = $scope.eventCity;
		eventObject.country = $scope.eventCountry;
		console.log(eventObject);
		$http.post('/event',eventObject).success(function(data){
			console.log('hello');
			$scope.ownerAddedEvent.push(data);
			$scope.resetAddEvent();
			$scope.addEvent();
		});
	};
	
	$scope.loadOwnerEvents = function(){
		if($scope.previousLoadedNumber !== $scope.ownerNumberEmail){
			$scope.ownerAddedEvent = [];
			$scope.ownerEventsLoaded = false;
		}
		if(typeof $scope.ownerNumberEmail === 'undefined' || $scope.ownerNumberEmail === '' || $scope.ownerEventsLoaded){
			return;
		}
		var query = !isNaN($scope.ownerNumberEmail)?'?mobile='+$scope.ownerNumberEmail:'?email='+$scope.ownerNumberEmail;
		$http.get('/owner/events'+query).success(function(data){
			$scope.ownerAddedEvent = $scope.ownerAddedEvent.concat(data);
			$scope.ownerEventsLoaded = true;
			$scope.previousLoadedNumber = $scope.ownerNumberEmail;
		});
	};
	
	$scope.searchQuery;
	$scope.searchCity;
	$scope.visitorLoadedEvent = [];
	$scope.searchEvents = function(){
		$scope.visitorLoadedEvent = [];
		var search = {};
		search.city = $scope.searchCity;
		$scope.searchQuery = (typeof $scope.searchQuery === 'undefined')?"":$scope.searchQuery;
		search.query = $scope.searchQuery;
		$http.post('/search/events',search).success(function(data){
			console.log('hello');
			$scope.visitorLoadedEvent = $scope.visitorLoadedEvent.concat(data);;
		});
	};
	
});