<?php

	require 'connect_db.php';
	$formInput= file_get_contents( 'php://input' );
	$formData = json_decode( $formInput );

	if($formData->type=="upcoming"){
		$query2 = "SELECT * FROM `Sheet1` WHERE `upcoming`='1'";
		$query_run2 = mysql_query($query2);
		$res1 = array();
		while($var1 = mysql_fetch_assoc($query_run2)){
			array_push($res1, $var1);
		}
	}

	if($formData->type=="current"){
		$query3 = "SELECT * FROM `Sheet1` WHERE `current`='1'";
		$query_run3 = mysql_query($query3);
		$res1 = array();
		while($var2 = mysql_fetch_assoc($query_run3)){
			array_push($res1, $var2);
		}
	}

	echo json_encode( $res1 );

?>