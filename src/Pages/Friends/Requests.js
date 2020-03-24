import React from 'react';
import './css/Requests.css';
import CardRequest from './CardRequest';
import 'antd/dist/antd.css';
import { Badge } from 'antd';
import axios from 'axios';


class FriendRequest extends React.Component {
  constructor(props){
    super(props)
    this.state={
      friendRequests : [],
      count: 0,
      data: [],
      list: [],
      authorURL: localStorage.getItem("url"),
      authorDisplayName: localStorage.getItem("displayName"),
      userID: localStorage.getItem("user"), // actual id not url
      token: localStorage.getItem("token"),
      host: "https://cloud-align-server.herokuapp.com",
    }
  }

  showFriendrequest =() =>{
    if (this.state.count === 0){
      return 'No friend request so far'
    }
    else{
      return 'You have following friend requests'
    }   
  }

  fetchData = () => {
    axios.get(this.state.userID +'friendrequests' ,{headers:{Authorization: "Token "+this.state.token}} )    
      .then(res => { 
        let promises = res.data.requests.map(author => axios.get(author,{headers:{Authorization: "Token "+ this.state.token}}));
        //let requests = res.data.requests;
        let tempRequests = [];
        Promise.all(promises).then(responses => responses.forEach(
          response => {
            
              
              let eachRequest = <CardRequest key={response.data.id} onUpdate = {this.fetchData} token={this.state.token} host={this.state.host}
              authorURL = {this.state.authorURL} authorDisplayName ={this.state.authorDisplayName}
              requestor={response.data}/>
              tempRequests.push(eachRequest)
          }
        )).then(() => {
          this.setState({
            friendRequests : tempRequests,
            list: tempRequests,
            count :tempRequests.length
          }) 
        }).catch(err => {
          console.log(err.message);
        })   
      })
  }

  componentDidMount(){
    this.fetchData();  
  }

    render(){
      return (
        <div className="FriendRequest">
          <div id='showMessage'>{this.showFriendrequest()} {<Badge count={this.state.count}/>}</div> 
          
          {this.state.friendRequests}
        </div>
      )
    }
}
export default FriendRequest
