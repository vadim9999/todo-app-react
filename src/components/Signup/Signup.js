import React, { Component } from "react";
import { connect } from "react-redux"
import { addUser } from "../../actions/user"
import { getTasks } from "../../actions/index"


function mapDispatchToProps(dispatch) {
    return {
        addUser: (data) => dispatch(addUser(data)),
        getTasks: (login_id) => dispatch(getTasks(login_id))
    }
}

class ConnectedLogin extends Component {
    constructor() {
        super()
        this.state = {
            name:"",
            email: "",
            password: "", 
        }
        // this.onHandleChangePassword = this.onHandleChangePassword.bind(this)
        // this.onHandleChangeName = this.onHandleChangeName.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        
        console.log("ddd");
        // this.props.getTasks("5d7e4f0d4048013bee00a823")
        this.props.addUser({
           ...this.state
        })
        // console.log(cookies.get('myCat'));

    }

    componentDidMount() {
        console.log("This is componentDidMount");

    }


    onHandleChange(e){
        console.log(e.target.name);
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // onHandleChangeEmail(e) {
    //     this.setState({
    //         email: e.target.value
    //     })
    //     // console.log(this.state.email)
    //     // this.onSubmit()
    // }

    render() {
        console.log(this.state.email);
        const {name, email, password} = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onHandleChange} value={name} type="text" name="name"></input>
                    <input onChange={this.onHandleChange} value={email} type="email" name="email" />
                    <input onChange={this.onHandleChange} value={password} type="password" name="password" />
                    <button type="submit" >Save</button>
                </form>

            </div>
        )
    }
}

const Login = connect(null, mapDispatchToProps)(ConnectedLogin)
export default Login;