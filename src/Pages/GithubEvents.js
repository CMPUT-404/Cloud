import React from 'react';
import GithubCardContent from '../Components/GithubCardContent';
import axios from 'axios';


class GithubEvents extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "Message": "",
      "postComponents": []
    }
  }

  componentDidMount() {
    this.loadPostData()
  }


  loadPostData(){
    var tempPostList = []
    var githubAccount = localStorage.getItem("github")
    if (githubAccount===""){
      this.setState({Message:  
        " 🌧️ You did not enter the username of your github when you registered an account. If you wish to view your github activities here, go to the Profile page, and add your github username. 🌧️ "})
    }else{
      axios.get(`https://api.github.com/users/`+githubAccount+`/events`)
      .then(response => {
        var content = ""
        for(let i=0; i<response.data.length; i++){
          if(response.data[i].type==="PushEvent"){
            content =  response.data[i].payload.commits[0].message
          }else{
            content = "No commit message available because it was a " + response.data[i].type 
          }

          let eachPostJSON = {
            "id": response.data[i].id,
            "title": response.data[i].type,
            "author": "https://cloud-align-server.herokuapp.com/author/" + localStorage.getItem("user") + "/",
            "author_data": {
              "id": localStorage.getItem("user"),
              "username": localStorage.getItem("username")
            },
            "contentType": "text/plain",
            "content": content
          }
          let eachPost = <GithubCardContent key={eachPostJSON.id} post={eachPostJSON} />
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})
      })

      .catch((err)=>{
        console.log(err)
      })
    }

  }

  

  render(){
    return(
      <div>
        <h4>{this.state.Message}</h4>
        {this.state.postComponents}
      </div>
    )
  }
}

export default GithubEvents