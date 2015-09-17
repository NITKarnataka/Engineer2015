<?php
	
	//
	require './connect_db.php';
	$response[ 'success' ] = false;
	$formInput= file_get_contents( 'php://input' );
	//$formData = json_decode('{"name":"asdaa","number":"asd","email":"asd@asd.cvv","college":"asd","location":"asd","branch":"","friends":[{"name":"asd","number":"asd","email":"asd@asd.cvv","college":"asd","location":"asd","branch":""}]}');
	$formData = json_decode( $formInput );

	//$formData->friends = json_decode($formData->friends);
	$count=0;
	$query = "INSERT INTO `engineer2015`(`name`, `mobile`, `email`, `college`, `location`, `branch`,`rfor`) VALUES ('$formData->name','$formData->number','$formData->email','$formData->college','$formData->location','$formData->branch','$formData->rfor')";
	if(mysql_query($query)){
		for ($i=0 ; $i < sizeof($formData->friends) ; $i++){
			$friend = $formData->friends[$i];
			$query = "INSERT INTO `engineer2015`(`name`, `mobile`, `email`, `college`, `location`, `branch`) VALUES ('$friend->name','$friend->number','$friend->email','$friend->college','$friend->location','$friend->branch')";
			if(mysql_query($query)){
				$count++;
			}
		}
	}
	if($count == sizeof($formData->friends))
		$response[ 'success' ] = true;
	else $response[ 'success' ] = false;

	echo json_encode( $response );


?>