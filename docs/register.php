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
		$count++;
		for ($i=0 ; $i < sizeof($formData->friends) ; $i++){
			$friend = $formData->friends[$i];
			$query = "INSERT INTO `engineer2015`(`name`, `mobile`, `email`, `college`, `location`, `branch`,`rfor`) VALUES ('$friend->name','$friend->number','$friend->email','$friend->college','$friend->location','$friend->branch','$formData->rfor')";
			if(mysql_query($query)){
				$count++;
			}
		}
		/*mailer*/
		$contacter_mail = $formData->email;
		$contacter_subject = "Engineer NITK 2015 Events/workshops/Techspeaks Registeration";
		$headers = "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8";
		for($i=0 ; $i< sizeof($formData->friends) ; $i++){
			$friend = $formData->friends[$i];
			$contacter_mail .= ",".$friend->email;
		}
		$contacter_body = "Thank you for registering for ".$formData->rfor."\r\nWe will contact you again\r\nFor queries feel free to drop a mail to rajat@engineer.org.in .\r\nThis is an auto generated mail please do not reply to this mail.";
		mail($contacter_mail, $contacter_subject , $contacter_body,$headers);
	}
	if($count == sizeof($formData->friends)+1)
		$response[ 'success' ] = true;
	else $response[ 'success' ] = false;

	echo json_encode( $response );


?>