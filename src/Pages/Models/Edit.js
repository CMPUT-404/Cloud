

import React from 'react';
import axios from 'axios';

class Edit extends React.Component{

  _isMounted = false
  componentWillUnmount(){
    this._isMounted = false
  }

  componentDidMount(){
    this._isMounted = true
  }



  save_change(props){
    console.log(props)
    var auth = "Token "+props.token

   
    var editdata = {}
    


    editdata.username = document.getElementById('name').value
    editdata.email = document.getElementById('email').value
    editdata.bio = document.getElementById('bio').value
    editdata.github = document.getElementById('github').value
    editdata.firstName = document.getElementById('firstname').value
    editdata.lastName = document.getElementById('lastname').value

    

    axios.patch(props.url, editdata, {headers:{
      "Authorization": auth,
    }
  }).then(function(response){
    window.location.reload()
  }).catch(e=>{if (e.response.status === 400){
            alert("this name already exists")
  }else{
    alert("oops something went wrong")
  } })

 }

 render(){
    return(
    
        <div id="form">
          <p className="form" id="changes">
            <input type="text" id="name" placeholder="UserName" ></input><br></br>
            <input type="text" id="email" placeholder="Email"></input><br></br>

            <input type="text" id="firstname" placeholder="Firstname"></input><br></br>
            <input type="text" id="lastname" placeholder="Lastname"></input><br></br>
           

            <input type="text" id="github" placeholder="github url"></input><br></br><br></br>
            <textarea type="text" id="bio" rows="5" cols="50" placeholder="Bio"></textarea><br></br>
            
            <button type="submit" onClick={()=> this.save_change(this.props)}> 
            Save changes
            </button>
          </p>
        </div>
    )
 }
    
}

export default Edit