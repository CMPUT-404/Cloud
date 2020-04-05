
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

   // componentDidMount(){
   //   axios.get(this.state.authorURL)
   //   .then((response)=>{
   //     this.setState({authorObject: response.data})
   //       console.log(this.state.authorObject)
   //   })

   // }

    displayProfile(){
        //Route to profile 
        window.alert("Going to user's profile")
        return <Link to={'/Profile'} >see more</Link>
    }


    addComment = () => {
        this.setState({
          visible: true,
        });
      };

    handleOk = () => {
        this.setState({
          ModalText: 'Posting your comment',
          confirmLoading: true,
        });
        
        var text = document.getElementById("comment").value;

        const data = {
            "query": "addComment",
            "post": this.props.post.source,
            "comment": {
                "author": this.props.userObject,
                "comment": text,
                "contentType": this.state.markdown?"text/markdown":"text/plain",
            },
        };
        axios.post("https://cloud-align-server.herokuapp.com/posts/"+ this.props.post.id+'/comments', data,
        {}
      )
        .then(()=>{
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        })
        .catch((err)=>{
          alert(err)
        })

      };

    handleCancel = () => {
        this.setState({
          visible: false,
        });
      };


    render(){
        const { visible, confirmLoading, ModalText } = this.state;
        const date = new Date(this.props.post.published);
        console.log(this.props.post)
        return(
            <div>
             
                <Card title={
                    <Link to={{ pathname:'/Timeline/' + this.props.post.id,}}>
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
                    {
                    // <Button onClick={this.addComment}>Add Comment</Button>
                    // <Modal
                    //     title={this.props.post.title}
                    //     visible={visible}
                    //     onOk={this.handleOk}
                    //     confirmLoading={confirmLoading}
                    //     onCancel={this.handleCancel}
                    //     >
                    //     <TextArea id='comment' rows={7} placeholder="Make a comment about this post"/>
                    //     <span style={{float: "right"}}>
                    //         <Tag color={"magenta"}>Markdown</Tag>
                    //         <Switch
                    //
                    //             checked={this.state.markdown}
                    //             onChange={e=>(this.setState({markdown: e}))}
                    //         />
                    //     </span>
                    //     {this.props.post.comments.map(comment => (
                    //         <div>
                    //             <Divider/>
                    //             <CommentCard key={comment.id} comment={comment} style={{marginLeft: "0", marginRight: "0"}}/>
                    //         </div>
                    //     ))}
                    // </Modal>
                    }
                </Card>
            </div>
        )
    }
}

export default CardContent




