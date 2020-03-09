

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

   

    
    var name = document.getElementById('name').value
    
    

    var Email = document.getElementById('email').value
    var Bio = document.getElementById('bio').value

    axios.patch(props.url, {username: name, email:Email, bio:Bio}, {headers:{
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
            <input type="text" id="name" placeholder="Name" ></input><br></br>
            <input type="text" id="email" placeholder="Email"></input><br></br>
            <input type="text" id="bio" placeholder="Bio"></input><br></br>
            
            <button type="submit" onClick={()=> this.save_change(this.props)}> 
            Save changes
            </button>
          </p>
        </div>
    )
 }
    
}

export default Edit