
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
        token: this.props.token,
        host: this.props.host,
        requestor: this.props.requestor,
        authorURL: this.props.authorURL,
        authorDisplayName: this.props.authorDisplayName
      }
    }

    accept = () => {
      let data = {
        query: "friendaccept",
        author: {
          id: this.state.authorURL,    
          host: this.state.host,
          displayName: this.state.authorDisplayName,
          url: this.state.authorURL
        },
        friend: {
          id: this.state.requestor.url,  
          host: this.state.host,
          displayName: this.state.requestor.displayName,
          url: this.state.requestor.url
        }     
      }
      axios.post('https://cloud-align-server.herokuapp.com/friendrequest/accept/',data,{headers:{Authorization: "Token "+this.state.token}})
        .then(res =>{
          this.props.onUpdate();
          //console.log(res);
        
        })
        message.success('"'+ this.state.requestor.displayName + '" has been successfully accepted!' );
    };

    decline = () => {
      const outer = this;
      let data = {
        query: "friendreject",
        author: {
          id: this.state.authorURL,    
          host: this.state.host,
          displayName: this.state.authorDisplayName,
          url: this.state.authorURL
        },
        friend: {
          id: this.state.requestor.url,  
          host: this.state.host,
          displayName: this.state.requestor.displayName,
          url: this.state.requestor.url
        }       
      }
      confirm({
      title: <div>Reject the friend request from  <br /> " {this.state.requestor.displayName} " ?</div>, 
        okText: 'Decline',
        okType: 'danger',
        cancelText: 'Cancel', 
        onOk() {
          axios.post('https://cloud-align-server.herokuapp.com/friendrequest/reject/',data,{headers:{Authorization: "Token "+localStorage.getItem("token")}})
            .then(res =>{
              outer.props.onUpdate();
              //console.log(res);

            })
         }

      });
    }

    render(){
        return(
            <div>
              

                <Card title={<Link to={{ pathname:'/OtherProfile/'+ this.state.requestor.requestorUsername,
                      state:{
                        author:this.state.requestor,
                        token: this.state.token,
                      } }}>{this.state.requestor.displayName}</Link>}>
                <Link to={{ pathname:'/OtherProfile/'+ this.state.requestor.requestorUsername,
                  state:{
                    author:this.state.requestor,
                    token: this.state.token,
                  }}}>
                  <img id="cardProfile" alt='profile' align="left" src={require('../../Images/profile.jpeg')} />
                </Link>

                <h2> {this.state.requestor.displayName} {'wants to add you as a friend'}</h2>
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
