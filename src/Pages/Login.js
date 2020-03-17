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
          <h2>Welcome to Cloud Align 
            <span role="img" aria-label="cloud"> ⛅️</span>
          </h2>
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
          <h2>Welcome to Cloud Align
            <span role="img" aria-label="cloud"> ⛅️</span>
          </h2>
          <h3>Register for an account
            <span role="img" aria-label="cloud"> ⛅️</span>
          </h3>
          <FormGroup className='register-form'>
            <Label> Username (used to login to your account) </Label>
            <Input id='nameInput' type='text' placeholder='Username' value={this.props.username} onChange={this.props.usernameChange}/>
            <Label> Password </Label>
            <Input id='passwordInput' type='password' placeholder='Password' value={this.props.password} onChange={this.props.passwordChange}/>
            <Label> First Name </Label>
            <Input id='firstnameInput' type='text' placeholder='First Name' value={this.props.firstName} onChange={this.props.firstNameChange}/>
            <Label> Last Name </Label>
            <Input id='lastnameInput' type='text' placeholder='Last Name' value={this.props.lastName} onChange={this.props.lastNameChange}/>
            <Label> Display Name </Label>
            <Input id='displaynameInput' type='text' placeholder='Display Name' value={this.props.displayName} onChange={this.props.displayNameChange}></Input>
            <Label> Email </Label>
            <Input id='emailInput' type='text' placeholder='Email' value={this.props.email} onChange={this.props.emailChange}/>
            <Label> Github Username </Label>
            <Input id='githubInput' type='text' placeholder='Github Username' value={this.props.github} onChange={this.props.githubChange}/>
            <button id='newAccountButton' onClick={this.props.register}>Register</button>
          </FormGroup>
        </div>
      )
    }
  }
}
export default Login