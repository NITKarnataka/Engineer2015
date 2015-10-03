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
	<body>
		<form action="check.php" method="post">
			<input type="text" placeholder="Username" name="uname">
			<input type="password" placeholder="Password" name="pwd">
			<input type="submit" value="Submit">
		</form>
	</body>
</html>