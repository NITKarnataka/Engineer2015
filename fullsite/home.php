<?php
	require 'connect_db.php';
	//if(isset($_SESSION['logged'])&&$_SESSION['logged']){
		$query = "SELECT * from `engineer2015` WHERE 1 ORDER BY `rfor` ASC";
		$query_run = mysql_query($query);
		$pre='dummy';
		$arr=array();
		$final = array();
		while($var = mysql_fetch_assoc($query_run)){
			if($var['rfor']!=''){
				if($pre!=$var['rfor']){
					array_push($arr, $var['rfor']);
				}
				array_push($final,$var);
			}
			$pre = $var['rfor'];
		}	
		for($i=0;$i<sizeof($arr);$i++)
			echo $arr[$i];
?>
	<html ng-app="Register">
		<script type="text/javascript" src="plugins/angular/angular.min.js"></script>
		<script type="text/javascript" src="plugins/angular/ng-router.js"></script>
		<body ng-controller="RegisterController">
			<link rel="stylesheet" type="text/css" href="plugins/bootstrap/bootstrap.min.css">
			<table class="table table-striped">
			</table>
		</body>
		<script type="text/javascript">
			 Register = angular.module('Register', []);
			 Register.controller('RegisterController', function($scope, $location,$http) {
				var events = <?php echo json_encode($arr); ?>;
				var details = <?php echo json_encode($final); ?>;
				console.log(events);
				console.log(details);
			 });
		</script>
	</html>
<?php
	// }else{
	// 	header("Location: clogin.php")
	// }
?>