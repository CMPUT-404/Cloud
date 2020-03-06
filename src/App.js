import React from 'react';
import './App.css';
import FriendsList from './Pages/Friends/FriendsList';
import Following from './Pages/Friends/Following';
import Requests from './Pages/Friends/Requests';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar';
import Timeline from './Pages/Timeline';
import Login from './Pages/Login';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
class App extends React.Component {
  constructor(){
    super()
    this.state={
      isLoggedIn: false,
      username: "",
      password: "",
      github: "",
      email: ""
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.githubChange = this.githubChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleLogin(){
    const auth = 'Basic ' + btoa(this.state.username + ':' + this.state.password)
    axios.get(`https://cloud-align-server.herokuapp.com/users/login`, {headers: {"Authorization": auth}})
      .then(response => {
        if(response.status === 200){
          alert(response.statusText)
          this.setState({isLoggedIn: true})
        }
          return response
        })
        
      .catch(error=>{
        for(let k in error.response.data){
          alert(error.response.data[k])
        }
      })
    }

    register(){
      axios.post(`https://cloud-align-server.herokuapp.com/users/register`,{
        "username": this.state.username,
        "password": this.state.password,
        "email": this.state.email,
        "github": this.state.github
      }, {headers: {"Content-Type": "application/json;charset=UTF-8"}})

      .then(response => {
        this.setState({isLoggedIn:true});
        return response
      })

      .catch(error => {
        for(let k in error.response.data){
          alert(error.response.data[k][0])
        }
      }) 
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
          handleLogin = {this.handleLogin}
          register = {this.register}
          username = {this.state.username}
          password = {this.state.password}
          github = {this.state.github}
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
            <Route path="/profile" component={Profile}/>
            <Route path="/requests" component={Requests}/>
            <Route path="/friendslist" component={FriendsList}/>
            <Route path="/following" component={Following}/>
            <Route exact path="/timeline" component={Timeline}/>
          </Switch>
        </Router>
      );
    }
  }
}
export default App
