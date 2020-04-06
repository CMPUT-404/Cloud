
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import {Card, Button, Tag, Switch, Divider, Tooltip} from 'antd';
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
        if (this.props.url) {
            const host = new URL(this.props.url).origin;
            if (host !== "https://cloud-align-server.herokuapp.com") {
                this.setState({host})
            }
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
        const host = new URL(this.props.post.source).host;
        const seed = [...host].map((char, index)=>(host.codePointAt(index))).reduce((a,b) => a + b, 0);
        const hostColor = genColor(seed);

        return(
            <div>
             
                <Card title={
                    <Link to={{
                        pathname: '/Timeline/'+this.props.post.id,
                        search: this.addHost(),
                        state: { post: this.props.post, token: this.state.token, }
                    }}>
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
                      } }}><img id="cardProfile" alt='profile' align="left" src={require('../Images/profile.jpeg')} /></Link><br/>

                    <Tooltip title={`Source: ${this.props.post.source}`}>
                        <span style={{color: hostColor.bg}}>
                            {host}
                        </span>
                    </Tooltip>

                    {this.props.post.contentType==="text/plain"?
                        <p>{this.props.post.content}</p>
                        :
                        <ReactMarkdown source={this.props.post.content} />
                    }


                    <img alt = '' src={this.props.post.image}/><br/>
                </Card>
            </div>
        )
    }
}

// reference: https://stackoverflow.com/questions/8132081/generate-a-random-seeded-hex-color
// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

function genColor (seed) {
    let color = Math.floor((Math.abs(Math.sin(seed) * 16777215)) % 16777215).toString(16);
    // pad any colors shorter than 6 characters with leading 0s
    while(color.length < 6) {
        color = '0' + color;
    }

    return {bg: "#"+color, fg: chooseFontColor(color, "#FFFFFF", "#000000")};
}

function chooseFontColor(bgColor, lightColor, darkColor) {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        darkColor : lightColor;
}

export default CardContent




