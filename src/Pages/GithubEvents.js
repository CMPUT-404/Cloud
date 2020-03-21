import React from 'react';
import GithubCardContent from '../Components/GithubCardContent';
import axios from 'axios';


class GithubEvents extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "postComponents": []
    }
  }

  componentDidMount() {
    this.loadPostData()
  }


  loadPostData(){
    var tempPostList = []
    //Fetching github events here 
    // Get github username from local storage later 
    //{headers:{"If-Modified-Since": localStorage.getItem("lastModified")}}
    axios.get(`https://api.github.com/users/Vanessa0122/events`)
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

  

  render(){
    return(
      <div>
        {this.state.postComponents}
      </div>
    )
  }
}

export default GithubEvents