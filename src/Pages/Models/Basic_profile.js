import React from 'react';
import '../css/Basic_profile.css'
import {Button} from 'antd'

class Basic_profile extends React.Component{
    _isMounted = false
    constructor(props){
        super(props)

        var authID = this.props.object.id.split('/')
        var authArray = [] 
        for(let i=0; i<authID.length; i++){
          if(authID[i]!==""){
            authArray.push(authID[i])
          }
        }
        this.state = {
            authorID: authArray[authArray.length-1], //ID of the author of the post 
        } 

    }
    
    componentWillUnmount(){
        //alert(JSON.stringify(this.props.object))
        this._isMounted = false
    }

    componentDidMount(){
        this._isMounted = true
    }

    render(){
        

        return(
            <div id="basicProfile" className="container">                
                <img id="profile_pic" alt='profile' src={require('../../Images/profile.jpeg')} />
                <br/>
                <br/>
                <Button id="edit_button" onClick={this.props.edit}>
                    <span role="img" aria-label="cloud"> ✏️ Edit profile</span>
                </Button>
                <br></br>
                <div id="ProfileDisplay">
                    <b>Username:</b> {this.props.object.username}<br/>
                    <b>Firstname:</b> {this.props.object.firstName}<br/>
                    <b>Lastname:</b> {this.props.object.lastName}<br/>
                    <b>Email:</b> {this.props.object.email}<br/>
                    <b>Github:</b> {this.props.object.github}<br/>
                    <b>Bio:</b> {this.props.object.bio}<br/>
                </div>
            </div>
        )


    }
}



export default Basic_profile