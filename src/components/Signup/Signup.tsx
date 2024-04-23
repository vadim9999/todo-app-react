import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { addUser } from '../../actions/user';
import { getTasks } from '../../actions/index';

import { Button, Col, Form, Input, InputProps, Row } from 'antd';

// function mapDispatchToProps(dispatch) {
//   return {
//     addUser: data => dispatch(addUser(data)),
//     getTasks: login_id => dispatch(getTasks(login_id))
//   };
// }

// const mapStateToProps = state => ({
//   user_id: state.user._id
// });

const Signup = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  // onSubmit(e) {
  //   e.preventDefault();
  //   const { name, email, password } = this.state;
  //   console.log('ddd');
  //   // this.props.getTasks("5d7e4f0d4048013bee00a823")
  //   this.props.addUser({
  //     name,
  //     email,
  //     password
  //   });

  //   if (this.props.user_id != undefined) {
  //     this.setState({
  //       redirect: true
  //     });
  //   }
  //   // console.log(cookies.get('myCat'));
  // }

  // onHandleChange(e) {
  //   console.log(e.target.name);

  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }
  // onHandleChangeEmail(e) {
  //     this.setState({
  //         email: e.target.value
  //     })
  //     // console.log(this.state.email)
  //     // this.onSubmit()
  // }

  // const { name, email, password, redirect } = this.state;

  // if (redirect || this.props.user_id != undefined)
  //   return <Redirect to="/todolist" />;


  const onHandleChange: InputProps['onChange'] = (e) => {
    setState((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
      <Row justify="center">
        <Col>
          <Form>
            <Form.Item>
              <Input
                placeholder="Enter your name"
                onChange={onHandleChange}
                value={state.email}
                name="name"
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Enter your email"
                onChange={onHandleChange}
                value={state.email}
                name="email"
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                name="password"
                onChange={onHandleChange}
                value={state.password}
                placeholder="Input password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Signup;
