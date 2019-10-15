import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {authorizate} from "../../actions/user"
const mapStateToProps = (state) =>{
    return{
        user_id:state.user._id
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        authorizate: (data) => dispatch(authorizate(data)),
   
    }
}
class ConnectedLogin extends Component{
    constructor(){
        super()
        this.state={
            email: "",
            password: ""
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.login = this.login.bind(this)

    }
    login(e){
        e.preventDefault()
        console.log("Authenticate");
        const {email, password} = this.state;
        this.props.authorizate({
            email, password
        })
        this.setState({
            email:"",
            password:"",
            
        })
    }
    onHandleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        // console.log("Login page");

        if (this.props.user_id) return <Redirect to={"/todolist"}/>

        return( 
            
            <div>
            <form onSubmit = {this.login}>
                <input onChange={this.onHandleChange} value={this.state.email} type="email" name="email"></input>
                <input onChange={this.onHandleChange} value={this.state.password} type="password" name="password"></input>
                <button type="submit">Login</button>
            </form>
            </div>
        
        )
    }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin)
export default Login