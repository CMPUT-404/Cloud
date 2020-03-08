
import React from 'react';
import 'antd/dist/antd.css';
import './FriendsList.css';
import axios from 'axios';
import { List, Avatar, Button, Skeleton} from 'antd';


class FollowingList extends React.Component {
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
    axios.get(`https://cloud-align-server.herokuapp.com/following/`).then(res => {
      this.setState({
        initLoading : false,
        data: res.data,
        list: this.dataPre(res.data)
      })
    })
  }

  dataPre = (data) => {
    data.forEach((item, i) => {
      item.followingId = item.following.split("/").slice(4)[0];
      item.authorId = item.author.split("/").slice(4)[0];
    });
    return data;
  }

  unfollow =(item) =>{
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    let data = {
      author:item.author,
      following:item.following
    }
    axios.post('https://cloud-align-server.herokuapp.com/following/delete/',data,{headers : headers}).then(res =>{
      this.fetchData();
      console.log(res)}
    )
    
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
                  <Avatar src={require('../../Images/pepe.jpeg')} />
                }
                title={<a href={'/Profile/'+item.followingId}>{item.following}</a>}
              />

            </Skeleton>
            <div >
              <Button onClick={() => this.unfollow(item)}>Unfollow</Button>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default FollowingList
