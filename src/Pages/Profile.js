import React from 'react';
import BasicProfile from './Models/Basic_profile';
import './css/Profile.css';
import CardContent from '../Components/ProfileCardContent';
import Edit from './Models/Edit';
import axios from 'axios';

class Profile extends React.Component {

  _isMounted = false

  constructor(props){
    super(props)
    var authID = this.props.userObject.id.split('/')
    var authArray = [] 
    for(let i=0; i<authID.length; i++){
      if(authID[i]!==""){
        authArray.push(authID[i])
      }
    }
    this.state = {
      Props: props,
      path: "/Timeline",
      postComponents : [],
      edit: false,
      go_edit : ()=>{
        if (this.state.edit === false){
        this.setState({edit:true})
        }else{
          this.setState({edit:false})
        }
      },
      userID: authArray[authArray.length-1],    
      token: localStorage.getItem("token")
    }
  }

  
  componentDidMount() {
    this.__isMounted = true;
    this.loadPostData()
    
  }

  loadPostData(){
   
    axios.get("https://cloud-align-server.herokuapp.com/posts/author/"+this.state.userID, {headers:{Authorization: "Token "+this.state.token}})
      .then(response => {
        var tempPostList = []
        
        for(let i=0; i<response.data.posts.length; i++){
          var eachPost = <CardContent key={response.data.posts[i].id} token={this.state.token} post={response.data.posts[i]}/>
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})

      })
      .catch((err)=>{
        alert(err)
      }
      )
  }

  render(){
    if (this.state.edit === false){
      return(
        <div>
          <BasicProfile object={this.props.userObject} edit={this.state.go_edit}/><br></br>
          <div id="myPosts">
            {this.state.postComponents}
          </div>
        </div>
      )
    }else{ 
      return(
        <div id="B">
          
          <BasicProfile object={this.props.userObject} edit={this.state.go_edit}/>
          <Edit object={this.props.userObject} token={this.state.token} url={"https://cloud-align-server.herokuapp.com/author/"+this.state.userID+"/"}/>
        </div>
      )
    }
  }
}
export default Profile
