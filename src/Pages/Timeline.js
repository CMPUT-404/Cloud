import React from 'react';
import CardContent from '../Components/CardContent';
import axios from 'axios';
import { Input } from 'antd';
import {Modal } from 'antd';
import './Timeline.css';


const { TextArea } = Input;

class Timeline extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      myPostComponents: [],
      otherPostComponents: [],
      url: 'https://cloud-align-server.herokuapp.com/author/posts',
      visible: false,
      author: localStorage.getItem("url"), //https://cloud-align-server.herokuapp.com/author/author_id/ 
      friends: null,
      friendcomponent: null,
      postVisible: true,
      showVlist: true,
      token: localStorage.getItem("token"),
      myImage: null,
      loadImage: function(img){
        this.setState(this.myImage)
      }
    }
    this.loadPostData = this.loadPostData.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  componentDidMount() {
    this.loadPostData()
  }


  loadPostData(){
    var tempPostList = []
    //Fetching github events here 
    // Get github username from local storage later 

    axios.get(this.state.url, {headers:{Authorization: "Token "+this.state.token}})
      .then(response => {
        //console.log(response)
        for(let i=0; i<response.data.posts.length; i++){
          let eachPost = <CardContent key={response.data.posts[i].id} post={response.data.posts[i]} token={this.state.token} />
          tempPostList.push(eachPost)
        }
        this.setState({myPostComponents: tempPostList})

      })
      .catch(()=>{
        alert("failed to load posts")
      })

      var otherPostList = []
      axios.get(`https://spongebook.herokuapp.com/posts`)
      .then(response => {
        //console.log(response)
        for(let i=0; i<response.data.posts.length; i++){
          let eachPost = <CardContent key={response.data.posts[i].id} post={response.data.posts[i]} token={this.state.token} />
          otherPostList.push(eachPost)
        }
        this.setState({otherPostComponents: otherPostList})
      })
      .catch(()=>{
        alert("failed to load posts")
      })

  }

  submitPost = () => {
    
    var title = document.getElementById("title").innerHTML
    var text = document.getElementById("text").innerHTML
    var newvis = ""
    var visibility = true
    if (this.state.showVlist === false){
      visibility = false
      

      for(var i =0 ; i < this.state.friends.length ; i++){
       
        if ((document.getElementById(this.state.friends[i]).checked) === true){
          newvis += this.state.friends[i] +","
          
        }
      }
    }

    axios.post(this.state.url,{
        "title":title, 
        "content":text, 
        "author": localStorage.getItem("url"),
        "visibilities": visibility,
        "description": "",
        "visible_to": newvis,
      }, {headers:{Authorization: "Token "+this.state.token}})
      .then(()=>{
        window.location.reload()
      })
      
      .catch((err)=>{
        alert(err)
      })
  }


  startPost = () =>{

    axios.get(this.state.author+'friends',
    {headers:{"Authorization":"Token "+localStorage.getItem("token")}})
    .then( res =>{
      
      var friendlist = []
      var friendisplay = []
      var temp = ""
      for (var i of res.data.authors){
        friendlist.push(i.id)
        temp = i.id
        friendisplay.push(<div key={temp}> {i.displayName} <input key ={i.id} id={i.id}  type="checkbox"/> </div>)
      }
      
      this.setState({friendcomponent: friendisplay})
      this.setState({friends: friendlist})
      this.setState({visible: true})
      
    }
    )
  }
  showVisibleList= ()=>{
    if (this.state.showVlist === true){this.setState({showVlist: false})}
    else{this.setState({showVlist: true})}
  }
  exitModal = () =>{
    this.setState({visible: false})
  }

  pictureHandler = () => {
    var file = document.getElementById("uploadButton").files[0]
    var reader = new FileReader()

    var image = document.getElementById('userImg')
  
    reader.addEventListener("load", function(){
      image.src = reader.result
      
      
    },false)

    reader.readAsDataURL(file)
    
    

  }


  render(){
    return(
      <div className="Timeline">
        
        {/* here <img src='' id='test' alt=''/>
        <p id='test2'>eee</p>
        {this.state.myImage} */}

        <div id="inputBox">

              <TextArea id="title" rows={1} placeholder="Title of the Post"/>
              <img id="userImg" alt ='' src='' />
              <TextArea id="text" rows={7} placeholder="Maximum 300 characters " maxLength="300"/>
              <button id="submitButton" onClick={this.startPost}>Submit</button>
              
              <input id="uploadButton"  type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
              <Modal
                title={"Who should this Post be Visible to?"}
                visible={this.state.visible}
                onOk={this.submitPost}
                // confirmLoading={confirmLoading}
                onCancel={this.exitModal}
                >
                
               
               Post visible to all users ?<br/>
               <button onClick={this.showVisibleList}>Change Visibility</button><br/>
                   
                  <div id="scroll"  >
                    {this.state.showVlist? (""): "Who can see your post?"}
                    {this.state.showVlist? ( "Post visible to all")
                    :  this.state.friendcomponent}



                   
                       
                  </div>
              </Modal>
          </div>
        {this.state.myPostComponents}
        {this.state.otherPostComponents}
      </div>
    )
  }
}

export default Timeline