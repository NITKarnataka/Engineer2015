<?php
	$file_name = 'Engi\'15.apk'; //$_GET['f'] has the link to the file like http://mydomain.com/file/android.apk 
	require 'connect_db.php';
	$query = 'UPDATE apptable SET downloads = downloads + 1 WHERE id = 1';
	mysql_query($query);
	header('location: '.$file_name);
?>