import React from 'react';
import $ from 'jquery';
import auth from '../../routes/auth'

const Signup = React.createClass({
  getInitialState() {
    return {username:'', password:'', repassword:'', errormessage: '', bio:''};
  },
  submitLoginInfo() {  
    event.preventDefault();
    (this.state.password != this.state.repassword) ?
      this.setState({errormessage: 'Passwords does not match. Please re-enter password'})
    :
      $.ajax({
        url: '/api/user',
        dataType: 'json',
        type: 'POST',
        data: {
          username: this.state.username,
          password: this.state.password,
          bio: this.state.bio
        }
      })
  },
  handleChange(eventType, event) {
    this.setState({[eventType]: event.target.value});
  },
  render() {
    return (
      <div>
      SIGN-UP
      <br/>
        Username:
        <input onChange={this.handleChange.bind(this, 'username')} value={this.state.username} type="text"/>
      <br/>
        <p>{this.state.errormessage}</p>
        Password:
        <input onChange={this.handleChange.bind(this, 'password')} value={this.state.password} type="password"/>
        Re-enter Password:
        <input onChange={this.handleChange.bind(this, 'repassword')} value={this.state.repassword} type="password"/>
      <br/>
        Enter personal bio:
        <textarea placeholder="Tell us about yourself here..." onChange={this.handleChange.bind(this, 'bio')}/>
        <button onClick={this.submitLoginInfo}>Submit</button>
      </div>
    )
  }
});

export default Signup;