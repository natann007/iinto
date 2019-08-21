function Sender(url,reshandler=console.log){
   this.robj=null;
   try{
      this.robj=new XMLHttpRequest();
   }
   catch(e){
      return (this.robj=null);
   }
   this.robj && (this.url=url.trim()) && (this.robj.onreadystatechange=function(){
      if(this.readyState==this.DONE && this.status==200)
         reshandler(this.responseText);
   });
   return true;
}
Sender.prototype={
   constructor: Sender,
   opget: function(data){
      try{
         this.robj.open('GET',this.url+'?'+data,true);
         this.robj.send();
      }
      catch(e){
         return false;
      }
      return true;
   },
   opost: function(data){
      try{
         this.robj.open('POST',this.url,true);
         this.robj.setRequestHeader('Content-type','application/x-www-form-urlencoded');
         this.robj.send(data);
      }
      catch(e){
         return false;
      }
      return true;
   }
};