<?php
	require 'connect_db.php';
	if(isset($_SESSION['logged'])&&$_SESSION['logged']){
		$query = "SELECT * from `engineer2015` WHERE 1 ORDER BY `rfor` ASC";
		$query_run = mysql_query($query);
		$pre='dummy';
		$arr=array();
		while($var = mysql_fetch_assoc($query_run)){
			if($pre!=$var['rfor']){
				if($var['rfor']!=''){
					array_push($arr, $var['rfor']);
				}
			}
			$pre = $var['rfor'];
		}	
		for($i=0;$i<sizeof($arr);$i++)
			echo $arr[$i];
?>
	<script type="text/javascript" src="plugins/angular/angular.min.js"></script>
	<script type="text/javascript" src="plugins/angular/ng-router.js"></script>
	<body ng-app="Register" ng-controller="RegisterController">
		<link rel="stylesheet" type="text/css" href="plugins/bootstrap/bootstrap.min.css">
		<table class="table table-striped">
		</table>
	</body>
	<script>
		Register = angular.module('Register');
		Register.controller('RegisterController', function($scope, $location,$http) {
			$scope.events = <?php echo json_encode($arr) ?>;
			$scope.details = <?php echo json_encode(mysql_fetch_array($query_run)); ?>
			console.log($scope.events);
			console.log($scope.details);
		});
	</script>

<?php
	}else{
		header("Location: clogin.php")
	}
?>