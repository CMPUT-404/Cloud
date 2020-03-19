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
      return 'No friend request so far'
    }
    else{
      return 'You have following friend requests'
    }
      
  }

  fetchData = () => {
    axios.get('https://cloud-align-server.herokuapp.com/newfollowing',{headers:{Authorization: "Token "+localStorage.getItem("token")}} )    
      .then(res => {
        
        let tempRequests = [];
        for(let i = 0;i<res.data.length;i++){
          //console.log(res.data[i].status);
          //console.log(res.data[i].receiver);
          //console.log(this.props.userObject.id);
          if (res.data[i].status == null && res.data[i].receiver == this.props.userObject.id){
            console.log('reach');  
            let requestorId = res.data[i].sender.id;  
            console.log(res.data[i].receiver);     
            let requestorName = res.data[i].sender.displayName;
            let eachRequest = <CardRequest key={requestorId} onUpdate = {this.fetchData} token={this.props.token} displayName = {requestorName} 
            requestor = {res.data[i].sender} requestorId={requestorId}/>
            tempRequests.push(eachRequest);
          }
        }
        this.setState({
          friendRequests: tempRequests,
          count: tempRequests.length,
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
