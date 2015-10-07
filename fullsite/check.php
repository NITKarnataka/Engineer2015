<?php
	session_start();
	require 'connect_db.php';
	if(isset($_POST["uname"])&&isset($_POST["pwd"])&&!empty($_POST["uname"])&&!empty($_POST["pwd"])){
		$uname = $_POST["uname"];
		$pwd = $_POST["pwd"];
		$query = 'SELECT * from `usertable` WHERE `uname` = "'.$uname.'" AND `pwd` = "'.$pwd.'"';
		$query_run = mysql_query($query);
		if(mysql_num_rows($query_run)==1){			
			$var = mysql_fetch_assoc($query_run);
			$_SESSION['logged']=$var['id'];
			$_SESSION['pwd']=$pwd;
			$_SESSION['un']=$uname;
			if($var['id']==5)
				header('Location: updates.php');
			header('Location: home.php');
		}else{
			$_SESSION['logged'] = 0;
			$_SESSION['errmsg'] = 'wrong user biactch';
			header("Location: clogin.php");
		}
	}else{
		echo 'wtf';
		header("Location: clogin.php");
	}
?>