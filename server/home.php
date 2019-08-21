<?php
   require_once 'Connector.php';
   function gentle_trim($str){
		return preg_replace('/\s{2,}/',' ',$str);
	}
   function full(&$field){
		return !empty($field=gentle_trim(trim($field)));
	}
   $con=new Connector();
   if(!empty($_POST['table'])){
      die($con->getTable());
   }
   if(!empty($_POST['delete']) && is_numeric($_POST['delete'])){
      $con->delete((int)$_POST['delete']);
      die($con->getTable());
   }
   if(!full($_POST['name'])) die('0');
   if(!full($_POST['body'])) die('1');
   $con->insert([$_POST['name'],$_POST['body']]);
   echo $con->getTable();
?>