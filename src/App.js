import React from 'react';
import './App.css';
import FriendsList from './Pages/Friends/FriendsList';
import Following from './Pages/Friends/Following';
import Requests from './Pages/Friends/Requests';
import Profile from './Pages/Profile';
import LogOut from './Pages/LogOut';
import NavBar from './Components/NavBar';
import Timeline from './Pages/Timeline';
import Login from './Pages/Login';
import axios from 'axios';
import Post from './Pages/Post';
import GithubEvents from './Pages/GithubEvents';
import OtherProfile from './Pages/OtherProfile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  constructor(){
    super()
    this.state={
      isLoggedIn: false,
      displayName: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      github: "",
      email: "",
      token: localStorage.getItem("token") || "",
      userObject: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.displayNameChange = this.displayNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.githubChange = this.githubChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.register = this.register.bind(this);
  }


  //  THERE"S NO TOKEN AT THIS TIME 
  componentDidMount(){
    axios.get(`https://cloud-align-server.herokuapp.com/author/validate`,{headers:{Authorization: "Token "+this.state.token}})
    .then(response=>{
      localStorage.setItem("user", response.data.user.id)
      this.setState({isLoggedIn: true, userObject: response.data.user})
    })
    .catch(()=>{
      this.setState({isLoggedIn: false})
    })
  }

  handleLogin(){
    axios.post(`https://cloud-align-server.herokuapp.com/author/login`,{
      "username": this.state.username,
      "password": this.state.password
    }, {headers: {"Content-Type": "application/json;charset=UTF-8"}})
      .then(response => {
        //console.log(response)
        if(response.status === 200){
          localStorage.setItem("url", response.data.user.url)
          localStorage.setItem("username", response.data.user.username)
          localStorage.setItem("displayName", response.data.user.displayName)
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("user", response.data.user.id)
          localStorage.setItem("github", response.data.user.github)
          this.setState({token: response.data.token, userObject:response.data.user})
          this.setState({isLoggedIn: true})
        }
          return response
        })
      .catch(error=>{
        alert(error)
        console.log(error)
      })
    }

  register(){
    axios.post(`https://cloud-align-server.herokuapp.com/author/register`,{
      "username": this.state.username,
      "displayName":this.state.displayName,
      "password": this.state.password,
      "email": this.state.email,
      "github": this.state.github
    }, {headers: {"Content-Type": "application/json;charset=UTF-8"}})
    .then(response => {
      //console.log(response)
      if(response.status === 201){
        localStorage.setItem("url", response.data.user.url)
        localStorage.setItem("username", response.data.user.username)
        localStorage.setItem("displayName", response.data.user.displayName)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", response.data.user.id)
        localStorage.setItem("github", response.data.user.github)
        this.setState({token: response.data.token, userObject:response.data.user})
        this.setState({isLoggedIn: true})
      }
        return response
      })
    .catch(error => {
      console.log(error)
    }) 
  }
  
  displayNameChange(e){
    this.setState({displayName: e.target.value})
  }

  firstNameChange(e){
    this.setState({firstName: e.target.value})
  }

  lastNameChange(e){
    this.setState({lastName: e.target.value})
  }

  usernameChange(e){
    this.setState({username: e.target.value})
  }

  passwordChange(e){
    this.setState({password: e.target.value})
  }

  emailChange(e){
    this.setState({email: e.target.value})
  }

  githubChange(e){
    this.setState({github: e.target.value})
  }

  render(){
    if (this.state.isLoggedIn===false){
      return (
        <Login
          firstName = {this.state.firstName}
          lastName = {this.state.lastName}
          username = {this.state.username}
          password = {this.state.password}
          github = {this.state.github}
          displayName = {this.state.displayName}
          handleLogin = {this.handleLogin}
          register = {this.register}
          displayNameChange = {this.displayNameChange}
          firstNameChange = {this.firstNameChange}
          lastNameChange = {this.lastNameChange}
          usernameChange = {this.usernameChange}
          passwordChange = {this.passwordChange}
          githubChange = {this.githubChange}
        />
      )
    } else {
      return(
          <Router>
            <NavBar />
            <Switch>
              <Route path="/Profile" render={
                (props)=>(
                <Profile token={this.state.token} userObject={this.state.userObject} {...props}/>)
                }/>
              <Route path="/requests" render={
                (props)=>(
                <Requests token={this.state.token} userObject={this.state.userObject} {...props}/>)
                }/>/>
              <Route path="/friendslist" render={
                (props)=>(
                <FriendsList token={this.state.token} userObject={this.state.userObject} {...props}/>)
                }/>/>
              <Route path="/following" render={
                (props)=>(
                <Following token={this.state.token} userObject={this.state.userObject} {...props}/>)
                }/>/>

              <Route path="/Timeline/:Post" render={
                (props)=>(
                <Post token={this.state.token} userObject={this.state.userObject} {...props}/>)
                }/>/>
              <Route path ="/Timeline" component={Timeline}/>
              <Route path ="/GithubEvents" component={GithubEvents}/>
              <Route path ="/OtherProfile/:OtherProfile" component={OtherProfile}/>
              <Route path ="/LogOut" component={LogOut}/>
            </Switch>
          </Router>
      );
    }
  }
}
export default App