<?php
	require 'connect_db.php';
	session_start();
	if(isset($_SESSION['errmsg'])&&$_SESSION['logged']==false){
		echo $_SESSION['errmsg'];
	}
?>
<link rel="stylesheet" type="text/css" href="plugins/bootstrap/bootstrap.min.css">
<form action="check.php" method="post">
	<input type="text" placeholder="Username" name="uname">
	<input type="password" placeholder="Password" name="pwd">
	<input type="submit" value="Submit">
</form>