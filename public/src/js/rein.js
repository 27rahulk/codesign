
var app = angular.module('reinApp', []);
app.controller('reinCtrl', function($scope, $http, $window) {
	$scope.ownerNumberEmail;
	$scope.ownerEmail;
	$scope.currentRole;
	$scope.addEventFlag = false;
	$scope.isOwner = false;
	$scope.isVisitor = false;
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
		var eventObject = {};
		event.name = $scope.eventName;
		event.description = $scope.eventDesc;
		event.date = $scope.eventDate;
		event.address = $scope.eventAddr;
		event.landmark = $scope.eventLandmark;
		event.city = $scope.eventCity;
		event.country = $scope.eventCountry;
		$http.post('/event',event).success(function(data){
			$scope.ownerAddedEvent.push(data);
		});
	};
	
	$scope.loadOwnerEvents = function(){
		var query = !isNaN($scope.ownerNumberEmail)?'?mobile='+$scope.ownerNumberEmail:'?email='+$scope.ownerNumberEmail;
		$http.get('/owner/events'+query).success(function(data){
			$scope.ownerAddedEvent.push(data);
		});
	};
	
	$scope.loadVisitorEvents = function(){
		
	};
	
});