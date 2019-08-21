<?php
   class Connector{
      protected $con=null;
      function __construct(){
         try{
            $this->con=new PDO('mysql:host=localhost;dbname=iinto_interview','root','');
            $this->con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
         }
         catch(PDOException $e){
            echo $e->getMessage();
         }
      }
      function insert(Array $values){
         $this->con->prepare('insert into posts(name,content) values(?,?)')->execute($values);
      }
      function getTable(){
         $table=$this->con->query('select * from posts order by id desc')->fetchAll();
         $res='';
         foreach($table as $row)
            $res.=$row['name'].'`'.$row['content'].'`'.$row['id'].'=====';
         return preg_replace('/(=====)$/','',$res);
      }
      function delete(int $id){
         $this->con->prepare('delete from posts where id=?')->execute([$id]);
      }
   }
?>