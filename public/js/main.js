(function(url,name,pbody,submit,htmel){
   function setPostTitle(title,un,id){
      var uname=document.createElement('div'),
         hide=document.createElement('div'),
         remove=document.createElement('div');
      title.className='ptitle';
      uname.className='uname';
      hide.className=remove.className='red';
      uname.innerText=un;
      hide.innerHTML='<span>hide</span>';
      remove.innerHTML='<span>delete</span>';
      title.appendChild(uname);
      title.appendChild(remove);
      title.appendChild(hide);
      hide.onclick=function(){
         var p=this.parentElement.parentElement;
         p.parentElement.removeChild(p);
      };
      remove.onclick=function(){
         sender.opost('delete='+id);
      };
      return title;
   }
   let sender=new Sender(url,function(data){
      if(!data) return (htmel.innerHTML='');
      if(data==='0' || data==='1')
         return (document.getElementsByClassName('warning')[data].innerText='this field is required!');
      htmel.innerHTML='';
      data.split('=====').forEach(function(row){
         var post=document.createElement('div'),
            pt=document.createElement('h4'),
            pb=document.createElement('div');
         post.className='post';
         pb.className='pbody';
         row=row.split('`');
         pb.innerText=row[1];
         post.appendChild(setPostTitle(pt,row[0],row[2]));
         post.appendChild(pb);
         htmel.appendChild(post);
      });
      name.value=pbody.value='';
      Array.prototype.forEach.call(document.getElementsByClassName('warning'),function(w){w.innerText='';});
   });
   if(!sender)
      return (htmel.innerHTML='<h2 text-align="center">Connection to server failed!</h2>');
   sender.opost('table=1');
   submit.onclick=function(){
      sender.opost('name='+name.value+'&body='+pbody.value);
   };
})(
   './server/home.php',
   document.getElementById('name'),
   document.getElementById('pbody'),
   document.getElementById('submit'),
   document.getElementById('content')
   );