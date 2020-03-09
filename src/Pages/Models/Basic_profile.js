import React from 'react';
import '../css/Basic_profile.css'


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

    

    render(){
        

        return(
            <div className="container">
                <img id="profile_pic" alt='profile' src={require('../../Images/pepe.jpeg')} />
                <img className="smallimg" id="edit_button" onClick={this.props.edit} src={require('../../Images/edit.jpeg')} />
                <img className="smallimg" id="view_profile" src={require('../../Images/view.jpeg')}/>
                <div id="profiletext">
                {this.props.object.username}<br></br>
                {this.props.object.email}<br></br>
                {this.props.object.bio}<br></br>
                {this.props.object.github}
                </div>
            </div>
        )


    }
}



export default Basic_profile