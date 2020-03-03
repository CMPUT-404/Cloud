
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
        var request = new XMLHttpRequest()
        request.open('POST',this.props.url)
        // alert(this.props.url)
       
        request.setRequestHeader("Content-Type", "application/json")
        request.setRequestHeader('Authorization', "Basic " + btoa('vanessa:123456'));
        request.onreadystatechange = function () {
            
            if (request.readyState === 4 && request.status === 200) {
                var json = JSON.parse(request.responseText);
                alert(JSON.stringify(json));
            }
        };

        var text = document.getElementById("text").innerHTML

        

        var data = {}
        data["plainText"] = text
        data["title"] = "poster"
        data["author"] = "http://162.246.157.219:25565/users/c36b2919-07ce-4287-b81a-2f305d706530/"
        data["authorization"] = "raversefantasy"
        
        
        


        data = JSON.stringify(data);
       

        request.send(data)

       
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

// Make public?<br></br>
// <input type="radio" name="public" value="yes" id="yes"></input>Yes<br></br>
// <input type="radio" name="public" value="no" id="no"></input>No
          