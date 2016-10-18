<?php
	session_start();
	session_unset();
	session_destroy();

	header("location: clogin.php");
	exit();
?>