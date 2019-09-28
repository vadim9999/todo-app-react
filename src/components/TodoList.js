import React, { Component } from 'react'
import InputItem from './InputItem'
import List from "./List"
// import ConnectedLogin from './Login/Login';
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

const mapStateToProps = (state) => {
    return{
        user_id: state.user._id
    }
}

class ConnectedTodoList extends Component {
    constructor(props) {
        super(props);
        
    
    }

    componentDidMount(){
        this.props.getTasks(this.props.user_id)
    }

    render() {
        return (
            <div className="todoListMain">
                <List />
                <InputItem />
                {/* <ConnectedLogin /> */}
            </div>
        )
    }
}
const TodoList = connect(mapStateToProps, mapDispatchToProps)(ConnectedTodoList)
export default TodoList