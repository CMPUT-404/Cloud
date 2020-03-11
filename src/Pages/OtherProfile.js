import React from 'react';
import CardContent from '../Components/CardContent';
import './css/OtherProfile.css';

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
    this.loadPostData = this.loadPostData.bind(this);
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
    this.loadPostData()
  }

  loadPostData(){
    var id =  this.props.location.state.user.id
    var token = this.props.location.state.token
    console.log(id)
    axios.get("https://cloud-align-server.herokuapp.com/posts/user/"+id, {headers: {"Authorization": "Token "+ token}})
      .then(response => {
        console.log(response)
        var tempPostList = []
        for(let i=0; i<response.data.length; i++){
          var eachPost = <CardContent key={response.data[i].id} post={response.data[i]}/>
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})

      })
      .catch((err)=>{
        console.log(err)
      }
      )
  }

  

  render(){
   
      if (this.state.the_post){
      return(
      <div id="ProfileSection">     
        <img id="profile_pic" alt='profile' src={require('../Images/profile.jpeg')} /><br></br>
        <div id="profiletext">
          {this.state.the_post.username}<br></br>
          {this.state.the_post.email}<br></br>
          {this.state.the_post.github}<br></br>
          {this.state.the_post.bio}<br></br>
        </div>

        <div id="Posts">
            {this.state.postComponents}
        </div>
      </div>
      )
      }else{
        return(
          <div></div>
        )
      
    }
  
}}
export default Profile
