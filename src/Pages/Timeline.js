import React from 'react';
import CardContent from '../Components/CardContent';
import axios from 'axios';
import {Input, Button, Typography, Icon, Divider, Switch, Tag, Card, Select} from 'antd';
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
        visibility: "PUBLIC",
        visibleTo: [],
        authors: [],
    };

    // this.loadPostData = this.loadPostData.bind(this);
    this.submitPost = this.submitPost.bind(this);
    }


    UNSAFE_componentWillMount = ()=>{
        this.loadPostData();
        this.loadAuthors();
    };

    loadAuthors = () => {
        axios.get('https://cloud-align-server.herokuapp.com/author/',
            {headers:{Authorization: "Token "+localStorage.getItem("token")}}).then(response=>{
                this.setState({authors: response.data})
        }).catch((err)=>{
            alert(err)
        })
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
    const visibility = this.state.visibility;

    const imgString = document.getElementById('userImg').src;
    const data = {
        "title":title,
        "content":text,
        "contentType": this.state.markdown?"text/markdown":"text/plain",
        "author_obj": localStorage.getItem("url"),
        "author": localStorage.getItem("url"),
        "visibility": visibility,
        "description": "",
        "visibleTo": this.state.visibleTo.join(","),
        "image": imgString,
    };

    axios.post("https://cloud-align-server.herokuapp.com/posts/",data , {headers:{Authorization: "Token "+this.state.token}})
        .then(()=>{
            window.location.reload()
        }).catch((err)=>{
            alert(err)
        })
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
        const Option = Select.Option;
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

                    <Button type="danger" id="submitButton" onClick={this.submitPost}>Submit</Button>

                    <span style={{float: "right", position: "relative", "top": "4px"}}>
                        {this.state.visibility==="PRIVATE" &&
                            <span>
                                <Tag color={"red"}>Visible To</Tag>
                                <Select
                                    size={"small"}
                                    mode="multiple"
                                    style={{ width: 200 }}
                                    tokenSeparators={[',']}
                                    value={this.state.visibleTo}
                                    onChange={(e)=>(this.setState({visibleTo: e}))}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.state.authors.map(author => (
                                        <Option
                                            key={author.id}
                                            value={author.id.split("/").slice(-2)[0]}
                                        >
                                            {author.displayName}
                                        </Option>
                                    ))}
                                </Select>
                                <Divider type={"vertical"}/>
                            </span>
                        }

                        <Tag color={"orange"}>Visibility</Tag>
                        <Select
                            size={"small"}
                            defaultValue="PUBLIC"
                            value={this.state.visibility}
                            style={{ width: 150 }}
                            onChange={(e)=>(this.setState({visibility: e}))}
                        >
                            <Option value="PUBLIC">Public</Option>
                            <Option value="SERVERONLY">Server Only</Option>
                            <Option value="FOAF">Friends of a Friend</Option>
                            <Option value="FRIENDS">Friends</Option>
                            <Option value="PRIVATE">Private</Option>
                        </Select>
                        <Divider type={"vertical"}/>
                        <Tag color={"magenta"}>Markdown</Tag>
                        <Switch
                            checked={this.state.markdown}
                            onChange={e=>(this.setState({markdown: e}))}
                        />
                    </span>

                </Card>
            </div>


            {this.state.myPostComponents !== -1? this.state.myPostComponents: <p id="loading-message">Loading my posts ...</p>}
            {this.state.otherPostComponents}
        </div>
    )}
}

export default Timeline