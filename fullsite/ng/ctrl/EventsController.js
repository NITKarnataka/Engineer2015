Engi.controller('EventsController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
	$scope.misc.leafCheck= 0;
	$scope.misc.showModal = true;
	$scope.cat = $routeParams.cat;

	$('.scene').addClass('pusher')
	
	$('#dd').scroll(function(){
		if($(this).scrollTop()!=0){
			$('.top-5f').addClass('fixedbar');
		}else{
			$('.top-5f').removeClass('fixedbar');
		}
	})

	var currentPage;

	if($scope.misc.showModal&&(!($scope.misc.wasLeaf))){

	}
	if($scope.misc.showModal&&$scope.misc.wasLeaf&&!($routeParams.id)){
		$scope.misc.wasLeaf = false;
	}

	$scope.turnOffModal = function(){
		$scope.misc.showModal = false;
		$timeout(function() {
			$location.path('/');
			$('.scene').removeClass('pusher')
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
		$location.path('/events')
	}

})
