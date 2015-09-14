Engi.controller('EventsController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
	$scope.misc.leafCheck= 0;
	$scope.misc.showModal = true;
	$scope.cat = $routeParams.cat;

	var currentPage;

	if($scope.misc.showModal&&(!($scope.misc.wasLeaf))){
		$timeout(function() {
				$("body").addClass("avgrund-active");
		}, 100);
		$timeout(function() {
				$(".avgrund-close").css("opacity","1");
		}, 500);
	}
	if($scope.misc.showModal&&$scope.misc.wasLeaf&&!($routeParams.id)){
		$("body").addClass("avgrund-active");
		$(".avgrund-close").css("opacity","1");
		$scope.misc.wasLeaf = false;
	}

	$scope.turnOffModal = function(){
		$scope.misc.showModal = false;
		$timeout(function() {
				$("body").removeClass("avgrund-active");
				$(".avgrund-close").css("opacity","0");
			}, 100);

		$timeout(function() {
			$location.path('/');
		}, 500);
	};

	$scope.init = function(){
		if(!$routeParams.id){
			currentPage= $scope.cat ? '/'+$scope.cat : $location.path();
			$http.get('./json/'+currentPage.substr(1)+'.json').then(function(msg){
				$scope.obj = msg.data;
			})
		}
	}

	$scope.nextPage = function(page){
		var url=$location.path()+'/'
		$location.path(url+page);
	}

	$scope.init();

	$scope.changeBack = function(){
		$location.path($rootScope.prevUrl)
	}

})
