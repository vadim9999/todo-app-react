import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, InputProps, FormProps } from 'antd';
// import Example from './Example'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { LOGIN } from '../../redux/constants/action-types';

// const mapStateToProps = (state: any) => ({
//   user_id: state.user._id
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   authorizate: (data: any) => dispatch(authorizate(data))
// });


type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const dispatch = useAppDispatch();

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



  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', state);
    dispatch({ type: LOGIN, payload: { ...state } })
  };

  return (
    <div>
      <Row justify="center">
        <Col>
          <Form onFinish={onFinish}>
            <Form.Item>
              <Input
                placeholder="Enter your email"
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
