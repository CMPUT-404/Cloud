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
      "postComponents": [],
      url: 'https://cloud-align-server.herokuapp.com/posts/',
      visible: false,
      author: localStorage.getItem("url"), //https://cloud-align-server.herokuapp.com/author/author_id/ 
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
        "author": localStorage.getItem("url"),
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
        {this.state.postComponents}
      </div>
    )
  }
}

export default Timeline