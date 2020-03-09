import React from 'react';
import CardRequest from './CardRequest';
import 'antd/dist/antd.css';
import { Badge,Button } from 'antd';
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

  fetchData = () => {
    axios.get(`https://cloud-align-server.herokuapp.com/friendrequest/`)
      .then(res => {
        let requests = res.data;
        let tempRequests = [];
        for(let i = 0;i<requests.length;i++){
          let authorId = requests[i].authorID.id;
          let friendId = requests[i].friendID.id;
          let auid =  requests[i].authorID.id.split("/").slice(4)[0];
          let frid =  requests[i].authorID.id.split("/").slice(4)[0];
  
          let friendName = requests[i].authorID.displayName;

          let eachRequest = <CardRequest key={friendId} onUpdate = {this.fetchData} displayName = {friendName} 
          authorId = {authorId} friendId = {friendId} friendRequest={requests[i]} auid={auid} frid={frid}/>
          tempRequests.push(eachRequest);
        }
        this.setState({
          friendRequests: tempRequests,
          count: requests.length,
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
          <h2> Pending Friend Requests {<Badge count={this.state.count} />}</h2>
          <Button onClick = {this.addFriend}>add a friend</Button>

          {this.state.friendRequests}
        </div>
      )
    }
}
export default FriendRequest
