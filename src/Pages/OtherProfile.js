import React from 'react';

import './css/Profile.css';

import axios from 'axios';


class Profile extends React.Component {

  _isMounted = false

  constructor(props){
    super(props)
    this.state = {
      Props: props,
      
      path: "/Timeline",
      postComponents : [],
      edit: false,
      go_edit : ()=>{
       
        this.setState({edit:true})
      }
      
    }
  }

  
  componentDidMount() {
    this.__isMounted = true;
    var id =  this.props.location.state.user.id
    var token = this.props.location.state.token
    
    
    axios.get('https://cloud-align-server.herokuapp.com/users/'+id, {headers: {"Authorization": "Token "+ token}} )
        .then(
            (response) =>{
                this.setState({the_post: response.data})
                
            })
        .catch(
            function(err){
                console.log(err)
                alert(err)
            }
        )
   
    
  }

  

  render(){
   
      if (this.state.the_post){
      return(
      <div>
       
       <img id="profile_pic" alt='profile' src={require('../Images/profile.jpeg')} /><br></br>
      {this.state.the_post.username}<br></br>
      {this.state.the_post.email}<br></br>
      {this.state.the_post.github}<br></br>
      {this.state.the_post.bio}<br></br>

      
    
      
      
      </div>
      )
      }else{
        return(
          <div></div>
        )
      
    }
  
}}
export default Profile
