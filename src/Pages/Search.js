import React from 'react';
import 'antd/dist/antd.css';

import axios from 'axios';
import {List, Skeleton, Input, message, Card, Button} from 'antd';
import { Link } from 'react-router-dom'
const {Search} = Input;


class SearchUser extends React.Component {
  
    constructor(props){
        super(props)
        this.state= {

        username: '',
        
        loading: true,
        list: [],
        token: localStorage.getItem("token"),
        host: "https://cloud-align-server.herokuapp.com",
        }
    }
    
    processValue = (value =>{
        if (value.trim() == ""){
            message.warning('Please enter an username!')
        }
        else{
            this.setState({
                username: value,
                loading:false,
            });
            
            this.fetchData(value);
        }
        this.setState({
            list:[]
        })
    
    })

    componentDidMount() {
        this.fetchData();    
    }


    fetchData =(username='') => {
        if(username.trim()!==''){
        axios.get(this.state.host + '/author/search/' +username +'/',{headers:{Authorization: "Token "+ this.state.token}}).then(res => {   
            let temp= [];
            temp.push(res.data)
            this.setState({
                list: temp,       
            })          
        })
        }
    }
    
      
    render() {
    const {   list } = this.state;
    return (    
    <div style={{ textAlign: "center",}}>  
        <div>
        <Search 
            placeholder="input username" 
            onSearch={value => this.processValue(value)} 
            onChange = {()=>this.setState({loading:true})}
            enterButton 
            size="large"
        />
        </div>
        <div>
            {!this.state.loading ?
            <List
            itemLayout="horizontal"
            dataSource={list}
            locale={{ emptyText: "Can't find the user!" }}
            renderItem={item => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                    <Card
                        title={item.displayName}
                        extra={<Link to={{ pathname:'/OtherProfile/'+ item.username,
                            state:{
                                author:item,
                                token: this.state.token,
                            }}}><Button>Follow</Button></Link>}
                        style={{width: "100%", margin: "4em 0 4em 0"}}
                    >
                        <List.Item.Meta
                            avatar={
                                <Link to={{ pathname:'/OtherProfile/'+ item.username,
                                    state:{
                                        author:item,
                                        token: this.state.token,
                                    }}}>
                                    <img id="cardProfile" alt='profile' align="left" src={require('../Images/profile.jpeg')} />
                                </Link>
                            }
                            title={<Link to={{ pathname:'/OtherProfile/'+ item.username,
                                state:{
                                    author:item,
                                    token: this.state.token,
                                } }}>{item.displayName}</Link>}
                            description={item.bio}
                        />
                    </Card>
                </Skeleton>
              </List.Item>
            )}
          />:null}
        </div>
    </div>
    );
    }
}

export default SearchUser
