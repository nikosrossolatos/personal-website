(function(){

	window.surge = new Surge();
	surge.subscribe('dashboard');
	var app = angular.module('mySite',['ngRoute','angularMoment','luegg.directives'])
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

		surge.on('update conversation',function(data){
			$scope.$apply(function() {
				var index = $scope.conversations.findIndexBy('_id',data._id);
				var conversation = $scope.conversations[index];
				if(conversation){
					$scope.conversations[index].last_active = data.last_active;
					$scope.conversations[index].messages = data.messages;
					if($scope.chat._id===data._id){
						$scope.chat = conversation;
					}
				}
				else{
					//manipulate object to have persona_id._id
					var persona_id = data.persona_id;
					data.persona_id ={
						_id:persona_id
					}
					$scope.conversations.push(data);
				}
			});
		});
		surge.on('update name',function(data){
			$scope.$apply(function(){
				var index = $scope.conversations.findPersonaBy('_id',data.persona);
				if(index>=0){
					$scope.conversations[index].persona_id.name = data.name;
				}
			});
		});

		$http.get('/api/conversations').success(function(data){
			$scope.conversations = data;
		});

		$scope.loadChat = function(persona_id){

			//findByPersona_id
			var index = $scope.conversations.findPersonaBy('_id',persona_id);
			$scope.chat = $scope.conversations[index];
			// $http.get('/api/personas/'+persona_id+'/chat').success(function(data){
			// 	$scope.chat = data;
			// });
		};
		$scope.chat = {};
	}]);
})();