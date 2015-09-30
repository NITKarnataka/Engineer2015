Engi.controller('LeafController', function($http,$rootScope,$scope, $timeout, $location,$routeParams,$sce) {
	$scope.misc.leafCheck++;
	$scope.misc.wasLeaf = true;
	if(!$scope.misc.showModal)
		$('.scene').addClass('pusher')

	$scope.init = function(){
		var name;
		$scope.show = 'final-event';
		var back = $routeParams.id;
		if($location.$$path=='/CA'||$location.$$path=='/sponsors'||$location.$$path=='/contactTeam'||$location.$$path=='/about'||$location.$$path=='/engiconnect'||$location.$$path=='/hospi'){
			name = $location.$$path.substring(1);
			if($location.$$path=='/sponsors'||$location.$$path=='/about'||$location.$$path=='/hospi'||$location.$$path=='/contactTeam'){
				$scope.show = $location.$$path.substring(1);
			}
			if($location.$$path=='/CA'){
				$scope.showCAForm = true;
			}
		}
		else{
			name = $location.$$path.substring(1,$location.$$path.length-back.length-1);
			if(name!='technites')
				$scope.showRegisterForm = true;
		}
		if(name!='about')
		$http.get('./json/'+name+'.master.json').then(function(msg){
			if(msg.data.length){
				for(i=0;i<msg.data.length;i++){
					if($routeParams.id!=undefined){
						if(msg.data[i].link==$routeParams.id)
							$scope.page = msg.data[i];
					}
					else{
						if($location.$$path=='/CA'||$location.$$path=='/engiconnect'||$location.$$path=='/hospi'){
							$scope.page = msg.data[0];
							break;
						}
					}
				}
				console.log($scope.page)
				$scope.showThis = 'desc';
				$scope.showSubtitle=$scope.page.subdesc[0].subtitle;
			}
		});
		
		//$scope.page = {"name":"robo wars","link":"robowars","banner":"robowars.jpg","subdesc":[{"subtitle":"overview","subdescription":"robots fight its cool","subimage":"pic1.jpg"},{"subtitle":"time","subdescription":"12-08-12","subimage":""}],"list":[{"title":"bot","items":["ightw","power","size"]},{"title":"arena","items":["should not break","should fit"]}],"subimage":[{"title":"pic3.jpg","link":"pic4.jpg"}]}
	}

	$scope.init();

	$scope.showTab = function(name,name2){
		if(name!='gallery'){
			if(name2=='desc'){
				$scope.showThis='desc';
				$scope.showSubtitle=name;
			}else{
				$scope.showThis='rules';
				$scope.showSubtitle=name;
			}
		}else{
		$scope.showThis = name;
		}
	}

	$scope.closeLeaf = function(){
		$('.scene').removeClass('pusher')
		$scope.misc.leafCheck=0;
		$('#scene').css("margin-left","0");
		$('#scene').css("margin-right","0");

		$('#animatedModal').removeClass('zoomIn').addClass('zoomOut')
		setTimeout(500);
		$location.path($scope.misc.prevPage);
	}

	$scope.closeHome = function(){
		$('.scene').removeClass('pusher')
		$scope.misc.leafCheck=0;
		$('#scene').css("margin-left","0");
		$('#scene').css("margin-right","0");

		$('#animatedModal').removeClass('zoomIn').addClass('zoomOut')
		setTimeout(500);
		$location.path('/');
	}

	$scope.deliberatelyTrustDangerousSnippet = function(html) {
          return $sce.trustAsHtml(html);
        };

    $scope.dontInclude = function(name){
    	var blacklist = ['simplicity','antariksh','orbiter','civilblueprint','stockoholic'];
    	for(var i = 0 ; i<blacklist.length;i++){
    		if(name==blacklist[i])
    			return 1;
    	}
    	return 0;
    }

    $scope.seperateRegistration = function(name){
    	var sep = ['stockoholic','civilblueprint','simplicity'];
    	for(var i = 0 ; i<sep.length;i++){
    		if(name==sep[i])
    			return 1;
    	}
    	return 0;
    }

});