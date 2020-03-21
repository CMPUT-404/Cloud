
import React from 'react';
import 'antd/dist/antd.css';
import './css/FriendsList.css';
import axios from 'axios';
import { List, Button, Skeleton,Modal,} from 'antd';
import { Link } from 'react-router-dom'
//import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class FriendsList extends React.Component {

  constructor(props){
    super(props)
    this.state= {
      initLoading: true,
    loading: false,
    data: [],
    list: [],
    }
  }

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
      if (item.status === true){
        if(item.sender.id === this.props.userObject.id){
          item.friend = item.receiver;
          item.friendID=item.receiver.id;
          item.displayName=item.receiver.displayName;
          processed_data.push(item);
        }
        else if (item.receiver.id === this.props.userObject.id){
          item.friend= item.sender;
          item.friendID = item.sender.id;
          item.displayName = item.sender.displayName;
          processed_data.push(item);
        }
        
        
      }
      
    });
    return processed_data;
  }

  unfriend =(item) =>{
    const outer = this;
    let data = {
      friend:item.friendID
    }
   
    confirm({
      title: <div>Unfriend  " {item.displayName} "  ? <br /> Unfriend this user will also unfollow the user.</div>,
      okText: 'Unfriend',
      okType: 'danger',
      cancelText: 'Cancel', 
      onOk() {
        axios.post('https://cloud-align-server.herokuapp.com/deletefriend/',data,{headers:{Authorization: "Token "+localStorage.getItem("token")}}).then(res =>{
          outer.fetchData();
        });
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
                  <Link to={{ pathname:'/OtherProfile/'+ item.friendID,
                    state:{
                      user:item.friend,
                      token: this.props.token,
                    }}}>
                    <img id="cardProfile" alt='profile' align="left" src={require('../../Images/profile.jpeg')} />
                  </Link>                
                }
                title={<Link to={{ pathname:'/OtherProfile/'+ item.friendID,
                state:{
                  user:item.friend,
                  token: this.props.token,
                } }}>{item.displayName}</Link>}
                description={'bio: '}
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
