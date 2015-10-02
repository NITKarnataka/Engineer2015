<?php
	// if(isset($_SESSION['logged'])&&$_SESSION['logged']){
		$query = "SELECT * from `engineer2015`  ORDER BY `rfor`";
		$query_run = mysql_query($query);
		$pre='dummy';
		$arr=array();
		while($var = mysql_fetch_assoc($query_run)){
			if($pre!=$var['rfor']){
				if($var['rfor']!=''){
					array_push($arr, $var['rfor']);
					$pre = $var['rfor'];
				}
			}
		}	
		for($i=0;$i<sizeof($arr);$i++)
			echo $arr[$i];
?>
	<link rel="stylesheet" type="text/css" href="plugins/bootstrap/bootstrap.min.css">
	<table class="table table-striped">
	</table>

<?php
	// }else{
	// 	header("Location: clogin.php")
	// }
?>