import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {FormGroup, Label, Input} from 'reactstrap';
import './css/Login.css';

class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      hasAccount: true
    }
  }

  register(){
    this.setState({hasAccount:false});
  }

  
  render(){  
    if(this.state.hasAccount === true){
      return (
        <div>
          <h2>Welcome to Cloud Align</h2>
          <h3>Login</h3>
          <FormGroup className='login-form'>
            <Label>Enter Your Username</Label>
            <Input id='nameInput' type='text' placeholder='Username' value={this.props.username} onChange={this.props.usernameChange}/>
            <Label>Enter Your Password</Label>
            <Input id='passwordInput' type='password' placeholder='Password' value={this.props.password} onChange={this.props.passwordChange}/>
            <Label>Don't have an account? Click on the register button</Label>
            <div className='buttonDiv'>
              <button id='registerButton' onClick={() => this.register()}>Register</button>
              <button id='submitButton' onClick={this.props.handleLogin}>Login</button>
            </div>
          </FormGroup>
        </div>
      )
    }else{
      return(
        <div>
          <h2>Welcome to Cloud Align</h2>
          <h3>Register for an account</h3>
          <FormGroup className='register-form'>
            <Label>Enter Your Username </Label>
            <Input id='nameInput' type='text' placeholder='Username' value={this.props.username} onChange={this.props.usernameChange}/>
            <Label>Enter Your Password</Label>
            <Input id='passwordInput' type='password' placeholder='Password' value={this.props.password} onChange={this.props.passwordChange}/>
            <Label>Enter Your Email</Label>
            <Input id='emailInput' type='text' placeholder='Email' value={this.props.email} onChange={this.props.emailChange}/>
            <Label>Enter the Link to Your Github Account</Label>
            <Input id='githubInput' type='text' placeholder='Github Link' value={this.props.github} onChange={this.props.githubChange}/>
            <button id='newAccountButton' onClick={this.props.register}>Register</button>
          </FormGroup>
        </div>
      )
    }
  }
}
export default Login