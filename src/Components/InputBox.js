import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './InputBox.css';
const { TextArea } = Input;
class InputBox extends React.Component{
    constructor(){
        super()
        this.submitPost = this.submitPost.bind(this)
        this.state ={
            visible :false,
        }
    }
    submitPost(){
        //const axios = require('axios')
        // axios.post('https://cloud-align-server.herokuapp.com/author/posts/',{
        //     "username": 
        // }).then(
        //     (response) =>{
        //     }
        // ).catch(
        //     function(err){
        //         alert(err)
        //     }
        // )
    }
    pictureHandler = event => {
        console.log(event)
    }
    preSubmit = () =>{
        this.setState({visible: true,})
    }
    render(){
        return(
            <div id="inputBox">
                <TextArea id="text" rows={7} placeholder="What's on your mind..."/>
                <button id="submitButton" onClick={this.submitPost}>Submit</button>
                <input id="uploadButton" type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
                {/* <Modal
                     visible={this.state.visible}>
                </Modal> */}
            </div>
        )
    }
}
export default InputBox