
import React from 'react';
import 'antd/dist/antd.css';
import './FriendsList.css';
import axios from 'axios';
import { List, Avatar, Button, Skeleton} from 'antd';


class FriendsList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData =() => {
    axios.get(`https://cloud-align-server.herokuapp.com/friend/`).then(res => {
      this.setState({
        initLoading : false,
        data: res.data,
        list: this.dataPre(res.data)
      })
    })
  }

  dataPre = (data) => {
    data.forEach((item, i) => {
      //item.friendId = item.friend.split("/").slice(4)[0];
      item.friendId = item.friendID.id;
      item.authorId = item.authorID.id;
    });
    return data;
  }

  unfriend =(item) =>{
    let data = {
      author:item.authorID.id,
      friend:item.friendID.id
    }
    axios.post('https://cloud-align-server.herokuapp.com/friend/delete/',data).then(res =>{
      this.fetchData();
    })
  } 
  
  render() {
    const { initLoading,  list } = this.state;
  

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={require('../../Images/profile.jpeg')} />
                }
                title={<a href={'/Profile/'+item.friendId}>{item.friendID.displayName}</a>}
              />

            </Skeleton>
            <div >
              <Button onClick={() => this.unfriend(item)}>Unfriend</Button>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default FriendsList
