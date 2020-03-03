import React from 'react';
import InputBox from '../Components/InputBox';
import CardContent from '../Components/CardContent';


class Timeline extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "postComponents": [],
      url: 'http://162.246.157.219:25565/posts/'

    }
    this.getPosts = this.getPosts.bind(this);
    this.getPosts();
  }


  getPosts(){
    let request = new XMLHttpRequest()
    request.open('GET', this.state.url)
    request.send()
    request.onload = () => {
      let posts = JSON.parse(request.response)
      var tempPostList = [] 
      for(let i=0;i<posts.length;i++){
        var eachPost = <CardContent post={posts[i]} />
        tempPostList.push(eachPost)
      }
      this.setState({postComponents: tempPostList})
    }
  }


  render(){
    return(
      <div className="Timeline">
        <InputBox id="InputBox" url={this.state.url}/>
        {this.state.postComponents}
      </div>
    )
  }
}

export default Timeline