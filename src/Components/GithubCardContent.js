
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card } from 'antd';
import ReactMarkdown from "react-markdown";

class CardContent extends React.Component{

    render(){
        const date = new Date(this.props.data.created_at);
        return(
            <Card
                title={
                    <span>
                        {this.props.data.type} at&nbsp;
                        <a href={`https://www.github.com/${this.props.data.repo.name}`}>
                            {this.props.data.repo.name}
                        </a>
                    </span>
                }
                extra={
                    date.toLocaleString()
                }
            >
                <img id="cardProfile" alt='profile' align="left" src={require('../Images/github.jpg')} />
                {
                    this.props.data.type === "PushEvent" ?
                        this.props.data.payload.commits.map(c => <ReactMarkdown source={c.message} key={c.sha}/>)
                    : undefined
                }
            </Card>
        )
    }
}

export default CardContent
