import React from 'react';
import CardContent from '../Components/CardContent';
import axios from 'axios';
import { Input } from 'antd';
import './Timeline.css';
const { TextArea } = Input;



class Timeline extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "postComponents": [],
      url: 'https://cloud-align-server.herokuapp.com/posts/'

    }
    this.loadPostData = this.loadPostData.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.loadPostData();
  }

  loadPostData(){
    axios.get("https://cloud-align-server.herokuapp.com/posts")
      .then(response => {
        var tempPostList = []
        for(let i=0; i<response.data.length; i++){
          var eachPost = <CardContent key={response.data[i].id} post={response.data[i]} token={this.props.token}/>
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})

      })
      .catch(()=>{
        alert("Something went wrong, please try again")
      })
  }

  submitPost(){
    
    var title = document.getElementById("title").innerHTML
    var text = document.getElementById("text").innerHTML
    console.log(this.props.userObject)
    
    axios.post("https://cloud-align-server.herokuapp.com/posts/",{
        "title":title, 
        "content":text, 
        "author": "https://cloud-align-server.herokuapp.com/users/"+this.props.userObject.id+"/",
        "visibilities": true,
        "description": "",
        "visible_to": ""
      })
      .then(()=>{
        window.location.reload()
      })
      
      .catch((err)=>{
        console.log(err)
      })
    

  }


  render(){
    return(

      <div className="Timeline">
        <div id="inputBox">
              <TextArea id="title" rows={1} placeholder="Title of the Post"/>
              <TextArea id="text" rows={7} placeholder="Maximum 300 characters " maxLength="300"/>
              <button id="submitButton" onClick={this.submitPost}>Submit</button>
              <input id="uploadButton" type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
          </div>
        {this.state.postComponents}
      </div>
    )
  }
}

export default Timeline