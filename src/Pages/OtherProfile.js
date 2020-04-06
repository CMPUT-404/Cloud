import React from 'react';
import './css/OtherProfile.css';
import CardContent from '../Components/CardContent'
import axios from 'axios';
import { Button,message} from 'antd';

class OtherProfile extends React.Component {

  _isMounted = false

  constructor(props){
    super(props)
    console.log(this.props)
    var authID = this.props.location.state.author.url.split('/')
    var authArray = [] 
    for(let i=0; i<authID.length; i++){
      if(authID[i]!==""){
        authArray.push(authID[i])
      }
    }
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
      authorID: authArray[authArray.length-1], //ID of the author of the post 
      authorDisplayName: this.props.location.state.author.displayName,
      userID: localStorage.getItem("user"), //ID of the currently logged in user 
      token: localStorage.getItem("token"),
      loggedURL: localStorage.getItem("url"),
      loggedDisplayName: localStorage.getItem("displayName"),
      host: "https://cloud-align-server.herokuapp.com",
      sourceHost: this.props.location.state.author.host,
      addFriend: true,
    };
    console.log(this.state.sourceHost)

  }

  
  componentDidMount() {
    this.__isMounted = true;
    let requestURL = ""
    if (this.state.sourceHost !== "https://cloud-align-server.herokuapp.com/"){
      requestURL = `https://cloud-align-server.herokuapp.com/author/`+this.state.authorID+'/?host='+this.state.sourceHost
      this.setState({postComponents: [<CardContent key={this.props.location.state.post.id} post={this.props.location.state.post}/>]})
      //this.loadPostData();
    }else{
      requestURL = this.state.authorURL
      this.loadPostData();
    }


   
    axios.get(requestURL)
        .then(
            (response) =>{
                console.log(response);
                this.setState({the_post: response.data})
                
            })
        .catch((err) =>{
                console.log(err+" Use fallback author info");
                this.setState({the_post: this.props.location.state.author, addFriend: false})
            }
        );
    
    this.getFriendStatus()
  }

  loadPostData(){

    
    axios.get("https://cloud-align-server.herokuapp.com/posts/author/"+this.state.authorID, {headers: {"Authorization": "Token "+ this.state.token}})
      .then(response => {
        
        var tempPostList = []
        for(let i=0; i<response.data.posts.length; i++){
          var eachPost = <CardContent key={response.data.posts[i].id} post={response.data.posts[i]}/>
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})
      })
      .catch((err)=>{
        console.log(err+" Use fallback post");
        this.setState({postComponents: [<CardContent key={this.props.location.state.post.id} post={this.props.location.state.post}/>]})
      }
      )
    
    
  }

  getFriendStatus =()=>{
      if (this.state.loggedURL === this.state.authorURL){
        this.setState({
          isMyProfile:true,
        })
      } else{
      axios.get('https://cloud-align-server.herokuapp.com/friendrequest/',{headers:{Authorization: "Token "+ this.state.token}}).then(res => {
        
        for(let i=0;i<res.data.length;i++){
          let sender = res.data[i].sender;
          let receiver = res.data[i].receiver;
          let status = res.data[i].status;
          if(( sender === this.state.loggedURL && receiver === this.state.authorURL)||
            (receiver === this.state.loggedURL && sender === this.state.authorURL)){
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
            else if (status === false){
             this.setState({
               isRejected: true,
             })
           }  
          }
       }   
     })
     }
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
        host: this.state.sourceHost,
        displayName: this.state.authorDisplayName,
        url: this.state.authorURL
      }  
    }
    axios.post('https://cloud-align-server.herokuapp.com/friendrequest/',data,{headers:{Authorization: "Token "+ this.state.token}})
      .then(res =>{
        this.setState({
          requestSent: true,
        })
      }).catch(function (error) {
      console.log(error);
      })
    message.success('Friend Request Successfully Sent')
  }

  rejectMessage =()=>{
    // last friend request was rejected, unfollow the user to retry adding friend
    let data = {   
      query: "deletefollow",
      author: {
        id: this.state.loggedURL,    
        host: this.state.host,
        displayName: this.state.loggedDisplayName,
        url: this.state.loggedURL
      },
      friend: {
        id: this.state.authorURL,  
        host: this.state.sourceHost,
        displayName: this.state.authorDisplayName,
        url: this.state.authorURL
      }  
    }
    axios.post('https://cloud-align-server.herokuapp.com/friendrequest/deletefollowing/',data,
    {headers:{Authorization: "Token "+this.state.token}}).then(res =>{});
      message.info('Your last friend request was rejected. You can try "add friend" again' )
      this.setState({
       isRejected: false,
      })  
  }

  

  render(){
   
      if (this.state.the_post){
      return(
      <div id="ProfileSection">     
        <img id="profile_pic" alt='profile' src={require('../Images/profile.jpeg')} /><br></br>
        <div id="profiletext">
          {this.state.the_post.displayName}<br></br>
          {this.state.the_post.email}<br></br>
          {this.state.the_post.github}<br></br>
          {this.state.the_post.bio}<br></br>
        </div>
        <div>
        {this.state.isMyProfile|| this.state.isFriend || this.state.requestSent|| this.state.isRejected ||!this.state.addFriend?null:<Button onClick={()=>this.addFriend()}>add friend</Button>}
        {this.state.isMyProfile? <Button disabled>MyCustomProfile</Button>:null}
        {this.state.isFriend? <Button disabled>Friend</Button>:null}
        {this.state.requestSent? <Button disabled>friend request sent</Button>:null}
        {this.state.isRejected? <Button onClick={()=>this.rejectMessage()}>Friend Request Info</Button>:null}
        {!this.state.addFriend&& <Button disabled>Not from trusted servers</Button>}
        <br/>
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
