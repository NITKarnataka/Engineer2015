var Engi;

(function() {
	Engi = angular.module('Engi', ['ngRoute','ngAnimate']);
})();

(function() {

	Engi.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {

		$routeProvider.when('/events', {
			templateUrl: './views/modals.html',
		}).when('/events/:cat', {
			templateUrl: './views/modals.html'
		}).when('/events/:cat/:id', {
			templateUrl: './views/modals.html'
		}).when('/workshops', {
			templateUrl: './views/modals.html'
		}).when('/workshops/:id', {
			templateUrl: './views/modals.html'
		}).when('/techspeaks', {
			templateUrl: './views/modals.html'
		}).when('/techspeaks/:id', {
			templateUrl: './views/modals.html'
		}).when('/technites', {
			templateUrl: './views/modals.html'
		}).when('/technites/:id', {
			templateUrl: './views/modals.html'
		}).when('/mainshow', {
			templateUrl: './views/modals.html'
		}).when('/mainshow/:id', {
			templateUrl: './views/modals.html'
		}).when('/fillform', {
			templateUrl: './views/form.html'
		});

	}]);
})();

(function() {
	Engi.run(function ($rootScope, $location) {

		var history = [];

		$rootScope.$on('$routeChangeSuccess', function() {
			history.push($location.$$path);
		});

		$rootScope.back = function () {
			$rootScope.prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			$location.path($rootScope.prevUrl);
		};

	});
})();

(function() {

	Engi.controller('MainController', function($scope, $location,$timeout) {
		$scope.misc = {
			showModal:false,
			showLeaf:false,
			wasLeaf:false,
			parent:'',
		}
		$scope.showModal = function(redirect){
			$scope.misc.parent= redirect;
			$timeout(function() {
				$("body").addClass("avgrund-active");
			}, 100);
			$location.path('/'+redirect);
		}


	})
})();