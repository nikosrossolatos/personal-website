(function(){
	var app = angular.module('mySite',['ngRoute','angularMoment'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/',{
			templateUrl:'/js/templates/index.html',
			controller: 'MainController'
		})
		.when('/messages', {
			templateUrl: '/js/templates/messages.html',
			controller: 'MessagesController',
			controllerAs:'msg'
		})
		.when('/settings',{
			templateUrl: 'js/templates/settings.html',
			controller:'SettingsController'
		})
		.otherwise({redirectTo:'/'})
	}])

	.controller('MainController',function($scope,$location){
		$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.logout = function(){
    	alert("logout");
    }
	})
	.controller('SettingsController',function(){
		//do something
	})
	.controller('MessagesController',['$scope','$http',function($scope,$http){
		$http.get('/api/conversations').success(function(data){
			$scope.conversations = data;
		});

		$scope.loadChat = function(persona_id){
			$http.get('/api/personas/'+persona_id+'/chat').success(function(data){
				$scope.messages = data;
			});
		};
		$scope.skata = 'ante gamisou'
		$scope.messages = [{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		},
		{
			content:'Hello there i would like to speak to your master',
			date_sent :Date.now(),
			admin:true
		}]
	}]);
})();