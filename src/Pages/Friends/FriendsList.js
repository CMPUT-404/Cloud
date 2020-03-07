
import React from 'react';
import 'antd/dist/antd.css';
import './FriendsList.css';
import axios from 'axios';
import { List, Avatar, Button, Skeleton} from 'antd';


const count = 4;

class FriendsList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
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
      let id = item.friend.split("/").slice(4)[0];
      item.friendId = id;

    });
    return data;
  }


  

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >

        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={require('../../Images/pepe.jpeg')} />
                }
                title={<a href={'/Profile/'+item.friendId}>{item.friend}</a>}
              />

            </Skeleton>
            <div >
              <Button>Remove</Button>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default FriendsList
