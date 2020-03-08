import React from 'react';
import BasicProfile from './Models/Basic_profile';
import './css/Profile.css';
import CardContent from '../Components/CardContent';
import Edit from './Models/Edit';
import axios from 'axios';


class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      Props: props,
      userdata : 'https://cloud-align-server.herokuapp.com/users',
      path: "/Timeline",
      postComponents : [],
      edit: false,
      go_edit: ()=>{
        this.setState({edit:true})
      }
    }
  }

  componentDidMount() {
    this.__isMounted = true;
    this.loadPostData()
  }

  loadPostData(){
    axios.get("https://cloud-align-server.herokuapp.com/author/allPosts/"+this.props.userObject.id)
      .then(response => {
        var tempPostList = []
        for(let i=0; i<response.data.length; i++){
          var eachPost = <CardContent key={response.data[i].id} post={response.data[i]}/>
          tempPostList.push(eachPost)
        }
        this.setState({postComponents: tempPostList})

      })
      .catch(()=>{
        alert("Something went wrong")
      }
      )
  }

  render(){
    if (this.state.edit === false){
      return(
        <div className="Profile" >
          <div id="posts">
            {this.state.postComponents}
          </div>    
        </div>
      )
    }else{ 
      return(
        <div id="B">
          <BasicProfile url={this.state.userdata}/>
          <Edit url={this.state.userdata}/>
        </div>
      )
    }
  }
}
export default Profile
