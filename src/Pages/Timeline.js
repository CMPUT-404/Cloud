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

    var tempPostList = []
    //Fetching github events here 
    // Get github username from local storage later 
    axios.get(`https://api.github.com/users/Vanessa0122/events`)
      .then(response => {
        console.log(response)
        var maxGithubEventsAllowed = 5
        for(let i=0; i<maxGithubEventsAllowed; i++){
          let eachPostJSON = {
            "id": response.data[i].id,
            "title": response.data[i].type,
            "author": "https://cloud-align-server.herokuapp.com/users/" + localStorage.getItem("user") + "/",
            "author_data": {
              "id": localStorage.getItem("user"),
              "username": localStorage.getItem("username")
            },
            "contentType": "text/plain",
            "content": response.data[i].payload.commits[0].message
          }
          let eachPost = <CardContent key={eachPostJSON.id} post={eachPostJSON} token={this.props.token}/>
          tempPostList.push(eachPost)
        }
      })

      .catch(
        alert("Unable to load github event")
      )

    axios.get(this.state.url, {headers:{Authorization: "Token "+this.props.token}})
      .then(response => {
        for(let i=0; i<response.data.length; i++){
          let eachPost = <CardContent key={response.data[i].id} post={response.data[i]} token={this.props.token} />
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
    
    axios.post(this.state.url,{
        "title":title, 
        "content":text, 
        "author": "https://cloud-align-server.herokuapp.com/users/"+this.props.userObject.id+"/",
        "visibilities": true,
        "description": "",
        "visible_to": ""
      }, {headers:{Authorization: "Token "+this.props.token}})
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