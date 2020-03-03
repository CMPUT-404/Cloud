import React from 'react';
import './App.css';
import FriendsList from './Pages/Friends/FriendsList';
import Following from './Pages/Friends/Following';
import Friends from './Pages/Friends/Friends';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar';
import Timeline from './Pages/Timeline';
import Login from './Pages/Login';
import Register from './Pages/Register';
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
    let request = new XMLHttpRequest()
    request.open('GET', 'http://162.246.157.219:25565/users/login')
    request.setRequestHeader("Authorization", "Basic " + btoa(this.state.username+":"+this.state.password));
    request.send()
    request.onload = () => {
      if (request.status !== 200) { // analyze HTTP status of the response
        alert(request.status)
        return (
          <Login/>
        )
      } else{ // log in 
        var jsonResponse = JSON.parse(request.responseText);
        this.setState({userObject: jsonResponse});
        console.log(this.state.userObject);
        this.setState({isLoggedIn: true});
      }
    };
  }

  register(){
    let request = new XMLHttpRequest();
    request.open('POST', 'http://162.246.157.219:25565/users/register');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");    
    let body = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      github: this.state.github
    }
    request.send(JSON.stringify(body))
    console.log(body)

    request.onload = () => {
      if (request.status === 201){
        var jsonResponse = JSON.parse(request.responseText);
        this.setState({userObject: jsonResponse});
        console.log(this.state.userObject);
        this.setState({isLoggedIn:true});
      }else if (request.status !== 200){
        return(
          <Register/>
        )
      }
    }
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
            <Route path="/friends" component={Friends}/>
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
