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
      username:''
    }
  }

  showFriendrequest =() =>{

    if (this.state.count === 0){
      return 'no friend request so far'
    }
    else{
      return 'You have following friend requests'
    }
      
  }

  fetchData = () => {
    axios.get(`https://cloud-align-server.herokuapp.com/friendrequest/user/`+ this.props.userObject.id)
      
      .then(res => {
        let author = res.data.author.id;
        let requestors = res.data.requests;
        let tempRequests = [];
        for(let i = 0;i<requestors.length;i++){
          let requestorId = requestors[i].id;       
  
          let requestorName = requestors[i].displayName;
          let eachRequest = <CardRequest key={requestorId} onUpdate = {this.fetchData} token={this.props.token} displayName = {requestorName} 
          authorId = {author} requestor = {requestors[i]} requestorId={requestorId}/>
          tempRequests.push(eachRequest);
        }
        this.setState({
          friendRequests: tempRequests,
          count: requestors.length,
        })
      })
  }


  componentDidMount(){
    this.fetchData();  
  }

  addFriend =()=>{
    let data = {    
    }
    axios.post('https://cloud-align-server.herokuapp.com/friendrequest/',data)
      .then(res =>{
        })
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
