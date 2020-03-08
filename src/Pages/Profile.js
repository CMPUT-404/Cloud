import React from 'react';
import BasicProfile from './Models/Basic_profile';
import './css/Profile.css';
import CardContent from '../Components/CardContent';
import Edit from './Models/Edit';


class Profile extends React.Component {

  _isMounted = false

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
    // this._isMounted = true
    this.loadcomp()
  }



  
  loadcomp(){


    alert(this.props.userObject.id)
    

    const axios = require('axios')
        axios.get('https://cloud-align-server.herokuapp.com/author/allPosts/' + this.props.userObject.id).then(
            (response) =>{
            
                this.setState({my_posts: response.data})
                
                
            }
        
        ).catch(
            function(err){
                alert(err)
            }
        )

    
   
  
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

    

    if (this.state.edit === false){
     
    console.log(this.props.userObject)

    return (
      
      
      <div className="Profile" >

        {/* <h1>{this.props.token}</h1> */}
        <h1>{JSON.stringify(this.props.userObject)}</h1>
        <div id="B">
        {/* <BasicProfile edit={this.state.go_edit} url={this.state.userdata} /> */}
        </div>

        

        <div id="posts">

       {/* { objects.map( function(this.state.my_posts){
        return 8
    })
    
    } */}

        {JSON.stringify(this.state.my_posts)}
        {/* {this.state.postComponents.post && <CardContent id={this.state.postComponents.id} post={this.state.postComponents.post} />} */}
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
