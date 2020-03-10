import React from 'react';
import '../css/Basic_profile.css'
import { Button } from 'antd';
import axios from 'axios';
class Basic_profile extends React.Component{
    _isMounted = false

    constructor(props){
        super(props)
        this.state = {
        } 
    }
    

    componentWillUnmount(){
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
                <img className="smallimg" alt='profile' id="edit_button" onClick={this.props.edit} src={require('../../Images/edit.jpeg')} />
                <img className="smallimg" alt='profile' id="view_profile" src={require('../../Images/view.jpeg')}/>
                <div id="profiletext">
                {this.props.object.username}<br></br>
                {this.props.object.email}<br></br>
                {this.props.object.bio}<br></br>
                {this.props.object.github}
                {/* <Button onClick = {this.addFriend}>add a friend</Button> */}
                </div>
            </div>
        )


    }
}



export default Basic_profile