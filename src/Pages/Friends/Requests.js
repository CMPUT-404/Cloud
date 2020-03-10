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
    axios.get(`https://cloud-align-server.herokuapp.com/friendrequest/user/`+ this.props.userObject.id)
      
      .then(res => {
        let author = res.data.author;
        var auid =  author.id.split("/").slice(4)[0];
        console.log(res.data)
        let requestors = res.data.requests;
        console.log(requestors)
        let tempRequests = [];
        for(let i = 0;i<requestors.length;i++){
          let friendId = requestors[i].requests;       
          let frid =  requestors[i].id.split("/").slice(4)[0];
  
          let friendName = requestors[i].displayName;
          console.log(friendName,friendId)
          let eachRequest = <CardRequest key={friendId} onUpdate = {this.fetchData} displayName = {friendName} 
          authorId = {author.id} friendId = {friendId} friendRequest={requestors[i]} auid={auid} frid={frid}/>
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
          <h2> Pending Friend Requests {<Badge count={this.state.count} />}</h2>
          <Button onClick = {this.addFriend}>add a friend</Button>

          {this.state.friendRequests}
        </div>
      )
    }
}
export default FriendRequest
