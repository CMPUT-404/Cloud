import React from 'react';

class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:null,
            comments:null,
        }
    }
    
    render(){

        return(
            <div>{this.props.location.state.user}<br></br>
            {this.props.location.state.text}</div>
        )
    }


}



export default Post


