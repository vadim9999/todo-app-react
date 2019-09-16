import React, { Component } from 'react'
import InputItem from './InputItem'
import List from "./List"
import ConnectedLogin from './Login';
// import { connect } from "react-redux";

// function mapStateToProps(state){
//     return { tasks: state.tasks }
// }

class TodoList extends Component {
    constructor(props) {
        super(props);
        
    
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
export default TodoList