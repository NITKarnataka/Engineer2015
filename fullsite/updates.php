<?php
	session_start();
	require 'connect_db.php';
	$logged=$_SESSION['logged'];
	$un =  $_SESSION['un'];
	$pwd = $_SESSION['pwd'];
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
		<tr ng-repeat="event in events | orderBy: 'date' ">
			<td>{{:: $index+1}}</td>
			<td>{{:: event.date}}</td>
			<td>{{:: event.day}}</td>
			<td>{{:: event.time}}</td>
			<td>{{:: event.event}}</td>
			<td>{{:: event.committee}}</td>
			<td>{{:: event.location}}</td>
			<td>
				<div class="col-md-12">
					<input type="text" ng-model="event.nlocation" class="form-control form-group" placeholder = 'New Locaiton'/>
				</div>
			</td>
			<td>
				<div class="col-md-12">
					<input type="text" ng-model="event.ntime" class="form-control form-group" placeholder = 'New Time'/>
				</div>
			</td>
			<td>
				<div class="col-md-12">
					<input type="text" ng-model="event.news" class="form-control form-group" placeholder = 'New News'/>
				</div>
			</td>
			<td>
				<div class="col-md-12">
					<button ng-click="toggleLive(event,event.id)" class="btn {{event.current=='0'?'btn-primary':'btn-success'}}">
						{{event.current=='0'?'Make Live':'Remove Live'}}
					</button>
				</div>
			</td>
			<td>
				<div class="col-md-12">
					<button ng-click="toggleUpcoming(event,event.id)" class="btn {{event.upcoming=='0'?'btn-primary':'btn-success'}}">
						{{event.upcoming=='0'?'Make UpComing':'Remove Upcoming'}}
					</button>
				</div>
			</td>
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
		$scope.toggleLive = function(obj,id){
			if(parseInt(obj.current)==0)
				obj.current = 1;
			else
				obj.current = 0;
			<?php echo "var uname = '".$un."'"; ?>;
			<?php echo "var pwd = '".$pwd."'"; ?>;
		 	$http.post('updateevent.php',{"id":id ,"uname":uname,"pwd":pwd,"current":obj.current,"upcoming":obj.upcoming,"news":obj.news,"ntime":obj.ntime,"nlocation":obj.nlocation})
		 		.success(function(data) {
					if(data.success!=''){
						if(data.success==true)
							alert('changed!');
						else
							alert('some error occured try again..');
					}
				});
		}
		$scope.toggleUpcoming = function(obj,id){
			if(parseInt(obj.upcoming)==0)
				obj.upcoming = 1;
			else
				obj.upcoming = 0;

			<?php echo "var uname = '".$un."'"; ?>;
	    	<?php echo "var pwd = '".$pwd."'"; ?>;
			$http.post('updateevent.php',{"id":id ,"uname":uname,"pwd":pwd,"current":obj.current,"upcoming":obj.upcoming,"news":obj.news,"ntime":obj.ntime,"nlocation":obj.nlocation})
		 		.success(function(data) {
					if(data.success!=''){
						if(data.success==true)
							alert('changed!');
						else
							alert('some error occured try again..');
					}
				});
		}
	});
</script>
</html>