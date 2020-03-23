import React from 'react';
import './css/OtherProfile.css';

import axios from 'axios';
import { Button} from 'antd';

class OtherProfile extends React.Component {

  _isMounted = false

  constructor(props){
    super(props)
    this.state = {
      Props: props,

      //check friend request status
      isMyProfile:false,
      requestSent: false,
      isFriend: false,
      isRejected: false,
      
      path: "/Timeline",
      postComponents : [],
      edit: false,
      go_edit : ()=>{
        this.setState({edit:true})
      },
      authorURL: this.props.location.state.author.url, //URL of the author of the post
      authorID: this.props.location.state.author.id, //ID of the author of the post 
      authorDisplayName: this.props.location.state.author.displayName,
      userID: localStorage.getItem("user"), //ID of the currently logged in user 
      token: localStorage.getItem("token"),
      loggedURL: localStorage.getItem("url"),
      loggedDisplayName: localStorage.getItem("displayName"),
      host: "https://cloud-align-server.herokuapp.com",
    }
  }

  
  componentDidMount() {
    this.__isMounted = true;
    axios.get(this.state.authorURL)
        .then(
            (response) =>{
                this.setState({the_post: response.data})
                
            })
        .catch(
            function(err){
                console.log(err)
            }
        )
    //this.loadPostData();
    this.getFriendStatus()
  }

  // loadPostData(){
  //   axios.get("https://cloud-align-server.herokuapp.com/posts/author/"+this.state.authorID, {headers: {"Authorization": "Token "+ this.state.token}})
  //     .then(response => {
  //       console.log(response)
  //       var tempPostList = []
  //       for(let i=0; i<response.data.length; i++){
  //         var eachPost = <CardContent key={response.data[i].id} post={response.data[i]}/>
  //         tempPostList.push(eachPost)
  //       }
  //       this.setState({postComponents: tempPostList})
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     }
  //     )
  // }

  getFriendStatus =()=>{
    // if (this.props.userObject.id===this.state.authorID){
    //   this.setState({
    //     isMyProfile:true,
    //   })
    // } else{
    // axios.get('https://cloud-align-server.herokuapp.com/newfollowing/',{headers:{Authorization: "Token "+ this.state.token}}).then(res => {
    //   for(let i=0;i<res.data.length;i++){
    //     if(res.data[i].sender.id === this.props.location.state.user.id || 
    //       res.data[i].receiver.id === this.props.location.state.user.id){
    //       let status = res.data[i].status;
    //       if (status === true){
    //         this.setState({
    //           isFriend: true,
    //         })
    //       }
    //       else if (status === null){
    //         this.setState({      
    //           requestSent: true,
    //         })
    //       }
    //       else if (status === false){
    //         this.setState({
    //           isRejected: true,
    //         })
    //       }  
    //     }
    //   }   
    // })
    // }
  }

  addFriend =()=>{
    let data = {
      query: "friendrequest",
      author: {
        id: this.state.loggedURL,    
        host: this.state.host,
        displayName: this.state.loggedDisplayName,
        url: this.state.loggedURL
      },
      friend: {
        id: this.state.authorURL,  
        host: this.state.host,
        displayName: this.state.authorDisplayName,
        url: this.state.authorURL
      }  
    }
    axios.post('https://cloud-align-server.herokuapp.com/friendrequest/',data,{headers:{Authorization: "Token "+ this.state.token}})
      .then(res =>{
        this.setState({
    //       requestSent: true,
        })
      }).catch(function (error) {
      console.log(error);
      })
    message.success('Friend Request Successfully Sent')
  }

  rejectMessage =()=>{
    // // last friend request was rejected, unfollow the user to retry adding friend
    // let data = {   
    //   following:this.props.location.state.user.id
    // }
    // axios.post('https://cloud-align-server.herokuapp.com/deletefollowing',data,
    //   {headers:{Authorization: "Token "+localStorage.getItem("token")}}).then(res =>{});
    // message.info('Your last friend request was rejected. You can try "add friend" again' )
    // this.setState({
    //   isRejected: false,
    // })  
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
          <Button onClick={()=>this.addFriend()}>add friend</Button>
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
export default OtherProfile
