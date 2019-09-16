import React, {Component} from "react";
import {connect} from "react-redux"
import { addUser } from "../actions/user"

function mapDispatchToProps(dispatch){
    return {addUser: () => dispatch(addUser)}
}

class ConnectedLogin extends Component{
    constructor(){
        super()

    }

    onSubmit(e){
        e.preventDefault()
        console.log("ddd");
        
    }
    componentDidMount(){
        console.log("This is componentDidMount");
        
    }

    render(){
        return (
            <div>
                
                    <input type="email" name="email" />
                    <input type="password" />
                    <input type="date" name="bday" />
                    <button type="submit" onClick={this.onSubmit}>Save</button>
            </div>
        )
    }
}

const Login = connect(null, mapDispatchToProps)(ConnectedLogin)
export default Login;