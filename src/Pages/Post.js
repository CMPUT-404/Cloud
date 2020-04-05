import React, { Fragment } from 'react';
import {Button, Card, Divider, Input, Modal, Switch, Tag} from 'antd';
import CommentCard from '../Components/CommentCard';
import  { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from "react-markdown";


class Post extends React.Component{

    _isMounted = false
    constructor(props){
        super(props)
        this.state={
            text:null,
            comments:null,
            the_post: null,
            commentComponents: []
        }
        this.loadCommentData = this.loadCommentData.bind(this);
        
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
        axios.post("https://cloud-align-server.herokuapp.com/posts/"+ this.state.the_post.id+'/comments', data,
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

        const id = this.props.match.params.Post;
        this._isMounted = true;


        // if (this.props.location.state !== undefined){
        //
        //     this.setState({the_post: this.props.location.state.post})
        //     if(this.props.location.state.post.comments !== undefined){
        //     this.loadFromLocation()}
        //
        // }else{


        axios.get('https://cloud-align-server.herokuapp.com/posts/' + id + '/', {headers: {Authorization: "Token " + localStorage.getItem("token")}})
            .then(
                (response) => {


                    this.setState({the_post: response.data.post});
                    this.loadCommentData();
                })
            .catch(
                function (err) {
                    alert(err)

                }
            )
    //}
        
    };

    componentWillUnmount(){
        this._isMounted = false
    }

    loadFromLocation = () =>{
        var tempPostList = []
        for (let i = 0 ; i < this.props.location.state.post.comments.length; i++){
            
            var eachPost = <CommentCard key={this.props.location.state.post.comments[i].id} comment={this.props.location.state.post.comments[i]}/>
                tempPostList.push(eachPost)
        }
        this.setState({commentComponents: tempPostList})
    }

    loadCommentData= ()=>{
        var id = this.props.match.params.Post
        
        axios.get(`https://cloud-align-server.herokuapp.com/posts/`+id+`/comments`)
        .then(response => {
            
            var tempPostList = []
            for(let i=0; i<response.data.comments.length; i++){
                var eachPost = <CommentCard key={response.data.comments[i].id} comment={response.data.comments[i]}/>
                tempPostList.push(eachPost)
            }
            
            this.setState({commentComponents: tempPostList})

        })
        .catch((err)=>{
            alert(err)
        })
    }
    
    render(){

    if(this.state.the_post!==null){
    return(
        <div>
            <Card title= {this.state.the_post.title}
                extra={<Link to={'/Profile/'+this.state.the_post.author.displayName}>{this.state.the_post.author.displayName }</Link>}


                >
                Source: {this.state.the_post.source}<br></br><br></br>
                <ReactMarkdown source={this.state.the_post.content} />
                <br/>
                <br/>
                <img alt='' src={this.state.the_post.image} />
            </Card>

            <Card title={<b>Make a comment</b>}>
                <Input.TextArea
                    id='comment'
                    rows={7}
                    placeholder="Make a comment about this post"
                    value={this.state.comment}
                    onChange={(e)=>(this.setState({comment: e.target.value}))}
                />
                <Divider/>
                <Button onClick={this.submit} type={"danger"}>Submit</Button>

                <span style={{float: "right"}}>
                    <Tag color={"magenta"}>Markdown</Tag>
                    <Switch

                        checked={this.state.markdown}
                        onChange={e=>(this.setState({markdown: e}))}
                    />
                </span>
            </Card>

            {this.state.the_post.comments.map(comment => (
                <div>
                    <CommentCard key={comment.id} comment={comment}/>
                </div>
            ))}

        </div>
    )
    }else{
        return(<div></div>)
    }
    }


}



export default Post


