import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"

const mapStateToProps = (state) =>{
    return{
        user_id:state.user_id
    }
}
class ConnectedLogin extends Component{
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

        if (redirectToReferrer) return <Redirect to={"/todolist"}/>

        return( 
            <div>
            <div>This is login page {from.pathname}</div>
            <button onClick={this.login}>Log in</button>
            </div>
        
        )
    }
}

const Login = connect(mapStateToProps)(ConnectedLogin)
export default Login