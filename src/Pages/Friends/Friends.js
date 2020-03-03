import React from 'react';
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


  componentWillMount(){
    axios.get(`http://127.0.0.1:8000/friendrequest/`)
      .then(res => {
        let requests = res.data;
        let tempRequests = [];
        for(let i = 0;i<requests.length;i++){
          let authorId = requests[i].authorID.split("/").slice(4)[0];
          //this.fetchUsername(authorId);
          let eachRequest = <CardRequest displayName = {authorId} friendRequest={requests[i]} />
          tempRequests.push(eachRequest);
        }
        this.setState({
          friendRequests: tempRequests,
          count: requests.length,
        })
      })
    }

    render(){
      return (
        <div className="FriendRequest">
          <h2> Pending Friend Requests {<Badge count={this.state.count} />}</h2>

          {this.state.friendRequests}
        </div>
      )
    }
}
export default FriendRequest
