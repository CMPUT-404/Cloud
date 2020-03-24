import React from 'react';
import '../css/Basic_profile.css'

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