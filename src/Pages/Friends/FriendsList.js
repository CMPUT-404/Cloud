
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
    
    loading: false,
    data: [],
    list: [],
    authorURL: localStorage.getItem("url"),
    authorDisplayName: localStorage.getItem("displayName"),
    userID: localStorage.getItem("user"),
    token: localStorage.getItem("token"),
    host: "https://cloud-align-server.herokuapp.com",
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData =() => {
    axios.get('https://cloud-align-server.herokuapp.com/author/' + this.state.userID + '/friends',{headers:{Authorization: "Token "+ this.state.token}}).then(res => {
      let authors = res.data.authors;
      let promises = authors.map(author=>
        axios.get(author)
      );
      let temp = [];
      Promise.all(promises).then(responses=>responses.forEach(
        reponse =>{
          authors.forEach(item=>{
            let itemObject = {'id' : item, 'author' : res.data};
            itemObject.friendURL = reponse.data.url;
            itemObject.friendUsername = reponse.data.username;
            itemObject.friendDisplayName = reponse.data.displayName;
            temp.push(itemObject);       
          })
        }
      )).then(()=>{
        this.setState({
          data: res.data.authors,
          list: temp
        })
      })  
    })
  }

  unfriend =(item) =>{
    const outer = this;
    let data = {
      query: "deletefriend",
      author: {
        id: this.state.authorURL,    
        host: this.state.host,
        displayName: this.state.authorDisplayName,
        url: this.state.authorURL
      },
      friend: {
        id: item.friendURL,  
        host: this.state.host,
        displayName: item.friendDisplayName,
        url: item.friendURL
      }
    }
   
    confirm({
      title: <div>Unfriend  " {item.friendDisplayName} "  ? <br /> </div>,
      okText: 'Unfriend',
      okType: 'danger',
      cancelText: 'Cancel', 
      onOk() {
        axios.post('https://cloud-align-server.herokuapp.com/friendrequest/deletefriend/',data,{headers:{Authorization: "Token "+outer.state.token}}).then(res =>{
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
    const {   list } = this.state;

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
                  <Link to={{ pathname:'/OtherProfile/'+ item.friendUsername,
                    state:{
                      author:item.author,
                      token: this.state.token,
                    }}}>
                    <img id="cardProfile" alt='profile' align="left" src={require('../../Images/profile.jpeg')} />
                  </Link>                
                }
                title={<Link to={{ pathname:'/OtherProfile/'+ item.friendUsername,
                state:{
                  author:item.author,
                  token: this.state.token,
                } }}>{item.friendDisplayName}</Link>}
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
