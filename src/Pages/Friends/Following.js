
import React from 'react';
import 'antd/dist/antd.css';
import './css/Following.css';
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
    authorURL: localStorage.getItem("url"),
    authorDisplayName: localStorage.getItem("displayName"),
    userID: localStorage.getItem("user"), // actual id not url
    token: localStorage.getItem("token"),
    host: "https://cloud-align-server.herokuapp.com",
  };

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData =() => {
    axios.get('https://cloud-align-server.herokuapp.com/author/'+this.state.userID+ '/followers',{headers:{Authorization: "Token "+this.state.token}})
    .then(res => {
      let authors = res.data.authors;
      let promises = authors.map(author => 
        axios.get(author)
      );
      let temp = [];
      Promise.all(promises).then(responses => responses.forEach(
        response => {
          //console.log(response)
          authors.forEach(item => {
            let itemObject = {'id' : item, 'author' : response.data};
            itemObject.followingURL = response.data.url;
            itemObject.followingUsername = response.data.username;
            itemObject.followingDisplayName = response.data.displayName;
            temp.push(itemObject);
          })
        })).then(() => {
          this.setState({
            data: res.data.authors,
            list: temp
          })
        })
    })
  }

  unfollow =(item) =>{
    const outer= this;
    let data = {   
      query: "deletefollow",
      author: {
        id: this.state.authorURL,    
        host: this.state.host,
        displayName: this.state.authorDisplayName,
        url: this.state.authorURL
      },
      friend: {
        id: item.followingURL,  
        host: this.state.host,
        displayName: item.followingDisplayName,
        url: item.followingURL
      }
    }
    confirm({
      title: 'Unfollow   "' + item.followingDisplayName + '" ?' ,
      okText: 'Unfollow',
      okType: 'danger',
      cancelText: 'Cancel', 
      onOk() {
        axios.post('https://cloud-align-server.herokuapp.com/friendrequest/deletefollowing/',data,{headers:{Authorization: "Token "+outer.state.token}}).then(res =>{
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
  
    const {  list } = this.state;
    return (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Link to={{ pathname:'/OtherProfile/'+ item.followingUsername,
                    state:{
                      author:item.author,
                      token: this.state.token,
                    }}}>
                    <img id="cardProfile" alt='profile' align="left" src={require('../../Images/profile.jpeg')} />
                  </Link>                
                }
                title={<Link to={{ pathname:'/OtherProfile/'+ item.followingUsername,
                state:{
                  author:item.author,
                  token: this.state.token,
                } }}>{item.followingDisplayName}</Link>}
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
