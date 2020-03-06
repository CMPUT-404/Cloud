

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
    // let request = new XMLHttpRequest()
    // request.open('GET', this.props.location.state.user)
    // request.send()
    // request.onload = () => {
    //     let res = JSON.parse(request.response)
        
    //     alert(JSON.stringify(res,null,4))

    // }
    return(
        <div>{this.props.location.state.user}<br></br>
        {this.props.location.state.text}</div>
    )
    }


}



export default Post


