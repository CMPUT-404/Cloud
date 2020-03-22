
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card } from 'antd';
import { Modal} from 'antd';
import { Input } from 'antd';
import  { Link } from 'react-router-dom';
import axios from 'axios';


const { TextArea } = Input;
class CardContent extends React.Component{
    constructor(props){
        super(props)
        let authorID = this.props.post.author.split('/')
        this.state = {   
            ModalText: "display a list of comments",
            visible: false,
            confirmLoading: false,
            authorURL: this.props.post.author,
            authorID: authorID[authorID.length-2],
            token: localStorage.getItem("token"),
            authorObject: {}
          };

        //console.log(this.state.authorURL)
    }

    componentDidMount(){
      axios.get(this.state.authorURL, {headers:{Authorization: "Token " + this.state.token}})
      .then((response)=>{
        this.setState({authorObject: response.data})
        //console.log(this.state.authorObject)
      })

    }

    displayProfile(){
        //Route to profile 
        window.alert("Going to user's profile")
        return <Link to={'/Profile'} >see more</Link>
    }


    addComment = () => {
        this.setState({
          visible: true,
        });
      };

    handleOk = () => {
        this.setState({
          ModalText: 'Posting your comment',
          confirmLoading: true,
        });
        
        var text = document.getElementById("comment").value
        axios.post(`https://cloud-align-server.herokuapp.com/posts/`+ this.props.post.id + `/comments`,{
          "auth": localStorage.getItem("user"),
          "comment": text
        })
        .then(()=>{
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        })
        .catch(()=>{
          alert("You comment did not get uploaded successfully")
        })

      };

    handleCancel = () => {
        this.setState({
          visible: false,
        });
      };


    render(){
        const { visible, confirmLoading, ModalText } = this.state;
        return(
            <div>
                <Card title={this.props.post.title} 
                  extra={ <Link to={  { pathname:'/Timeline/' + this.props.post.id,
                  state:{user: this.props.post.id,
                          text: this.props.post.plainText}}
                  } >
                    see more </Link> }> 

                    <Link to={{ pathname:'/OtherProfile/'+ this.state.authorObject.username,
                      state:{
                        author:this.state.authorObject,
                        token: this.props.token,
                      } }}>{this.props.post.author_data.username}</Link>

                    <Link to={{ pathname:'/OtherProfile/'+ this.state.authorObject.username,
                      state:{
                        author:this.state.authorObject,
                        token: this.props.token,
                      } }}><img id="cardProfile" alt='profile' align="left" src={require('../Images/profile.jpeg')} /></Link>


                    <p>{this.props.post.content}</p>
                    <button onClick={this.addComment}>Add Comment</button>
                    <Modal
                        title={this.props.post.title}
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                        >
                        <TextArea id='comment' rows={7} placeholder="Make a comment about this post"/>
                        <p>{ModalText}</p>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default CardContent
