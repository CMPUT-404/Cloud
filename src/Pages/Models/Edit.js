

import React from 'react';
import axios from 'axios';
import {Button, Input} from 'antd';

class Edit extends React.Component{

  _isMounted = false
  componentWillUnmount(){
    this._isMounted = false
  }

  componentDidMount(){
    this._isMounted = true
  }



  save_change(props){
    
    var auth = "Token "+props.token

   
    var editdata = {}
    

    

  
    
    if (document.getElementById('displayname').value!== ""){
      editdata.displayName = document.getElementById('displayname').value
    }

    if (document.getElementById('email').value !== ""){
      editdata.email = document.getElementById('email').value
    }

    if (document.getElementById('bio').value!==""){
      
      editdata.bio = document.getElementById('bio').value
     
    }
    
    if (document.getElementById('github').value!==""){
      editdata.github = document.getElementById('github').value
    }

    if (document.getElementById('firstname').value!==""){
    editdata.firstName = document.getElementById('firstname').value
    }

    if (document.getElementById('lastname').value!==""){
    editdata.lastName = document.getElementById('lastname').value
    }

    

    axios.patch(props.url, editdata, {headers:{
      "Authorization": auth,
    }
  }).then(function(response){
    window.location.reload()
  }).catch(e=>{if (e.response.status === 400){
    alert("oops something went wrong")
  }else{
    alert("oops something went wrong")
  } })

 }

 render(){
    return(
    
        <div id="form">
          <p className="form" id="changes">
            <Input type="text" id="displayname" placeholder="Display Name" ></Input><br></br>
            <Input type="text" id="email" placeholder="Email"></Input><br></br>

            <Input  type="text" id="firstname" placeholder="First name"></Input><br></br>
            <Input   type="text" id="lastname" placeholder="Last name"></Input><br></br>
           

            <Input type="text" id="github" placeholder="github url"></Input><br></br><br></br>
            <textarea type="text" id="bio" rows="5" cols="50" placeholder="Bio"></textarea><br></br>
            
            <Button type="submit" onClick={()=> this.save_change(this.props)}> 
            Save changes
            </Button>
          </p>
        </div>
    )
 }
    
}

export default Edit