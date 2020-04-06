
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import {Button, Card} from 'antd';
import ReactMarkdown from "react-markdown";



class CommentCard extends React.Component{

    

    render(){
        const author = this.props.comment.author.displayName;
        const date = new Date(this.props.comment.published);
        return(
            <div>
                <Card
                    title={author}
                    style={this.props.style}
                    extra={date.toLocaleString()}
                >
                    {this.props.comment.contentType==="text/plain"?
                        <p>{this.props.comment.comment}</p>
                        :
                        <ReactMarkdown source={this.props.comment.comment}/>
                    }
                </Card>
            </div>
        )
    }
}

export default CommentCard
