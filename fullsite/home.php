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
				<h2>Total registrations : {{details.length}}</div>
				<div class="row">
					<div class="col-md-6 col-xs-12">
						<h3>See committee wise</h3>
						<button ng-click="toggleCommittee();" class="btn {{committee?'btn-danger':'btn-primary'}}">{{committee?'Hide':'Show'}}</button>
					</div>
					</div>
					<div class="col-md-6 col-xs-12">
						<h3>Event/workshop wise(details)</h3>
						<select ng-model='selected' ng-options="event for event in events" ng-init="selected=events[0]">
						</select>
						<button ng-click="toggleEvent();" class="btn {{wise?'btn-danger':'btn-primary'}}">{{wise?'Hide':'Show'}}</button>
					</div>
				</div>
				<div ng-show="committee">
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
				</div>
				<div ng-show="wise">
					<h4>Registrants for : <b>{{selected}}</b></h4>
					<table class="table table-striped">
						<tr>
							<th>Name</th>
							<th>College</th>
							<th>Branch</th>
							<th>email</th>
							<th>number</th>
							<th>location</th>
							<th>Time Registered</th>
							<th>Year</th>
						</tr>
						<tr ng-repeat="participant in participants">
							<td>{{participant.name}}</td>
							<td>{{participant.college}}</td>
							<td>{{participant.branch}}</td>
							<td>{{participant.email}}</td>
							<td>{{participant.mobile}}</td>
							<td>{{participant.location}}</td>
							<td>{{participant.time}}</td>
							<td>{{participant.year}}</td>
						</tr>
					</table>
				</div>
		</body>
		<script type="text/javascript">
			 Register = angular.module('Register', []);
			 Register.controller('RegisterController', function($scope, $location,$http) {
				$scope.events = <?php echo json_encode($arr); ?>;
				$scope.details = <?php echo json_encode($final); ?>;
				$scope.count = <?php echo json_encode($count); ?>;
				$scope.committee = false;
				$scope.wise = false;
				$scope.toggleCommittee = function(){
					$scope.committee = !(angular.copy($scope.committee));
				}
				$scope.toggleEvent = function(){
					$scope.wise = !(angular.copy($scope.wise));
				}
				$scope.participants = [];
				for(var i=0;i<$scope.details.length;i++){
					if($scope.details[i].rfor==$scope.events[0]){
						$scope.participants.push($scope.details[i]);
					}
				}
				$scope.$watch('selected',function(n,o){
					if(n!=o){
						$scope.participants=[];
						for(var i=0;i<$scope.details.length;i++){
							if($scope.details[i].rfor==$scope.selected){
								$scope.participants.push($scope.details[i]);
							}
						}
					}
				})
			 });
		</script>
	</html>
<?php
	// }else{
	// 	header("Location: clogin.php")
	// }
?>