Engi.controller('FormController', function($scope,$http) {
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
		list:[{title:'',items:['']}],
		subimage:[{title:'',link:''}],
	}

	$scope.members = [{
		name:'',
		email:'',
		pic:'',
		post:'',
		comittee:'',
		classie:''
	}];


	/*for the edit thingy*/
	$scope.addMoreDescEdit = function(number){
		console.log(number)
		$scope.edits[number].subdesc.push({subtitle:'',subdescription:'',subimage:''});
	}

	$scope.DeleteDescEdit = function(number,number2){
		console.log(number+" "+number2)
		$scope.edits[number].subdesc.splice(number2,1);
	}

	$scope.addMoreListItemsEdit = function(number,number2){
		console.log(number+" "+number2)
		$scope.edits[number].list[number2].items.push('');
	}

	$scope.DeleteListItemsEdit = function(number,number2,number3){
		console.log(number+" "+number2+" "+number3)
		$scope.edits[number].list[number2].items.splice(number3,1);
	}

	$scope.addMoreListsEdit = function(number){
		console.log(number)
		$scope.edits[number].list.push({title:'',items:['']});
	};
	$scope.DeleteListsEdit = function(number,number2){
		console.log(number+" "+number2)
		$scope.edits[number].list.splice(number2,1);
	}
	$scope.addMoreImagesEdit = function(number){
		console.log(number)
		$scope.edits[number].subimage.push({title:'',link:''});
	};
	$scope.DeleteImagesEdit = function(number,number2){
		console.log(number+" "+number2)
		$scope.edits[number].subimage.splice(number2,1);
	}

	/*for general*/

	$scope.addMoreLists = function(){
		$scope.mainpage.list.push({title:'',items:['']});
	};
	$scope.DeleteLists = function(number){
		$scope.mainpage.list.splice(number,1);
	}

	$scope.addMoreListItems = function(number){
		$scope.mainpage.list[number].items.push('');
	};

	$scope.DeleteListItems = function(number,number2){
		$scope.mainpage.list[number].items.splice(number2,1);
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

	/*for members*/

	$scope.addMoreMembers = function(){
		$scope.members.push({name:'',email:'',pic:'',post:'',comittee:'',classie:''});
	}

	$scope.deleteMembers = function(number){
		$scope.members.splice(number,1);
	}


	$scope.showEdit = false;
	$scope.edits=[]
	$scope.makeEditable = function(name){
		if($scope.edits.length)$scope.edits = [];
		$scope.showEdit=!$scope.showEdit;
		$http.get('./json/'+name+'.master.json').then(function(msg){
			$scope.edits = msg.data
			for(var i=0;i<$scope.edits.length;i++){
				delete $scope.edits[i].list;
				$scope.edits[i].list=[{title:'',items:['']}];
			}
			console.log($scope.edits)
		});
	}
})
