import React from 'react';
import '../css/Basic_profile.css'

import axios from 'axios';
class Basic_profile extends React.Component{
    _isMounted = false

    constructor(props){
        super(props)
        this.state = {
        } 
    }
    
    componentWillUnmount(){
        alert(JSON.stringify(this.props.object))
        this._isMounted = false
    }

    componentDidMount(){
        this._isMounted = true
    }

    addFriend =()=>{
        let data = {
           authorID : 'https://cloud-align-server.herokuapp.com/users/' + this.props.object.id + '/',
           friendID : 'https://cloud-align-server.herokuapp.com/users/' + this.props.object.id + '/',    
        }
        axios.post('https://cloud-align-server.herokuapp.com/friendrequest/',data)
          .then(res =>{
            }).catch(function (error) {
                console.log(error);
            })
      }

    render(){
        

        return(
            <div id="basicProfile" className="container">                
                <img id="profile_pic" alt='profile' src={require('../../Images/profile.jpeg')} />
                <button id="edit_button" onClick={this.props.edit}>
                    <span role="img" aria-label="cloud"> ✏️ Edit </span>
                </button>
                <div id="profiletext">
                    {this.props.object.username}<br></br>
                    {this.props.object.firstName}<br></br>
                    {this.props.object.lastName}<br></br>
                    {this.props.object.email}<br></br>
                    {this.props.object.github}<br></br>
                    {this.props.object.bio}<br></br>
                </div>
            </div>
        )


    }
}



export default Basic_profile