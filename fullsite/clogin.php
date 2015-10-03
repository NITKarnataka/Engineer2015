<?php
	session_start();
	require 'connect_db.php';
	$logged=$_SESSION['logged'];
	if(!empty($logged)&&$logged==true){
		header("Location: home.php");
	}
	if(isset($_SESSION['errmsg'])&&$_SESSION['logged']==false){
		echo $_SESSION['errmsg'];
	}
?>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="plugins/bootstrap/bootstrap.min.css">
	</head>
	<style>
		html,body{
			font-size: 14px;
		}
	</style>
	<body>
		<form action="check.php" method="post">
			<div class="col-md-4">
				<input type="text" placeholder="Username" class="form-control form-group" name="uname">
				<input type="password" placeholder="Password" class="form-control form-group" name="pwd">
				<input type="submit" value="Submit" class="btn btn-success">
			</div>
		</form>
	</body>
</html>