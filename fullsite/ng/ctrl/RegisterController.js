Engi.controller('RegisterController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
	$scope.CAForm = false,
	$scope.RegisterForm = false;
	$scope.form = {
		name:'',
		number:'',
		email:'',
		friends:[]
	}
	$scope.year=["1st Year","2nd Year","3rd year","4th year","Other"]
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
		$scope.success=false;
		$scope.error = false;
		if($scope.ca.name!=''&&$scope.ca.number!=''&&$scope.ca.email!=''&&$scope.ca.college!=''&&$scope.ca.location!=''&&$scope.ca.year!=''&&$scope.ca.stream!='')
			$scope.submitCA();
		else
			$scope.error = true;
	}

	$scope.submitCA = function(){
		console.log(caform.email)
		$timeout(function(){$scope.success = true;},1000);
		$scope.error = false;
		$http.post('mailer.php',{"name": $scope.ca.name,"number": $scope.ca.number,"email": $scope.ca.email,"college": $scope.ca.college,"year":$scope.ca.year,"location":$scope.ca.location,"stream":$scope.ca.stream,"held":$scope.ca.held,"desc":$scope.ca.desc,"flink":$scope.ca.flink,"tlink":$scope.ca.tlink})
		.success( function(data) {
			console.log(data)
		});
	}

	$scope.submitForm = function(){
		
	}
	console.log($scope.ca.email)

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