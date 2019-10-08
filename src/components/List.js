import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import {getTasks, deleteTaskById} from "../actions"
import Task from './Task'

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        date: state.date
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        deleteTaskById: (task_id) => dispatch(deleteTaskById(task_id)),
        getTasks: (login_id) => dispatch(getTasks(login_id)) 
    }
}

class ConnectedList extends Component {
    constructor() {
        super()
        
        
    }

    componentDidMount(){
        
    }

   
    render() {
        // console.log(this.props.tasks);

    
        return (
            <ul>
                {this.props.tasks.map(
                    task => {
                        return (
                            
                            <li key={task["_id"]} >
                               <Task task={task}/>
                            </li>
                        )
                    }
                )}
            </ul>
        )
    }
}

const List = connect(mapStateToProps,mapDispatchToProps)(ConnectedList)
export default List