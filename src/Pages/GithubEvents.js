import React from 'react';
import GithubCardContent from '../Components/GithubCardContent';
import axios from 'axios';
import {Alert, Typography} from "antd";


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
    let tempPostList = [];
    let githubAccount = localStorage.getItem("github");
    if (githubAccount===""){
      this.setState({Message:  
        " 🌧️ You did not enter the username of your github when you registered an account. If you wish to view your github activities here, go to the Profile page, and add your github username. 🌧️ "})
    }else{
      axios.get(`https://api.github.com/users/`+githubAccount+`/events`)
      .then(response => {
        for(let i=0; i<response.data.length; i++){
          let eachPost = <GithubCardContent data={response.data[i]} key={i}/>;
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
        { this.state.Message && <Alert style={{margin: "15%"}} message={this.state.Message} type="warning" />}
        <Typography.Title style={{marginLeft: "15%"}}>
          My github events
        </Typography.Title>
        {this.state.postComponents}
      </div>
    )
  }
}

export default GithubEvents