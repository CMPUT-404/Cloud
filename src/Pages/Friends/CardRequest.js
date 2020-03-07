
import React from 'react';
import 'antd/dist/antd.css';
import { Card, Button} from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios';

class CardRequest extends React.Component{

  constructor(props){
      super(props)
      this.state= {
        requests : this.props.friendRequest,
        displayName : this.props.displayName
      }
    }

    accept = () => {

      let data = {
        friend:this.state.requests.authorID,
        author:this.state.requests.friendID,
      }
      axios.post('https://cloud-align-server.herokuapp.com/friend/requestprocess/',data)

        .then(res =>{
          console.log(res);
          this.setState({
            requests : this.props.friendRequest,
            displayName : this.props.displayName
          })

          })
    };

    decline = () => {

    }

    render(){
        const {requests,displayName} = this.state;
        return(
            <div>
                <Card title={displayName}>

                <Link to={'/Profile/'+requests.authorID}><img id="cardProfile" alt='profile' align="left" src={require('../../Images/pepe.jpeg')} /></Link>
                <h2> {displayName} {'wants to add you as a friend'}</h2>
                <hr/>
                <Link to={'/Profile/'+requests.authorID}>{requests.authorID}</Link>
                <Button onClick={this.accept}>accept</Button>
                <Button onClick={this.decline}>decline</Button>
                </Card>
            </div>
        )
    }
}

export default CardRequest
