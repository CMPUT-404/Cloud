

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



  save_change = () =>{
    console.log(this.props)
    var auth = "Token "+this.props.token
    var name = document.getElementById('name').value
    axios.patch(this.props.url, {username: name}, {headers:{
      "Authorization": auth,
    }
  }).catch(e=>{console.log(e)})
  }

render(){
    return(
    
        <div id="form">
          <form className="form"  onSubmit={ ()=>this.save_change(this.state)} id="changes">
            <input type="text" id="name" placeholder="Name" ></input><br></br>
            <input type="text" id="email" placeholder="Email"></input><br></br>
            <input type="text" placeholder="PhoneNumber"></input><br></br>
            
            <button> 
            Save changes
            </button>
          </form>
        </div>
    )
}
    
}

export default Edit