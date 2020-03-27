import React, { Fragment } from 'react';
import {Card} from 'antd';
import CommentCard from '../Components/CommentCard';
import  { Link } from 'react-router-dom';
import axios from 'axios';


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

    componentDidMount= ()=>{
   
        var id = this.props.match.params.Post
        this._isMounted = true    
        
   
        
        if (this.props.location.state !== undefined){

            this.setState({the_post: this.props.location.state.post})
            
        }else{
        

        axios.get('https://cloud-align-server.herokuapp.com/posts/'+id+'/', {headers:{Authorization: "Token "+localStorage.getItem("token")}})
        .then(
            (response) =>{
               
             
                this.setState({the_post: response.data.post})
                this.loadCommentData();
            })
        .catch(
            function(err){
                alert(err)
                
            }
        )
        }
        
    }

    componentWillUnmount(){
        this._isMounted = false
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
    
        <Fragment>
            <div>
                <Card title= {this.state.the_post.title} 
                    extra={this.state.the_post.author.displayName }

                    
                    > 
                    Source: {this.state.the_post.source}<br></br><br></br>
                    <Link to={'/Profile/'+this.state.the_post.author.displayName}><img alt='profile' align="left" src={require('../Images/profile.jpeg')} /></Link>
                    {this.state.the_post.content}<br></br> 
                    <img alt='' src={this.state.the_post.image} />
                </Card>
                
            
                {this.state.commentComponents}
            </div>


        </Fragment>
    )
    }else{
        return(<div></div>)
    }
    }


}



export default Post


