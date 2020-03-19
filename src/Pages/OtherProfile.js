import React from 'react';
import CardContent from '../Components/CardContent';
import './css/OtherProfile.css';

import axios from 'axios';
import { Button} from 'antd';

class Profile extends React.Component {

  _isMounted = false

  constructor(props){
    super(props)
    this.state = {
      Props: props,

      //check friend request status
      requestSent: false,
      isFriend: false,
      
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
    this.loadPostData();
    this.getFriendStatus()
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

  getFriendStatus =()=>{
    axios.get('https://cloud-align-server.herokuapp.com/newfollowing/',{headers:{Authorization: "Token "+localStorage.getItem("token")}}).then(res => {
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].sender.id === this.props.location.state.user.id || 
          res.data[i].receiver.id === this.props.location.state.user.id){
          let status = res.data[i].status;
          if (status === true){
            this.setState({
              isFriend: true,
            })
          }
          else if (status === null){
            this.setState({      
              requestSent: true,
            })
          }  
        }
      }
      
    })
  }

  addFriend =()=>{
    let data = {
       sender : 'https://cloud-align-server.herokuapp.com/users/'+ this.props.userObject.id+ '/',
       receiver : 'https://cloud-align-server.herokuapp.com/users/'+ this.props.location.state.user.id +'/',    
    }
    axios.post('https://cloud-align-server.herokuapp.com/newfollowing/',data,{headers:{Authorization: "Token "+localStorage.getItem("token")}})
      .then(res =>{
        this.setState({
          requestSent: true,
        })
      }).catch(function (error) {
            console.log(error);
        })
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
        <div>

        {this.state.isFriend || this.state.requestSent?null:<Button onClick={()=>this.addFriend()}>add friend</Button>}
        {this.state.isFriend? <Button disabled>Friend</Button>:null}
        {this.state.requestSent? <Button disabled>friend request sent</Button>:null}
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
