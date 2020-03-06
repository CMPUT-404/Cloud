import React from 'react';
import BasicProfile from './Models/Basic_profile';
import './css/Profile.css';
import CardContent from '../Components/CardContent';
import Edit from './Models/Edit';


class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      Props: props,
      userdata : 'https://cloud-align-server.herokuapp.com/users/9e73298f-3ed6-4a02-ae0b-21bc864c0d87/',
      path: "/Timeline",
      postComponents : [],
      edit: false,
      go_edit: ()=>{
        this.setState({edit:true})
      }



    }
  }



  
  loadcomp(){
    let request = new XMLHttpRequest()
    request.open('GET', 'https://cloud-align-server.herokuapp.com/posts/2')



    request.send()
    request.onload = () => {

      if (request.status === 200){
      let posts = JSON.parse(request.response)
      // var tempPostList = [] 
      // alert(JSON.stringify(posts))
      // for(let i=0;i<posts.length;i++){
        
      //   var eachPost = <CardContent post={posts[i]} />
      //   tempPostList.push(eachPost)
      // }
      var temp = <CardContent id={1} post={posts} />
      this.setState({postComponents: temp})
    }else{
      alert("222")
    }
    
  }
}

  render(){ 
    // GET
    // var request = new XMLHttpRequest()
    // request.open('GET','https://cloud-align-server.herokuapp.com/users')
    // request.send()
    // var temp = null
    // request.onload = ()=>{
    //   temp = JSON.parse(request.response)
    //   alert(temp[0].url)
    // }

    //POST 
    // request.open('POST','https://cloud-align-server.herokuapp.com/users/')
    // request.setRequestHeader("Authorization", "Basic " + btoa("admin:123456"));
    // request.setRequestHeader("Content-Type", "application/json")
    // request.onreadystatechange = function () {
    //   alert(request.responseText)
    //   if (request.readyState === 4 && request.status === 200) {
    //       var json = JSON.parse(request.responseText);
    //       alert(JSON.stringify(json));
    //   }
    // };
    // request.send('{"username":"AtestCow","password":"123456"}')

    this.loadcomp()

    if (this.state.edit === false){
     

    let request = new XMLHttpRequest()
    request.open('GET', 'https://cloud-align-server.herokuapp.com/posts/')
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

    return (
      
      
      <div className="Profile" >

        
        <div id="B">
        {/* <BasicProfile edit={this.state.go_edit} url={this.state.userdata} /> */}
        </div>

        

        <div id="posts">
            {this.state.postComponents}
          </div>

        
        

       
        
        
       
       
    
      </div>
    


    )
    }
    else{
      
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
