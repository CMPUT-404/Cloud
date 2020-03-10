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
    
    alert(token)
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
   
      return(
      <div>{JSON.stringify(this.state.the_post)}</div>
        // <div className="Profile" >
        //    <div id="posts">
        //   <BasicProfile object={this.props.userObject}/>
            
        //   </div>    
        //   <div id="myPosts">
        //     {this.state.postComponents}
        //     </div>
        // </div>
      )
    }
  
}
export default Profile
