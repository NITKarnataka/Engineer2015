Engi.controller('RegisterController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
	$scope.CAForm = false,
	$scope.RegisterForm = false;
	$scope.form = {
		name:'',
		number:'',
		email:'',
		friends:[]
	}
	$scope.addFriends = function(){
		$scope.form.friends.push({name:'',number:'',email:''});
	};

	$scope.removeFriends = function(number){
		$scope.form.friends.splice(number,1);
	}

	$scope.ca = {
		name:'',
		number:'',
		email:'',
		college:'',
		location:'',
		year:4,
		stream:'',
		held:false,
		desc:'',
		flink:'',
		tlink:''
	}

	$scope.toggleCAForm = function(){
		if(!$scope.CAForm)
			$scope.CAForm = true;
		else 
			$scope.CAForm = false;
	}

	$scope.toggleRegisterForm = function(){
		if(!$scope.RegisterForm)
			$scope.RegisterForm = true;
		else 
			$scope.RegisterForm = false;
	}
	$scope.submitCA = function(){
		$scope.success = false;
		$scope.error = false;
		$http.post('mailer.php',{"name": $scope.ca.name,"number": $scope.ca.number,"email": $scope.ca.email,"college": $scope.ca.college,"year":$scope.ca.year,"location":$scope.ca.location,"stream":$scope.ca.stream,"held":$scope.ca.held,"desc":$scope.ca.desc,"flink":$scope.ca.flink,"tlink":$scope.ca.tlink})
		.success( function(data) {
			if ( data.success ) {
				$scope.success = true;
			} else {
				$scope.error = true;
			}
		});
	}

	$scope.submitForm = function(){
		
	}

})