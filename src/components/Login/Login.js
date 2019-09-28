import React, { Component } from "react";
import {Redirect} from "react-router-dom"
class Login extends Component{
    constructor(){
        super()
        this.state={
            redirectToRefferrer: false
        }
        this.login = this.login.bind(this)
    }


    login(){
        console.log("Authenticate");
        this.setState({
            redirectToRefferrer:true
        })
    }
    
    render(){
        console.log("Login page");
        
        let { from } = this.props.location.state || {from:{pathname:"/"}}
        let { redirectToReferrer}  = this.state;

        if (redirectToReferrer) return <Redirect to={from}/>

        return( 
            <div>
            <div>This is login page {from.pathname}</div>
            <button onClick={this.login}>Log in</button>
            </div>
        
        )
    }
}

export default Login