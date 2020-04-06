
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import {Card, Button, Tag, Switch, Divider, Icon} from 'antd';
import { Modal} from 'antd';
import { Input } from 'antd';
import  { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';


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

    deletePost =() => {
        alert("🌬 Deleting your post.....");
        axios.delete("https://cloud-align-server.herokuapp.com/posts/"+this.props.post.id, {headers:{Authorization: "Token "+this.state.token}})
            .then(()=>{
                window.location.reload()
            })

    };

    editPost = () =>{
        this.setState({editVisible:true})
    };

    save_edit = () =>{
        if (!this.state.title && !this.state.text) {
            this.setState({editVisible:false});
            return
        }


        axios.patch("https://cloud-align-server.herokuapp.com/posts/"+this.props.post.id+"/",
            {content:this.state.text,
                title:this.state.title}, {headers:{
                    "Authorization":"Token "+ this.state.token,
                }
            })
            .then(()=>{
                window.location.reload()
            }).catch(function(err){
            alert(err)
        })
    };


    render(){
        const { visible, confirmLoading, ModalText } = this.state;
        const date = new Date(this.props.post.published);
        return(
            <div>
             
                <Card title={
                    <Link to={'/Timeline/' + this.props.post.id}>
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

                    <img alt = '' src={this.props.post.image}/>
                    <Divider/>
                    <Button type={"primary"} ghost onClick={this.editPost}>Edit Post</Button>
                    <Button type={"danger"} ghost style={{float: "right"}} onClick={this.deletePost}>Delete</Button>
                </Card>
                <Modal title={this.props.post.title}
                       visible={this.state.editVisible}
                       onOk ={this.save_edit}
                       onCancel={() =>(this.setState({editVisible:false}))}
                >
                    <Card
                        title={
                            <Input
                                id="title"
                                placeholder="Title of the Post"
                                addonBefore="Title"
                                value={this.state.title}
                                onChange={(e)=>(this.setState({title: e.target.value}))}/>
                        }
                        style={{marginLeft: 0, marginRight: 0}}
                    >
                        <TextArea
                            id="text"
                            rows={7}
                            placeholder="Contents" maxLength="300"
                            value={this.state.text}
                            onChange={(e)=>(this.setState({text: e.target.value}))}
                        />
                    </Card>
                </Modal>
            </div>
        )
    }
}

export default CardContent




