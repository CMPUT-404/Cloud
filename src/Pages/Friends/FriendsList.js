
import React from 'react';
import 'antd/dist/antd.css';
import './FriendsList.css';
import axios from 'axios';
import { List, Button, Skeleton} from 'antd';
import { Link } from 'react-router-dom'


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
    axios.get('https://cloud-align-server.herokuapp.com/friend/user/'+this.props.userObject.id).then(res => {
      //console.log(res.data);
      this.setState({
        initLoading : false,
        data: res.data,
        authorId : res.data.author.id,
        list: this.dataPre(res.data.authors)
      })
    })
  }


  dataPre = (data) => {
    data.forEach((item) => {
      item.authorID = item.author;
    });
    return data;
  }

  unfriend =(item) =>{
    let data = {
      author:this.state.authorId,
      friend:item.id
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
                  <Link to={{ pathname:'/OtherProfile/'+ item.id,
                    state:{
                      user:item,
                      token: this.props.token,
                    }}}>
                    <img id="cardProfile" alt='profile' align="left" src={require('../../Images/profile.jpeg')} />
                  </Link>                
                }
                title={<Link to={{ pathname:'/OtherProfile/'+ item.id,
                state:{
                  user:item,
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
