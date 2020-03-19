
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card } from 'antd';

class CardContent extends React.Component{

    render(){
        return(
            <Card title={this.props.post.title} >
                <img id="cardProfile" alt='profile' align="left" src={require('../Images/github.jpg')} />
                <p>{this.props.post.content}</p>
            </Card>
        )
    }
}

export default CardContent
