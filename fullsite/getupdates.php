<?php

	require 'connect_db.php';
	$formInput= file_get_contents( 'php://input' );
	$formData = json_decode( $formInput );


	$query2 = "SELECT * FROM `Sheet1` WHERE `".$formData->type."`='1'";
	$query_run2 = mysql_query($query2);
	$res2 = array();
	while($var1 = mysql_fetch_assoc($query_run2)){
		array_push($res2, $var1);
	}
	echo json_encode( $res2 );

?>