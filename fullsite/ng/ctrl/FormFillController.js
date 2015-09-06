Engi.controller('FormController', function($scope) {
	$scope.thumb  = {
		name:'',
		pic:'',
		link:'',
		description:''
	}

	$scope.mainpage = {
		name:'',
		link:'',
		banner:'',
		subdesc:[{subtitle:'',subdescription:'',subimage:''}],
		list:{title:'',items:['']},
		subimage:[{title:'',link:''}],
	}


	$scope.addMoreLists = function(){
		$scope.mainpage.list.items.push('');
	};
	$scope.DeleteLists = function(number){
		$scope.mainpage.list.items.splice(number,1);
	}

	$scope.addMoreImages = function(){
		$scope.mainpage.subimage.push({title:'',link:''});
	};
	$scope.DeleteImages = function(number){
		$scope.mainpage.subimage.splice(number,1);
	}
	$scope.addMoreDesc = function(){
		$scope.mainpage.subdesc.push({subtitle:'',subdescription:'',subimage:''});
	}
	$scope.DeleteDesc = function(number){
		$scope.mainpage.subdesc.splice(number,1);
	}
})
