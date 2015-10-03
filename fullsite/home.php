<?php
	require 'connect_db.php';
	//if(isset($_SESSION['logged'])&&$_SESSION['logged']){
		$query = "SELECT * from `engineer2015` WHERE 1 ORDER BY `rfor` ASC";
		$query_run = mysql_query($query);
		$pre='dummy';
		$arr=array();
		$count = array();
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
		for($i=0;$i<sizeof($arr);$i++){
			$query2 = 'SELECT `id` from `engineer2015` WHERE `rfor`= "'.$arr[$i].'" ';
			$query_run2 = mysql_query($query2);
			array_push($count,mysql_num_rows($query_run2));
		}
?>
	<html ng-app="Register">
		<script type="text/javascript" src="plugins/angular/angular.min.js"></script>
		<script type="text/javascript" src="plugins/angular/ng-router.js"></script>
		<body ng-controller="RegisterController">
			<link rel="stylesheet" type="text/css" href="plugins/bootstrap/bootstrap.min.css">
				<table class="table table-striped">
					<tr>
						<th>slno.</th>
						<th>committee</th>
						<th>count</th>
					</tr>
					<tr ng-repeat='event in events'>
						<td>{{$index+1}}</td>
						<td>{{event}}</td>
						<td>{{count[$index]}}</td>
					</tr>
				</table>
				<div ng-show="">
					<table class="table table-striped">
					</table>
				</div>
		</body>
		<script type="text/javascript">
			 Register = angular.module('Register', []);
			 Register.controller('RegisterController', function($scope, $location,$http) {
				$scope.events = <?php echo json_encode($arr); ?>;
				$scope.details = <?php echo json_encode($final); ?>;
				$scope.count = <?php echo json_encode($count); ?>;
				console.log($scope.events);
				console.log($scope.details);
			 });
		</script>
	</html>
<?php
	// }else{
	// 	header("Location: clogin.php")
	// }
?>