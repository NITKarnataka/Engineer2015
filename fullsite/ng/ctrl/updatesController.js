Engi.controller('UpdatesController', function($http,$rootScope,$scope, $timeout, $location,$routeParams) {
  $scope.misc.leafCheck= 0;
  $scope.misc.showModal = true;
  $scope.cat = $routeParams.cat;
  $scope.misc.prevPage = $location.$$path;

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
    $scope.misc.prevPage="/";
    $('#scene').css("margin-left","0");
    $('#scene').css("margin-right","0");
    $timeout(function() {
      $location.path('/');
      $('.scene').removeClass('pusher')
    }, 500);
  };

  $scope.thisName = $location.$$path;
  if($scope.thisName == '/now'){
    $scope.titlePage =  'Current Events'
  }
  if($scope.thisName == '/upcoming'){
    $scope.titlePage =  'Upcoming Events'
  }

  var init = function(){
    if($scope.thisName == '/upcoming')
      var type = 'upcoming';
    if($scope.thisName == '/current')
      var type = 'current';
    $http.post('getupdates.php',{"type":type})
      .success(function(data){
        console.log(data)
      });
  }

  init();

  $scope.obj=[];


})