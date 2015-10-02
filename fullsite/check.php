<?php
echo 'sasa';
	require 'connect_db.php';
	if(isset($_POST["uname"])&&isset($_POST["pwd"])&&!empty($_POST["uname"])&&!empty($_POST["pwd"])){
		$uname = $_POST["uname"];
		$pwd = $_POST["pwd"];
		$query = 'SELECT * from `usertable` WHERE `uname` = "$uname" AND `pwd` = "$pwd"';
		$query_run = mysql_query($query);
		if(mysql_num_rows($query_run)==1){
			$_SESSION["logged"] = true;
			header('Location: home.php');
		}else{
			$_SESSION["logged"] = false;
			$_SESSION["errmsg"] = 'wrong user biactch';
			echo 'whwewwewewewewe';
			
		}
	}else{
		echo 'wtf';
		//header("Location: clogin.php");
	}
?>