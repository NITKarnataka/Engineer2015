<?php
if(!(mysql_connect('localhost','enginee8_engi15u','engi15u@engi'))||!(mysql_select_db('enginee8_engi15')))
{
	echo "we are temporarily down..cant connect";
	die();
}
?>