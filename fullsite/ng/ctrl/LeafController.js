Engi.controller('LeafController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
	$scope.misc.wasLeaf = true;

	$timeout(function() {
		$("body").removeClass("avgrund-active");
		console.log('doing3')
	}, 100);


	$scope.init = function(){
		if($routeParams.id)
			currentPage = '/'+$routeParams.id;
		$http.get('./json/'+currentPage.substr(1)+'.json').then(function(msg){
			$scope.obj = msg.data;
		})
	}
	$scope.init();

	$scope.closeLeaf = function(){
		$scope.misc.showLeaf=false;
		$rootScope.back();
	}
});