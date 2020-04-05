import React from 'react';
import CardContent from '../Components/CardContent';
import axios from 'axios';
import {Input, Button, Typography, Icon, Divider, Switch, Tag, Card} from 'antd';
import {Modal } from 'antd';
import './Timeline.css';


const { TextArea } = Input;

class Timeline extends React.Component {
  
    constructor(props){
    super(props);
    this.state = {
        myPostComponents: -1,
        otherPostComponents: [],
        url: 'https://cloud-align-server.herokuapp.com/posts',
        visible: false,
        author: localStorage.getItem("url"), //https://cloud-align-server.herokuapp.com/author/author_id/
        friends: null,
        friendcomponent: null,
        postVisible: true,
        showVlist: true,
        markdown: false,
        token: localStorage.getItem("token"),
    };

    // this.loadPostData = this.loadPostData.bind(this);
    this.submitPost = this.submitPost.bind(this);
    }


    UNSAFE_componentWillMount = ()=>{
        this.loadPostData()
    };

    loadPostData = ()=>{
        const tempPostList = [];
        //Fetching github events here
    // Get github username from local storage later


        axios.get(
            this.state.url, {
                headers:{Authorization: "Token "+localStorage.getItem("token")}
            }).then(   (response)=>{
                for(let i=0; i<response.data.posts.length; i++){

                    let eachPost = <CardContent url={response.data.posts[i].source} key={i} post={response.data.posts[i]} token={this.state.token} userObject={this.props.userObject}/>
                    tempPostList.push(eachPost)

                }
                this.setState({myPostComponents: tempPostList})
            })
            .catch((err)=>{
                alert(err)
            })
    };
    submitPost = () => {

    const title = this.state.title;
    const text = this.state.text;
    // var newvis = ""
    let visibility = "PUBLIC";
    if (this.state.showVlist === false){
        visibility = "PRIVATE"
    }

    const imgString = document.getElementById('userImg').src;
    const data = {
        "title":title,
        "content":text,
        "contentType": this.state.markdown?"text/markdown":"text/plain",
        "author_obj": localStorage.getItem("url"),
        "author": localStorage.getItem("url"),
        "visibility": visibility,
        "description": "",
        "visibleTo": '',
        "image": imgString,
    };

    axios.post("https://cloud-align-server.herokuapp.com/posts/",data , {headers:{Authorization: "Token "+this.state.token}})
        .then(()=>{
            window.location.reload()
        }).catch((err)=>{
            alert(err)
        })
    };

 


    startPost = () =>{
        this.setState({visible: true})
    };

    showVisibleList= ()=>{
        if (this.state.showVlist === true){this.setState({showVlist: false})}
        else{this.setState({showVlist: true})}
    };

    exitModal = () =>{
        this.setState({visible: false})
    };

    pictureHandler = () => {
        const loader = document.getElementById("uploadButton");
        const file = loader.files[0];
        if (file.size > 5242880) {
          alert("this image is too large");
          loader.value ="";
          return
        }
        const reader = new FileReader();

        const image = document.getElementById('userImg');

        reader.addEventListener("load", function(){
          image.src = reader.result
        },false);

        reader.readAsDataURL(file)
    };


    render(){
    return(
        <div className="Timeline">

            {/* here <img src='' id='test' alt=''/>
            <p id='test2'>eee</p>
            {this.state.myImage} */}
            <Typography.Title style={{marginLeft: "15%"}}>
              TimeLine
            </Typography.Title>

            <div id="inputBox">
                <Typography.Title level={2} style={{color: "deepskyblue"}}>
                    Share your Post
                </Typography.Title>
                <Card
                    title={
                        <Input
                            id="title"
                            placeholder="Title of the Post"
                            addonBefore="Title"
                            value={this.state.title}
                            onChange={(e)=>(this.setState({title: e.target.value}))}/>
                    }
                    style={{marginLeft: 0, marginRight: 0}}
                    extra={
                        <Button>
                            <label style={{position: "relative", "top": "4px"}}>
                                <Icon type="picture" style={{position: "relative", "top": "-4px"}}/> Upload
                                <input id="uploadButton"  accept="image/*" type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
                            </label>
                        </Button>
                    }
                >
                    <div id="wordAndPic">
                        <img id="userImg" alt ='' src="" />
                        <TextArea
                            id="text"
                            rows={7}
                            placeholder="Contents" maxLength="300"
                            value={this.state.text}
                            onChange={(e)=>(this.setState({text: e.target.value}))}
                        />
                    </div>
                    <br/>

                    <Button type="danger" id="submitButton" onClick={this.startPost}>Submit</Button>
                    <span style={{float: "right", position: "relative", "top": "4px"}}>
                        <Tag color={"magenta"}>Markdown</Tag>
                        <Switch
                            checked={this.state.markdown}
                            onChange={e=>(this.setState({markdown: e}))}
                        />
                    </span>

                </Card>

                <Modal
                    title={"Who should this Post be Visible to?"}
                    visible={this.state.visible}
                    onOk={this.submitPost}
                    // confirmLoading={confirmLoading}
                    onCancel={this.exitModal}
                >


                    Post visible to all users ?<br/>
                    <button onClick={this.showVisibleList}>Change Visibility</button>
                    <br/>
                    <div id="scroll"  >
                        {
                            this.state.showVlist ? "Post visible to all, click to change" : "Post private, click to change"
                        }
                    </div>
                </Modal>
            </div>


            {this.state.myPostComponents !== -1? this.state.myPostComponents: <p id="loading-message">Loading my posts ...</p>}
            {this.state.otherPostComponents}
        </div>
    )}
}

export default Timeline