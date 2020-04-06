import React, { Fragment } from 'react';
import {Button, Card, Divider, Input, Modal, Switch, Tag, Tooltip} from 'antd';
import CommentCard from '../Components/CommentCard';
import  { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import { withRouter } from "react-router";


class Post extends React.Component{

    _isMounted = false;
    constructor(props){
        super(props);
        this.state={
            text:null,
            comments:null,
            the_post: null,
            commentComponents: []
        };
        
    }

    submit = () => {

        const data = {
            "query": "addComment",
            "post": this.state.the_post.source,
            "comment": {
                "author": this.props.userObject,
                "comment": this.state.comment,
                "contentType": this.state.markdown?"text/markdown":"text/plain",
            },
        };



        let url = "https://cloud-align-server.herokuapp.com/posts/"+ this.state.the_post.id+'/comments';

        const host = new URLSearchParams(this.props.location.search).get("host");

        if (host || host!=="https://cloud-align-server.herokuapp.com/") {
            url += `?host=${host}`
        }

        axios.post(url, data,
            {}
        )
            .then(()=>{
                window.location.reload();
            })
            .catch((err)=>{
                alert(err)
            })

    };

    componentDidMount= ()=> {
        const host = new URLSearchParams(this.props.location.search).get("host");
        const id = this.props.match.params.Post;
        this._isMounted = true;


        // if (this.props.location.state !== undefined){
        //
        //     this.setState({the_post: this.props.location.state.post})
        //     if(this.props.location.state.post.comments !== undefined){
        //     this.loadFromLocation()}
        //
        // }else{

        let url = 'https://cloud-align-server.herokuapp.com/posts/' + id + '/';

        if (host && host!=="https://cloud-align-server.herokuapp.com/") {
            url += `?host=${host}`
        }

        axios.get(url, {headers: {Authorization: "Token " + localStorage.getItem("token")}})
            .then(
                (response) => {


                    this.setState({the_post: response.data.post});
                })
            .catch((err) =>{
                    console.error("server responds with "+err+". Using fallback method.");
                    this.setState({the_post: this.props.location.state.post, fallback: true});
                }
            )
    //}
        
    };

    componentWillUnmount(){
        this._isMounted = false
    }

    loadFromLocation = () =>{
        const tempPostList = [];
        for (let i = 0 ; i < this.props.location.state.post.comments.length; i++){

            const eachPost = <CommentCard key={this.props.location.state.post.comments[i].id}
                                          comment={this.props.location.state.post.comments[i]}/>;
            tempPostList.push(eachPost)
        }
        this.setState({commentComponents: tempPostList})
    };

    loadCommentData= ()=>{
        const host = new URLSearchParams(this.props.location.search).get("host");
        const id = this.props.match.params.Post;

        let url = `https://cloud-align-server.herokuapp.com/posts/`+id+`/comments`;

        if (host || host!=="https://cloud-align-server.herokuapp.com/") {
            url += `?host=${host}`
        }

        axios.get(url)
        .then(response => {

            const tempPostList = [];
            for(let i=0; i<response.data.comments.length; i++){
                const eachPost = <CommentCard key={response.data.comments[i].id} comment={response.data.comments[i]}/>;
                tempPostList.push(eachPost)
            }
            
            this.setState({commentComponents: tempPostList})

        })
        .catch((err)=>{
            alert(err)
        })
    };
    
    render(){

    if(this.state.the_post!==null){
    return(
        <div>
            <Card title= {<Tooltip title={`Source: ${this.state.the_post.source}`}>{this.state.the_post.title}</Tooltip>}
                extra={
                    <Link to={{ pathname:'/OtherProfile/'+ this.state.the_post.author.displayName,
                              state:{
                                  author:this.state.the_post.author,
                                  token: this.state.token,
                                  post: this.state.the_post,
                              } }}>
                        {this.state.the_post.author.displayName }
                    </Link>
                }
            >
                <Card.Meta description={`Source: ${this.state.the_post.source}`}/>

                {this.state.the_post.contentType==="text/plain"?
                    <p>{this.state.the_post.content}</p>
                    :
                    <ReactMarkdown source={this.state.the_post.content} />
                }

                <br/>
                <br/>
                <img alt='' src={this.state.the_post.image} />
            </Card>

            {!this.state.fallback &&
                <Card title={<b>Make a comment</b>}>
                    <Input.TextArea
                        id='comment'
                        rows={7}
                        placeholder="Make a comment about this post"
                        value={this.state.comment}
                        onChange={(e) => (this.setState({comment: e.target.value}))}
                    />
                    <Divider/>
                    <Button onClick={this.submit} type={"danger"}>Submit</Button>

                    <span style={{float: "right"}}>
                    <Tag color={"magenta"}>Markdown</Tag>
                    <Switch

                        checked={this.state.markdown}
                        onChange={e => (this.setState({markdown: e}))}
                    />
                </span>
                </Card>
            }

            {this.state.the_post.comments.map(comment => (
                <div key={comment.id}>
                    <CommentCard comment={comment}/>
                </div>
            ))}

        </div>
    )
    }else{
        return(<div></div>)
    }
    }


}



export default withRouter(Post);


