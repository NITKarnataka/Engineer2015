<?php
if(!(mysql_connect('localhost','enginee8_enginee8','Inci2014@NiTk')))
{
	echo "authenticaed" ;
	if(!(mysql_select_db('enginee8_enginee8_engi')))
	echo "we are temporarily down..cant connect";
die();
}
?>