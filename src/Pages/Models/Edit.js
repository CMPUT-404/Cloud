

import React from 'react';

class Edit extends React.Component{
    save_change(tempdata){


  

  
      var data = {};
      var email = document.getElementById("email").value;
      var name = document.getElementById("name").value;
      if (email !== ''){data["email"] = email}
      if (name!==''){data["username"] = name}
      // data["password"] = "raversefantasy"
      
     
      data = JSON.stringify(data);
      
    
      var putreq = new XMLHttpRequest(); 
      putreq.open('PUT',this.props.url,false);

     
      
    

      putreq.setRequestHeader('Authorization', "Basic " + btoa('vanessa:123456'));
      putreq.setRequestHeader('Content-Type', 'application/json');


      
      putreq.onreadystatechange = function () {
         
          if (putreq.status !== 200){
            var json = JSON.parse(putreq.responseText);
            alert(JSON.stringify(json));
          }
          
        };
    
     
    
      putreq.send(data);
    
       
       
    
        
      }

render(){
    return(

          
    
        <div id="form">
          <form className="form"  onSubmit={ ()=>this.save_change(this.state)} id="changes">
            <input type="text" id="name" placeholder="Name" ></input><br></br>
            <input type="text" id="email" placeholder="Email"></input><br></br>
            <input type="text" placeholder="PhoneNumber"></input><br></br>
            
            <button type="submit"> 
            Save changes
            </button>
            

          </form>
        </div>
    )
}
    
}

export default Edit