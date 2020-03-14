
import React from 'react';
import 'antd/dist/antd.css';
import { Card, Button,message, Modal} from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios';
const {confirm} = Modal;

class CardRequest extends React.Component{

  constructor(props){
      super(props)
      this.state= {
        authorId: this.props.authorId,
        requestorId:this.props.requestorId,
        requestor: this.props.requestor,
        displayName : this.props.displayName
      }
    }

    accept = () => {

      let data = {
        friend:this.state.requestorId,
        author:this.state.authorId,
        friendstatus:"accept",
        
      }
      axios.post('https://cloud-align-server.herokuapp.com/friend/requestprocess/',data)
        .then(res =>{
          this.props.onUpdate();
          console.log(res);

          this.setState({
            authorId: this.props.authorId,
            requestorId: this.props.requestorId,
            displayName : this.props.displayName
          })
        
        })
        message.success('"'+ this.props.displayName + '" has been successfully accepted!' );
    };

    decline = () => {
      const outer = this;

      let data = {
        friend:this.state.requestorId,
        author:this.state.authorId,
        friendstatus:"decline"
      }

      confirm({
      title: <div>Reject the friend request from  <br /> " {this.props.requestorId} " ?</div>, 
        okText: 'Decline',
        okType: 'danger',
        cancelText: 'Cancel', 
        onOk() {
          axios.post('https://cloud-align-server.herokuapp.com/friend/requestprocess/',data)
            .then(res =>{
              outer.props.onUpdate();
              console.log(res);
              outer.setState({
                authorId: outer.props.authorId,
                requestorId: outer.props.requestorId,
                displayName : outer.props.displayName
              })

            })
         }

      });
    }

    render(){
        
        const {requestor,displayName} = this.state;
        //alert(requestorId);
        return(
            <div>
                <Card title={<Link to={{ pathname:'/OtherProfile/'+ requestor.id,
                      state:{
                        user:requestor,
                        token: this.props.token,
                      } }}>{displayName}</Link>}>
                <Link to={{ pathname:'/OtherProfile/'+ requestor.id,
                  state:{
                    user:requestor,
                    token: this.props.token,
                  }}}>
                  <img id="cardProfile" alt='profile' align="left" src={require('../../Images/profile.jpeg')} />
                </Link>

                <h2> {displayName} {'wants to add you as a friend'}</h2>
                <div style={{float: 'right'}}>
                <Button onClick={this.accept}>accept</Button>
                <Button onClick={this.decline}>decline</Button>
                </div>
                </Card>
            </div>
        )
    }
}

export default CardRequest
