
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
                    {this.props.comment.contentType==="text/markdown"?
                        <ReactMarkdown source={this.props.comment.comment}/>
                        :
                        <p>{this.props.comment.comment}</p>
                    }
                </Card>
            </div>
        )
    }
}

export default CommentCard
