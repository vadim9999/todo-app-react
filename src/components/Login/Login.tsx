import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Tooltip, Button, Form, Row, Col, InputProps } from 'antd';
import { authorizate } from '../../actions/user';
// import Example from './Example'
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// const mapStateToProps = (state: any) => ({
//   user_id: state.user._id
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   authorizate: (data: any) => dispatch(authorizate(data))
// });

interface LoginProps {
  user_id: string;
  authorizate: any;
}

interface LoginState {
  email?: string;
  password?: string;
}


const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     email: '',
  //     password: ''
  //   };
  //   this.onHandleChange = this.onHandleChange.bind(this);
  //   this.login = this.login.bind(this);
  // }

  // login(e: any) {
  //   e.preventDefault();
  //   console.log('Authenticate');
  //   const { email, password } = this.state;
  //   this.props.authorizate(
  //     {
  //     email,
  //     password
  //   }
  //   );
  //   this.setState({
  //     email: '',
  //     password: ''
  //   });
  // }

  const onHandleChange: InputProps['onChange'] = (e) => {
    setState((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }

  // if (this.props.user_id) return <Redirect to="/todolist" />;

  return (
    <div >
      <Row justify="center">
        <Col>
          <Form>
            <Form.Item>
              <Input
                placeholder="Enter your email"
                className="input-email"
                onChange={onHandleChange}
                value={state.email}
                name="email"
                prefix={
                  <UserOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                name="password"
                className="input-pass"
                onChange={onHandleChange}
                value={state.password}
                placeholder="Input password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
