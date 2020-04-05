
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import {Card, Button, Tag, Switch, Divider} from 'antd';
import { Modal} from 'antd';
import { Input } from 'antd';
import  { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import CommentCard from "./CommentCard";


const { TextArea } = Input;
class CardContent extends React.Component{
    constructor(props){
        super(props)
        var authID = this.props.post.author.url.split('/')
        var authArray = [] 
        for(let i=0; i<authID.length; i++){
          if(authID[i]!==""){
            authArray.push(authID[i])
          }
        }
        this.state = {   
            ModalText: "display a list of comments",
            visible: false,
            confirmLoading: false,
            authorName: this.props.post.author.displayName,
            authorURL: this.props.post.author.url,
            authorID: authArray[authArray.length-1],
            token: localStorage.getItem("token"),
            authorObject: this.props.post.author
          };
        //console.log(this.state.authorID)
    }

    componentDidMount() {
        const host = new URL(this.props.url).origin;
        console.log(host);
        if (host !== "https://cloud-align-server.herokuapp.com") {
            this.setState({host})
        }
    }

    addHost = () => {
        if (this.state.host) {
            return `?host=${this.state.host}/`
        }
    };

    render(){
        const { visible, confirmLoading, ModalText } = this.state;
        const date = new Date(this.props.post.published);

        return(
            <div>
             
                <Card title={
                    <Link to={'/Timeline/'+this.props.post.id+this.addHost()}>
                        {this.props.post.title}
                    </Link>
                }
                  extra={
                      <div>
                          <Tag color={"geekblue"}>{date.toLocaleString()}</Tag>
                      </div>
                   }
                >

                    <Link to={{ pathname:'/OtherProfile/'+ this.state.authorName,
                      state:{
                        author:this.state.authorObject,
                        token: this.state.token,
                        post: this.props.post,
                      } }}> {this.state.authorObject.displayName} </Link>

                    <Link to={{ pathname:'/OtherProfile/'+ this.state.authorName,
                      state:{
                        author:this.state.authorObject,
                        token: this.state.token,
                        post: this.props.post
                      } }}><img id="cardProfile" alt='profile' align="left" src={require('../Images/profile.jpeg')} /></Link>

                    {this.props.post.contentType==="text/markdown"?
                        <ReactMarkdown source={this.props.post.content} />
                        :
                        <p>{this.props.post.content}</p>
                    }


                    <img alt = '' src={this.props.post.image}/><br/>
                </Card>
            </div>
        )
    }
}

export default CardContent




