<?php
	session_start();
	require 'connect_db.php';
	$logged=$_SESSION['logged'];
	if(empty($logged)&&$logged==false){
		header("Location: clogin.php");
	}
	$query = "SELECT * from `engineer2015` WHERE 1 ORDER BY `rfor` ASC";
	$query4 = "SELECT * 
				FROM  `engineer2015` 
				WHERE LOWER(  `college` ) NOT LIKE  '%nitk%'
				AND LOWER(  `college` ) NOT LIKE  '%surathkal%'
				AND LOWER(  `college` ) NOT LIKE  '%national institute of technology ka%'
				AND LOWER(  `college` ) NOT LIKE  '%gy ka%'
				AND LOWER(  `college` ) NOT LIKE  '%gy,ka%'
				AND LOWER(  `college` ) NOT LIKE  '%gy, ka%'
				AND LOWER(  `college` ) NOT LIKE  '%gy ,ka%'
				AND LOWER(  `college` ) NOT LIKE  '%gy , ka%'
				AND LOWER(  `college` ) NOT LIKE  '%ntik%'
				AND LOWER(  `college` ) NOT LIKE  '%national institute of technology su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy,su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy, su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy ,su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy , su%'
				AND LOWER(  `college` ) NOT LIKE  '%ntik%'";

	$query5 = "SELECT * 
				FROM  `engineer2015` 
				WHERE LOWER(  `college` ) NOT LIKE  '%nitk%'
				AND LOWER(  `college` ) NOT LIKE  '%surathkal%'
				AND LOWER(  `college` ) NOT LIKE  '%national institute of technology ka%'
				AND LOWER(  `college` ) NOT LIKE  '%gy kar%'
				AND LOWER(  `college` ) NOT LIKE  '%gy,kar%'
				AND LOWER(  `college` ) NOT LIKE  '%gy, kar%'
				AND LOWER(  `college` ) NOT LIKE  '%gy ,kar%'
				AND LOWER(  `college` ) NOT LIKE  '%gy , kar%'
				AND LOWER(  `college` ) NOT LIKE  '%ntik%'
				AND LOWER(  `college` ) NOT LIKE  '%national institute of technology su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy,su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy, su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy ,su%'
				AND LOWER(  `college` ) NOT LIKE  '%gy , su%'
				AND LOWER(  `college` ) NOT LIKE  '%ntik%'
				GROUP BY CONCAT(  `name` ,  `mobile` ) ";
	$query_run5 = mysql_query($query5);
	$uniqueOut = mysql_num_rows($query_run5);

	$query_run4 = mysql_query($query4);
	$countOther = mysql_num_rows($query_run4);
	$query_run = mysql_query($query);
	$pre='dummy';
	$arr=array();
	$count = array();
	$final = array();
	$diff = array();
	while($var1 = mysql_fetch_assoc($query_run4)){
		array_push($diff, $var1['id']);
	}
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
		<body ng-controller="RegisterController">
				<div class="row">
					<div class="col-md-11">
						<h2>Total registrations : {{:: details.length}} ,OffCampus : {{:: countOther}} ,unique Offcampus : {{:: countUnique}}</h2>
					</div>
					<div class="col-md-1">
						<a href="logout.php">Logout</a>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6 col-xs-12">
						<h3>See committee wise</h3>
						<button ng-click="toggleCommittee();" class="btn {{committee?'btn-danger':'btn-primary'}} form-group">{{:: committee?'Hide':'Show'}}</button>
					</div>
					<div class="col-md-6 col-xs-12">
						<h3>Event/workshop wise(details)</h3>
						<select ng-model='selected' class="form-control w50-b" ng-options="event.name for event in events" ng-init="selected=events[0].name">
						</select>
						<button ng-click="toggleEvent();" class="btn {{wise?'btn-danger':'btn-primary'}}">{{:: wise?'Hide':'Show'}}</button>
					</div>
				</div>
				<div ng-show="committee">
					<button class="btn {{sorted=='-count'?'btn-info':'btn-warning'}} form-group" ng-click="toggleSort();">Sort By {{:: sorted=='-count'?'Committee Name':'Registrations'}}</button>
					<table class="table table-striped">
						<tr>
							<th>slno.</th>
							<th>committee</th>
							<th>count</th>
							<th>OffCampusCount</th>
						</tr>
						<tr ng-repeat="event in events | orderBy: sorted ">
							<td>{{:: $index+1}}</td>
							<td>{{:: event.name}}</td>
							<td>{{:: event.count}}</td>
							<td>{{:: event.OffCampus}}</td>
						</tr>
					</table>
				</div>
				<div ng-show="wise">
					<h4>Registrants for : <b>{{selected.name}}</b></h4>
					<h4>Total : <b>{{ selected.count }}</b> , OffCampus : <b>{{ selected.OffCampus }}</b></h4>
					<h5>Email Selections(click add/remove to add/remove email list):</h5>
					<div class="form-group">
						<p>
							<div class="js-copytextarea"><span ng-repeat="item in mailList">{{participants[item].email}}{{($index!=mailList.length-1)?',':''}}</div>
						</p>
						<p>
							<button class="js-textareacopybtn btn btn-success">Copy Maillist</button>
						</p>
					</div>
					<button class="btn btn-success form-group" ng-click='downloadCSV({ filename: "download.csv" });'>Download As CSV</button>
					<table class="table table-striped form-group">
						<tr>
							<th>Sl No</th>
							<th>Name</th>
							<th>College</th>
							<th>Branch</th>
							<th>email</th>
							<th>number</th>
							<th>location</th>
							<th>Time Registered</th>
							<th>Year</th>
							<th>Add/Remove</th>
						</tr>
						<tr ng-repeat="participant in participants | orderBy:'id'" class="{{participant.out?'bg-red':''}}">
							<td>{{:: $index+1}}</td>
							<td>{{:: participant.name}}</td>
							<td>{{:: participant.college}}</td>
							<td>{{:: participant.branch}}</td>
							<td>{{:: participant.email}}</td>
							<td>{{:: participant.mobile}}</td>
							<td>{{:: participant.location}}</td>
							<td>{{:: participant.time}}</td>
							<td>{{:: participant.year}}</td>
							<td><button class="btn {{(inList(mailList,participant.id))?'btn-danger':'btn-primary'}}" ng-click="AddRemove(participant.id);">{{(inList(mailList,$index))?'Remove':'Add'}}</button></td>
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
				var arrlist = <?php echo json_encode($diff); ?>;

				var inBlackList = function(item){
					for(var i=0;i<arrlist.length;i++){
						if(item == arrlist[i])
							return true;
					}
					return false;
				}

				var getOffCampus = function(name){
					var count = 0;
					for(var i=0;i<$scope.details.length;i++){
						if($scope.details[i].rfor == name){
							if(inBlackList($scope.details[i].id))
								count++;
						}
					}
					return count;
				}

				for(var i=0;i<$scope.events.length;i++){
					var temp =$scope.events[i];
					$scope.events[i] = {
											"count":$scope.count[i],
											"name":temp,
											"OffCampus":getOffCampus(temp)
										}

				}
				
				$scope.countOther = <?php echo $countOther; ?>;
				$scope.countUnique = <?php echo $uniqueOut; ?>;
				$scope.committee = false;
				$scope.wise = false;
				$scope.sorted = "name";

				$scope.toggleCommittee = function(){
					$scope.committee = !(angular.copy($scope.committee));
					$scope.wise = false;
				}
				$scope.toggleEvent = function(){
					$scope.wise = !(angular.copy($scope.wise));
					$scope.committee = false;
				}

				

				$scope.participants = [];
				$scope.mailList = [];
				for(var i=0;i<$scope.details.length;i++){
					if($scope.details[i].rfor==$scope.events[0].name){
						$scope.details[i].id=angular.copy(parseInt($scope.details[i].id));
						if(inBlackList($scope.details[i].id)){
							$scope.details[i].out=true;
						}else{
							$scope.details[i].out=false;
						}
						$scope.participants.push($scope.details[i]);
					}
				}
				$scope.$watch('selected',function(n,o){
					if(n!=o){
						$scope.participants=[];
						$scope.mailList=[];
						for(var i=0;i<$scope.details.length;i++){
							if($scope.details[i].rfor==$scope.selected.name){
								$scope.details[i].id=angular.copy(parseInt($scope.details[i].id));
								if(inBlackList($scope.details[i].id)){
									$scope.details[i].out=true;
								}else{
									$scope.details[i].out=false;
								}
								$scope.participants.push($scope.details[i]);
							}
						}
						console.log($scope.participants);
					}
				});
				$scope.inList =function(arr,item){
					for(var i=0;i<arr.length;i++){
						if(arr[i]==item){
							return true;
						}
					}
					return false;
				}
				var removeItem = function(arr,item){
					for(var i=0; i<arr.length; i++) {
						if(arr[i] == item) {
							arr.splice(i, 1);
							break;
						}
					}
				}
				var addItem = function(arr,item){
					arr.push(item);
				}
				$scope.AddRemove = function(item){
					if ($scope.inList($scope.mailList,item))
						removeItem($scope.mailList,item);
					else
						addItem($scope.mailList,item);
				}
				$scope.toggleSort = function(){
					if($scope.sorted=="name"){
						$scope.sorted = "-count";
					}else{
						$scope.sorted = "name";
					}
				}
			    var convertArrayOfObjectsToCSV = function(args) {
			        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

			        data = args.data || null;
			        if (data == null || !data.length) {
			            return null;
			        }

			        columnDelimiter = args.columnDelimiter || ',';
			        lineDelimiter = args.lineDelimiter || '\n';

			        keys = Object.keys(data[0]);

			        result = '';
			        result += keys.join(columnDelimiter);
			        result += lineDelimiter;

			        data.forEach(function(item) {
			            ctr = 0;
			            keys.forEach(function(key) {
			                if (ctr > 0) result += columnDelimiter;

			                result += item[key];
			                ctr++;
			            });
			            result += lineDelimiter;
			        });

			        return result;
    			}

			    $scope.downloadCSV = function(args) {
			        var data, filename, link;

			        var csv = convertArrayOfObjectsToCSV({
			            data: $scope.participants
			        });
			        if (csv == null) return;

			        filename = args.filename || 'export.csv';

			        if (!csv.match(/^data:text\/csv/i)) {
			            csv = 'data:text/csv;charset=utf-8,' + csv;
			        }
			        data = encodeURI(csv);

			        link = document.createElement('a');
			        link.setAttribute('href', data);
			        link.setAttribute('download', filename);
			        link.click();
			    }

			 });
		</script>
		<script>
			var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

				copyTextareaBtn.addEventListener('click', function(event) {
					var copyTextarea = document.querySelector('.js-copytextarea');
					copyTextarea.select();
					try {
						var successful = document.execCommand('copy');
						var msg = successful ? 'successful' : 'unsuccessful';
						alert('Copied!Dude');
					} catch (err) {
						alert('Oops, unable to copy');
					}
				});
		</script>
		<style>
			.w50-b{
				width: 50%!important;
				display: inline-block!important;
			}
			.form-group{
				margin-bottom: 15px!important;
			}
			.bg-red{
				background-color: #ECA6A6!important;
			}
		</style>
	</html>