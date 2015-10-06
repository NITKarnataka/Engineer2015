<?php

	require './connect_db.php';
	$response[ 'success' ] = false;
	$formInput= file_get_contents( 'php://input' );
	$formData = json_decode( $formInput );

	$query = "SELECT * FROM `usertable` WHERE `uname`='$formData->uname' AND `pwd`='$formData->pwd'";
	$query_run = mysql_query($query);
	if(mysql_num_rows($query_run)==1){
		$query2 = "UPDATE `engineer2015` SET `send` = '$formData->send' WHERE id='$formData->id'";
		if(mysql_query($query2))
			$response[ 'success' ] = true;
		else $response[ 'success' ] = false

	}
	echo json_encode( $response );

?>