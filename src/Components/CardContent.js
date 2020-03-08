
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card } from 'antd';
import { Modal} from 'antd';
import { Input } from 'antd';
import  { Link } from 'react-router-dom'


const { TextArea } = Input;
class CardContent extends React.Component{
    constructor(props){
        super(props)
        this.state = {   
            ModalText: "display a list of comments",
            visible: false,
            confirmLoading: false,
            //path: '/Timeline/' + props.post.id,

          };
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

    deletePost =() => {
      
    }

    handleOk = () => {
        this.setState({
          ModalText: 'Posting your comment',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };

    handleCancel = () => {
        console.log('Clicked cancel button');
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
                  
                  } >see more</Link> }> 
                    <Link to={'/Profile/'+this.props.post.author}>{this.props.post.author_data.username}</Link>
                    <Link to={'/Profile/'+this.props.post.author}><img id="cardProfile" alt='profile' align="left" src={require('../Images/pepe.jpeg')} /></Link>
                    <p>{this.props.post.content}</p>
                    <button onClick={this.addComment}>Add Comment</button>
                    <button onClick={this.deletePost}>Delete</button>
                    <Modal
                        
                        title={this.props.post.title}
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                       
                        >

                        <TextArea rows={7} placeholder="Make a comment about this post"/>
                        <p>{ModalText}</p>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default CardContent
