import React from 'react';
import CardContent from '../Components/CardContent';
import axios from 'axios';
import { Input } from 'antd';
import {Modal } from 'antd';
import './Timeline.css';

const { TextArea } = Input;




class Timeline extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "postComponents": [],
      url: 'https://cloud-align-server.herokuapp.com/posts/',
      visible: false,
      friends: null,
      postVisible: true,
      showVlist: true,
    


    }
    this.loadPostData = this.loadPostData.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.loadPostData();
  }

  loadPostData(){
    axios.get(this.state.url, {headers:{Authorization: "Token "+this.props.token}})
      .then(response => {
        var tempPostList = []
        for(let i=0; i<response.data.length; i++){
          var eachPost = <CardContent key={response.data[i].id} post={response.data[i]} token={this.props.token} />
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})

      })
      .catch(()=>{
        alert("failed to load posts")
      })
  }

  submitPost = () => {
    
    var title = document.getElementById("title").innerHTML
    var text = document.getElementById("text").innerHTML
    

    
    // alert(this.state.friends[0][1].key)


   
    // alert(document.getElementById(this.state.friends[0][1].key).checked)

    var newvis = ""
    var visibility = true
    if (this.state.showVlist === false){
      visibility = false
      

      for(var i =0 ; i < this.state.friends.length ; i++){
       
        if ((document.getElementById(this.state.friends[i][1].key).checked) === true){
          newvis += this.state.friends[i][1].key +","
        }
      }

      

      



    }
  
  
    
    

    
    axios.post(this.state.url,{
        "title":title, 
        "content":text, 
        "author": "https://cloud-align-server.herokuapp.com/users/"+this.props.userObject.id+"/",
        "visibilities": visibility,
        "description": "",
        "visible_to": newvis,
      }, {headers:{Authorization: "Token "+this.props.token}})
      .then(()=>{
        window.location.reload()
      })
      
      .catch((err)=>{
        alert(err)
      })
    

  }


  

  startPost = () =>{


    axios.get('https://cloud-align-server.herokuapp.com/friend/user/'+this.props.userObject.id)
    .then( res =>{
      // alert(JSON.stringify(res.data.authors,undefined,4))
      var friendlist = []
      for (var i of res.data.authors){
      friendlist.push( [ i.displayName, <input key ={i.id} id={i.id}  type="checkbox"/>,<br/> ])
      }
      
      this.setState({friends: friendlist})
      this.setState({visible: true})
      
    }
      
    )
    
    




  }

  showVisibleList= ()=>{
    if (this.state.showVlist === true){this.setState({showVlist: false})}
    else{this.setState({showVlist: true})}
  }

  

  render(){
    return(

      <div className="Timeline">
        <div id="inputBox">


              
       
                  

              <TextArea id="title" rows={1} placeholder="Title of the Post"/>
              <TextArea id="text" rows={7} placeholder="Maximum 300 characters " maxLength="300"/>
              <button id="submitButton" onClick={this.startPost}>Submit</button>
              <input id="uploadButton" type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
              <Modal
                title={"Who should this Post be Visible to?"}
                visible={this.state.visible}
                onOk={this.submitPost}
                // confirmLoading={confirmLoading}
                // onCancel={this.handleCancel}
                >
               <button onClick={this.showVisibleList}>Post visible to all users? {this.state.showVlist.toString()}</button>
                   
                   
                  <div id="scroll"  >
                    {this.state.friends}
                  
                  </div>
                  
                  



              </Modal>
          </div>
        {this.state.postComponents}
      </div>
    )
  }
}

export default Timeline