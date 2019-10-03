import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"

const mapStateToProps = (state) =>{
    return{
        user_id:state.user._id
    }
}
class ConnectedLogin extends Component{
    constructor(){
        super()
        
        this.login = this.login.bind(this)
    }


    login(){
        console.log("Authenticate");
        
    }
    
    render(){
        console.log("Login page");

        if (this.props.user_id) return <Redirect to={"/todolist"}/>

        return( 
            <div>
            <div>This is login page </div>
            <button onClick={this.login}>Log in</button>
            </div>
        
        )
    }
}

const Login = connect(mapStateToProps)(ConnectedLogin)
export default Login