
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card } from 'antd';



class CommentCard extends React.Component{

    render(){
        var author = this.props.comment.author_data.username
        return(
            <div>
                <Card title={author}>
                    <p>{this.props.comment.comment}</p>
                </Card>
            </div>
        )
    }
}

export default CommentCard
