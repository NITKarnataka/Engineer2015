<?php
	session_start();
	require 'connect_db.php';
	$logged=$_SESSION['logged'];
	if(empty($logged)&&!($logged>=1)){
		header("Location: clogin.php");
	}
	if($logged!=5){
		header("Location: home.php");
	}
	$query  = "SELECT * FROM `Sheet1` WHERE 1";
	$query_run = mysql_query($query);
	$res = array();
	while($var = mysql_fetch_assoc($query_run)){
		array_push($res, $var);
	}

?>
<html ng-app="Update">
<head>
	<script type="text/javascript" src="plugins/angular/angular.min.js"></script>
	<script type="text/javascript" src="plugins/angular/ng-router.js"></script>
	<link rel="stylesheet" type="text/css" href="plugins/bootstrap/bootstrap.min.css">
	<style>
		html,body{
			font-size: 14px;
		}
	</style>
</head>
<body ng-controller="UpdateController">
	<table class="table table-striped">
		<tr>
			<th>slno.</th>
			<th>Date</th>
			<th>Day</th>
			<th>Event Time</th>
			<th>Event Name</th>
			<th>Event Committee</th>
			<th>Location</th>
			<th>New location</th>
			<th>New Time</th>
			<th>News</th>
			<th>Toggle Live</th>
			<th>Toggle Upcoming</th>
		</tr>
		<tr ng-repeat="event in events | orderBy: date ">
			<td>{{:: $index+1}}</td>
			<td>{{:: event.date}}</td>
			<td>{{:: event.day}}</td>
			<td>{{:: event.time}}</td>
			<td>{{:: event.committee}}</td>
			<td>{{:: event.location}}
			<td>{{:: event.nlocation}}</td>
			<td>{{:: event.ntime}}</td>
			<td>{{:: event.news}}</td>
			<td></td>
			<td></td>
		</tr>
	</table>
</body>
<script type="text/javascript">
	Update = angular.module('Update', []);
	Update.controller('UpdateController', function($scope, $location,$http) {
		$scope.events = <?php echo json_encode($res); ?>;
		for(var i =0 ;i <$scope.events.length ;i++){
			$scope.events[i].date = parseInt(angular.copy($scope.events[i].date));
		}
	});
</script>
</html>