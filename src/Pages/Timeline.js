import React from 'react';
import CardContent from '../Components/CardContent';
import GithubCardContent from '../Components/GithubCardContent';
import axios from 'axios';
import { Input } from 'antd';
import {Modal } from 'antd';
import './Timeline.css';

const { TextArea } = Input;

class Timeline extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "postComponents": [],
      url: 'https://cloud-align-server.herokuapp.com/posts/',
      visible: false,
      friends: null,
      friendcomponent: null,
      postVisible: true,
      showVlist: true
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
    console.log(this.state.postComponents)
    axios.get(`https://api.github.com/users/Vanessa0122/events`, {headers:{"If-Modified-Since": localStorage.getItem("lastModified")}})
      .then(response => {
        var maxGithubEventsAllowed = 5
        
        localStorage.setItem("lastModified", response.headers["last-modified"])

        console.log(response.headers["last-modified"])

        console.log(typeof(localStorage.getItem("lastModified")))

        console.log(localStorage.getItem("lastModified"))



        for(let i=0; i<maxGithubEventsAllowed; i++){
          if(response.data[i].payload.commits[0].message){
            var content =  response.data[i].payload.commits[0].message
          }
          let eachPostJSON = {
            "id": response.data[i].id,
            "title": response.data[i].type,
            "author": "https://cloud-align-server.herokuapp.com/users/" + localStorage.getItem("user") + "/",
            "author_data": {
              "id": localStorage.getItem("user"),
              "username": localStorage.getItem("username")
            },
            "contentType": "text/plain",
            "content": content
          }
          let eachPost = <GithubCardContent key={eachPostJSON.id} post={eachPostJSON} token={this.props.token}/>
          tempPostList.push(eachPost)
        }
      })

      .catch((err)=>{
        console.log(err)
      })

    axios.get(this.state.url, {headers:{Authorization: "Token "+this.props.token}})
      .then(response => {
        for(let i=0; i<response.data.length; i++){
          let eachPost = <CardContent key={response.data[i].id} post={response.data[i]} token={this.props.token} />
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})

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
        "author": "https://cloud-align-server.herokuapp.com/users/"+this.props.userObject.id+"/",
        "visibilities": visibility,
        "description": "",
        "visible_to": newvis,
      }, {headers:{Authorization: "Token "+this.props.token}})
      .then(()=>{
        window.location.reload()
      })
      
      .catch((err)=>{
        alert(err)
      })
  }


  startPost = () =>{
    axios.get('https://cloud-align-server.herokuapp.com/friend/user/'+this.props.userObject.id)
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


  render(){
    return(

      <div className="Timeline">
        <div id="inputBox">

              <TextArea id="title" rows={1} placeholder="Title of the Post"/>
              <TextArea id="text" rows={7} placeholder="Maximum 300 characters " maxLength="300"/>
              <button id="submitButton" onClick={this.startPost}>Submit</button>
              <input id="uploadButton" type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
              <Modal
                title={"Who should this Post be Visible to?"}
                visible={this.state.visible}
                onOk={this.submitPost}
                // confirmLoading={confirmLoading}
                // onCancel={this.handleCancel}
                >
               <button onClick={this.showVisibleList}>Post visible to all users? {this.state.showVlist.toString()}</button>
                  <div id="scroll"  >
                    {this.state.friendcomponent}                 
                  </div>
              </Modal>
          </div>
        {this.state.postComponents}
      </div>
    )
  }
}

export default Timeline