<?php

if(!$_POST) exit;

$response = array( 'success' => false );

$formData = file_get_contents( 'php://input' );

$data = json_decode( $formData );

if($data->name!=''&&$data->number!=''&&$data->college!=''&&$data->email!=''){

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output
                              // Set email format to HTML
	$subject = 'Engineer Campus Ambassedor Registration';
	$body = 'Hey dude,<br>'.$data->name.' from '.$data->college.' has registered<br> '.'Email: '.$data->email.'<br>Number: '.$data->number.'<br>year: '.$data->year.'<br>stream: '.$data->stream.'<br>location: '.$data->location.'<br>Has held any position: '.$data->held.'<br>Description if yes: '.$data->desc.'<br>Facebook :'.$data->flink.'<br>Twitter :'.$data->tlink;
	$address = "rajatmittal18@gmail.com"
	if(mail($address, $subject, $body)) {
		 $response[ 'success' ] = true;
	} else {

	   $response[ 'false' ] = true;

	}
	echo json_encode( $response );
}
?>