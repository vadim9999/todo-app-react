import React, { Component } from 'react'
import InputItem from './InputItem'
import List from "./List"
import ConnectedLogin from './Login';
import {getTasks} from "../actions/index"
import {connect} from "react-redux"
// import { connect } from "react-redux";

// function mapStateToProps(state){
//     return { tasks: state.tasks }
// }
const mapDispatchToProps = (dispatch) =>{
    return {
        getTasks: (login_id) => dispatch(getTasks(login_id)) 
    }
}


class ConnectedTodoList extends Component {
    constructor(props) {
        super(props);
        
    
    }

    componentDidMount(){
        this.props.getTasks("5d7fc031ffc1684b52083d09")
    }

    render() {
        return (
            <div className="todoListMain">
                <List />
                <InputItem />
                <ConnectedLogin />
            </div>
        )
    }
}
const TodoList = connect(null, mapDispatchToProps)(ConnectedTodoList)
export default TodoList