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
        this.loadCommentData();
    }

    componentDidMount(){
        var id = this.props.location.state.user
        this._isMounted = true        
        axios.get('https://cloud-align-server.herokuapp.com/posts/'+id, {headers:{Authorization: "Token "+localStorage.getItem("token")}})
        .then(
            (response) =>{
                this.setState({the_post: response.data})
            })
        .catch(
            function(err){
                alert(err)
            }
        )
    }

    componentWillUnmount(){
        this._isMounted = false
    }


    loadCommentData(){
        var id = this.props.location.state.user
        axios.get(`https://cloud-align-server.herokuapp.com/posts/`+id+`/comments`)
        .then(response => {
            console.log(response)
            var tempPostList = []
            for(let i=0; i<response.data.length; i++){
                var eachPost = <CommentCard key={response.data[i].id} comment={response.data[i]}/>
                tempPostList.push(eachPost)
            }
            this.setState({commentComponents: tempPostList})

        })
        .catch(()=>{
            alert("Something went wrong, please try again")
        })
    }
    
    render(){

    if(this.state.the_post!==null){
    return(
    
        <Fragment>
            <div>
                <Card title= {this.state.the_post.title} 
                    extra={this.state.the_post.author_data.username}
                    > 
                    <Link to={'/Profile/'+this.state.the_post.author}><img alt='profile' align="left" src={require('../Images/profile.jpeg')} /></Link>
                    {this.state.the_post.content}<br></br> 
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


