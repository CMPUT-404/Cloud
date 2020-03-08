import React from 'react';
import {Card} from 'antd';
import  { Link } from 'react-router-dom';


class Post extends React.Component{

    _isMounted = false
    constructor(props){
        super(props)
        this.state={
            text:null,
            comments:null,
            the_post: null,
        }
    }

    componentDidMount(){

        this._isMounted = true
        var id = this.props.location.state.user
       

        
        const axios = require('axios')
        axios.get('https://cloud-align-server.herokuapp.com/posts/'+id).then(
            (response) =>{
            
                
                this.setState({the_post: response.data})
                
            }
        
        ).catch(
            function(err){
                alert(err)
            }
        )


    }

    componentWillUnmount(){
        this._isMounted = false
    }

   
    
    render(){

    // this.componentDidMount(this.props.location.state.user)
   

  
    // let request = new XMLHttpRequest()
    // request.open('GET', this.props.location.state.user)
    // request.send()
    // request.onload = () => {
    //     let res = JSON.parse(request.response)
        
    //     alert(JSON.stringify(res,null,4))

    // }
    if(this.state.the_post!==null){
    return(

    
    <div>
        <Card title= {this.state.the_post.title} 
        extra={this.state.the_post.author_data.username}
        > 
        <Link to={'/Profile/'+this.state.the_post.author}><img alt='profile' align="left" src={require('../Images/pepe.jpeg')} /></Link>
        {this.state.the_post.content}<br></br>
        
        </Card>
       
        </div>
  
    )
    }
    else{
        return(<div></div>)
    }
    }


}



export default Post


