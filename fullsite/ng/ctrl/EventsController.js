Engi.controller('EventsController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
	$scope.misc.showModal = true;
	$scope.cat = $routeParams.cat;
	var currentPage;

	if($routeParams.id){
		$scope.misc.showLeaf = true;
	}else{
		$scope.misc.showLeaf = false;
	}

	if($scope.misc.showModal&&(!($scope.misc.wasLeaf))&&!$scope.misc.showLeaf){
		$timeout(function() {
				$("body").addClass("avgrund-active");
		}, 100);
		console.log('doing2')
		console.log($scope.misc.showModal+' showModal')
		console.log($scope.misc.wasLeaf+' wasLeaf')
	}

	if($scope.misc.showModal&&$scope.misc.wasLeaf){
		$("body").addClass("avgrund-active");
		$scope.misc.wasLeaf = false;
	}

	$scope.turnOffModal = function(){
		$scope.misc.showModal = false;
		$timeout(function() {
				$("body").removeClass("avgrund-active");
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
	$scope.init();

	$scope.changeBack = function(){
		$location.path($rootScope.prevUrl)
	}

})
