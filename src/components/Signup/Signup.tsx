import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addUser } from '../../actions/user';
import { getTasks } from '../../actions/index';

import './Signup.css';

function mapDispatchToProps(dispatch) {
  return {
    addUser: data => dispatch(addUser(data)),
    getTasks: login_id => dispatch(getTasks(login_id))
  };
}

const mapStateToProps = state => ({
  user_id: state.user._id
});
class ConnectedLogin extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      redirect: false
    };
    // this.onHandleChangePassword = this.onHandleChangePassword.bind(this)
    // this.onHandleChangeName = this.onHandleChangeName.bind(this)
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, password } = this.state;
    console.log('ddd');
    // this.props.getTasks("5d7e4f0d4048013bee00a823")
    this.props.addUser({
      name,
      email,
      password
    });

    if (this.props.user_id != undefined) {
      this.setState({
        redirect: true
      });
    }
    // console.log(cookies.get('myCat'));
  }

  componentDidMount() {
    console.log('This is componentDidMount');
  }

  onHandleChange(e) {
    console.log(e.target.name);

    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // onHandleChangeEmail(e) {
  //     this.setState({
  //         email: e.target.value
  //     })
  //     // console.log(this.state.email)
  //     // this.onSubmit()
  // }

  render() {
    console.log('This is SignUp');

    console.log(this.state.email);
    const { name, email, password, redirect } = this.state;
    if (redirect || this.props.user_id != undefined)
      return <Redirect to="/todolist" />;
    return (
      <div className="signup-block">
        <form className="signup-form" onSubmit={this.onSubmit}>
          <label>Name:</label>
          <input
            onChange={this.onHandleChange}
            value={name}
            type="text"
            name="name"
          />
          <label>Email:</label>
          <input
            onChange={this.onHandleChange}
            value={email}
            type="email"
            name="email"
          />
          <label>Password:</label>
          <input
            onChange={this.onHandleChange}
            value={password}
            type="password"
            name="password"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);
export default Login;
