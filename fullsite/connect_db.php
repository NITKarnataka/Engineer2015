<?php
if(!(mysql_connect('localhost','enginee8','engi2015@NITK'))||!(mysql_select_db('engiee8_engi')))
{
	echo"we are temporarily down..cant connect";
die();
}
?>