import React, {Component} from "react";
import {connect} from "react-redux"
import { addUser } from "../actions/user"
import {getTasks} from "../actions/index"
function mapDispatchToProps(dispatch){
    return {
        addUser: () => dispatch(addUser()),
        getTasks: (login_id) => dispatch(getTasks(login_id))
    }
}

class ConnectedLogin extends Component{
    constructor(){
        super()
        this.state ={
            email: ""
        }
        this.onHandleChange = this.onHandleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        e.preventDefault()
        console.log("ddd");
        this.props.getTasks("5d7e4f0d4048013bee00a823")
    }

    componentDidMount(){
        console.log("This is componentDidMount");
        
    }

    onHandleChange(e){
        this.setState({
            email: e.target.value
        })
        // console.log(this.state.email)
        // this.onSubmit()
    }

    render(){
        console.log(this.state.email);
        
        return (
            <div>   
                <form onSubmit = {this.onSubmit}>
                <input onChange={this.onHandleChange} value={this.state.email} type="email" name="email" />
                    <input type="password" />
                    <input type="date" name="bday" />
                    <button type="submit" >Save</button>
                </form>
                  
            </div>
        )
    }
}

const Login = connect(null, mapDispatchToProps)(ConnectedLogin)
export default Login;