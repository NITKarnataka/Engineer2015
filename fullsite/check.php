<?php
	require 'connect_db.php';
	if(isset($_POST['uname'])&&isset($_POST['pwd'])){
		$uname = $_POST['uname'];
		$pwd = $_POST['pwd'];
		if($uname!=''&&$pwd!=''){
			$query='SELECT * from `usertable` WHERE `uname` = "$uname" AND `pwd` = "$pwd"';
			$query_run=mysql_query($query);
			if(mysql_num_rows(mysql_fetch_assoc($query_run))==1){
				$_SESSION['logged'] = true;
				header('Location: home.php');
			}else{
				$_SESSION['logged'] = false;
				header('Location: clogin.php');
				$_SESSION['errmsg'] = 'wrong user biactch';
			}
		}
	}
?>