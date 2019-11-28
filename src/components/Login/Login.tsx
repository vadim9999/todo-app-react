import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Input, Tooltip, Icon, Button, Form, Row, Col,
} from 'antd';
import { authorizate } from '../../actions/user';
// import "./Login.css"


const mapStateToProps = (state:any) => ({
  user_id: state.user._id,
});

const mapDispatchToProps = (dispatch:any) => ({
  authorizate: (data:any) => dispatch(authorizate(data)),

});

interface LoginProps {

}
class ConnectedLogin extends Component<> {
  constructor(props:any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.login = this.login.bind(this);
  }

  login(e:any) {
    e.preventDefault();
    console.log('Authenticate');
    const { email, password } = this.state;
    this.props.authorizate({
      email, password,
    });
    this.setState({
      email: '',
      password: '',

    });
  }

  onHandleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    // console.log("Login page");

    if (this.props.user_id) return <Redirect to="/todolist" />;

    return (

      <div>


        <Row type="flex" justify="center">
          <Col>
            <Form onSubmit={this.login}>
              <Form.Item>
                <Input
                  placeholder="Enter your username"
                  className="input-email"
                  onChange={this.onHandleChange}
                  value={this.state.email}
                  name="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={(
                    <Tooltip title="Extra information">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                          )}
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  name="password"
                  className="input-pass"
                  onChange={this.onHandleChange}
                  value={this.state.password}
                  placeholder="Input password"
                />

              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
              </Form.Item>
            </Form>
          </Col>

        </Row>
      </div>


    );
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);
export default Login;
