import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { authorizate } from "../../actions/user"
// import "./Login.css"

import { Input, Tooltip, Icon, Button } from 'antd';

const mapStateToProps = (state) => {
    return {
        user_id: state.user._id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authorizate: (data) => dispatch(authorizate(data)),

    }
}

class ConnectedLogin extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.login = this.login.bind(this)

    }
    login(e) {
        e.preventDefault()
        console.log("Authenticate");
        const { email, password } = this.state;
        this.props.authorizate({
            email, password
        })
        this.setState({
            email: "",
            password: "",

        })
    }
    onHandleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        // console.log("Login page");

        if (this.props.user_id) return <Redirect to={"/todolist"} />

        return (

            <div className="login-block">
                <form className="login-form" onSubmit={this.login}>

                    <Input
                        placeholder="Enter your username"
                        className="input-email"
                        onChange={this.onHandleChange} 
                        value={this.state.email}
                        name = "email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                            <Tooltip title="Extra information">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                    <Input.Password name ="password" className="input-pass" onChange={this.onHandleChange} value={this.state.password} placeholder="input password" />

                   
                  
                    {/* <input  type="password" name="password"></input> */}
                    <Button type="primary" >Login</Button>
                    <button className="btn-login" type="submit">Login</button>
                </form>
            </div>

        )
    }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin)
export default Login