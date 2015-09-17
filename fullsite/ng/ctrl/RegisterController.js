Engi.controller('RegisterController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
	$scope.CAForm = false,
	$scope.RegisterForm = false;
	$scope.form = {
		name:'',
		number:'',
		email:'',
		college:'',
		location:'',
		branch:'',
		friends:[]
	}
	$scope.year=["1st Year","2nd Year","3rd year","4th year","Other"]
	$scope.addFriends = function(){
		$scope.form.friends.push({name:'',number:'',email:'',college:'',location:'',branch:''});
	};

	$scope.removeFriends = function(number){
		$scope.form.friends.splice(number,1);
	}

	$scope.success = -1;
	$scope.rsuccess = -1;

	$scope.ca = {
		name:'',
		number:'',
		email:'',
		college:'',
		location:'',
		year:$scope.year[3],
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

	$scope.validateAndSubmit = function(){
		if($scope.ca.name!=''&&!($('#email').hasClass('ng-invalid-email'))&&$scope.ca.number!=''&&$scope.ca.email!=''&&$scope.ca.college!=''&&$scope.ca.location!=''&&$scope.ca.year!=''&&$scope.ca.stream!=''){
			$scope.success = 1;
			$scope.submitCA();
			console.log($('#email').hasClass('ng-invalid-email'));
			console.log($scope.success);
		}else{
			$scope.error = true;
		}
	}

	$scope.submitCA = function(){
		console.log($scope.ca)
		$scope.error = false;
		$http.post('mailer.php',{"name": $scope.ca.name,"number": $scope.ca.number,"email": $scope.ca.email,"college": $scope.ca.college,"year":$scope.ca.year,"location":$scope.ca.location,"stream":$scope.ca.stream,"held":$scope.ca.held,"desc":$scope.ca.desc,"flink":$scope.ca.flink,"tlink":$scope.ca.tlink,"rfor":"CA"})
		.success( function(data) {
			if(data.success!=''){
				if(data.success==true)
					$scope.success = 2;
				else
					$scope.success = 3;
			}
		});
	}

	$scope.validateAndSubmitRegister = function(){
		var count = 0;
		if($scope.form.name!=''&&!($('#email').hasClass('ng-invalid-email'))&&$scope.form.number!=''&&$scope.form.email!=''&&$scope.form.college!=''&&$scope.form.location!=''){
			for(var i=0;i<$scope.form.friends.length;i++){
				if($scope.form.friends[i].name!=''&&!($('#email'+i).hasClass('ng-invalid-email'))&&$scope.form.friends[i].number!=''&&$scope.form.friends[i].email!=''&&$scope.form.friends[i].college!=''&&$scope.form.friends[i].location!='')
					count++;
			}
			if(count==$scope.form.friends.length){
				console.log(count)
				$scope.submitForm();
			}else{
				$scope.registerError = 1;
			}
		}else{
			$scope.registerError = 1;
			console.log("error");
		}
	}	

	$scope.registerError = 0;
	$scope.submitForm = function(){
		$http.post('register.php',{"name": $scope.form.name,"number": $scope.form.number,"email": $scope.form.email,"college": $scope.form.college,"friends":$scope.form.friends,"location":$scope.form.location,"branch":$scope.form.branch,"rfor":$routeParams.id})
		.success( function(data) {
			console.log(data)
			if(data.success!=''){
				if(data.success==true)
					$scope.rsuccess = 2;
				else
					$scope.rsuccess = 3;
			}
		});
	}

})

Engi.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return {
    link: function(scope, elm) {
      elm.on("keyup",function(){
            var isMatchRegex = EMAIL_REGEXP.test(elm.val());
            if( isMatchRegex&& elm.hasClass('warning') || elm.val() == ''){
              elm.removeClass('warning');
            }else if(isMatchRegex == false && !elm.hasClass('warning')){
              elm.addClass('warning');
            }
      });
    }
  }
});