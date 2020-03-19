
import React from 'react';
import 'antd/dist/antd.css';
import './FriendsList.css';
import axios from 'axios';
import { List, Button, Skeleton,Modal} from 'antd';
import { Link } from 'react-router-dom'

const { confirm } = Modal;
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
    axios.get('https://cloud-align-server.herokuapp.com/newfollowing/',{headers:{Authorization: "Token "+localStorage.getItem("token")}}).then(res => {
      this.setState({
        initLoading : false,
        data: res.data,
        list: this.dataPre(res.data)
      })
    })
  }

  dataPre = (data) => {
    let processed_data = [];
    data.forEach((item) => {
      if (item.sender.id === this.props.userObject.id){
        item.following = item.receiver;
        item.followingID = item.receiver.id;
        item.displayName = item.receiver.displayName;
        processed_data.push(item);
      }
      
    });
    return processed_data;
  }

  unfollow =(item) =>{
    const outer= this;
    let data = {   
      following:item.followingID
    }
    confirm({
      title: 'Unfollow   "' + item.displayName + '" ?' ,
      okText: 'Unfollow',
      okType: 'danger',
      cancelText: 'Cancel', 
      onOk() {
        axios.post('https://cloud-align-server.herokuapp.com/deletefollowing',data,{headers:{Authorization: "Token "+localStorage.getItem("token")}}).then(res =>{
          outer.fetchData();
          //console.log(res)
        }
        );
        //console.log('OK');
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
    
    
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
                  <Link to={{ pathname:'/OtherProfile/'+ item.followingID,
                    state:{
                      user:item.following,
                      token: this.props.token,
                    }}}>
                    <img id="cardProfile" alt='profile' align="left" src={require('../../Images/profile.jpeg')} />
                  </Link>                
                }
                title={<Link to={{ pathname:'/OtherProfile/'+ item.followingID,
                state:{
                  user:item.following,
                  token: this.props.token,
                } }}>{item.displayName}</Link>}
                description={'bio: '}
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
