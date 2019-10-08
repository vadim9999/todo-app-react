import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import {getTasks, deleteTaskById, filterTasksOnComplete} from "../actions"
import Task from './Task'

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        date: state.date
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        filterTasksOnComplete: tasks => dispatch(filterTasksOnComplete(tasks))
    }
}

class ConnectedList extends Component {
    constructor() {
        super()
        
        this.state ={
            isFiltered: false,
            isSorted:false
        }
        this.onClickFilter = this.onClickFilter.bind(this)
    }

    componentDidMount(){
        
    }

    onClickFilter(){
        this.props.filterTasksOnComplete(this.props.tasks)
    }
   
    render() {
        // console.log(this.props.tasks);

    
        return (
            <div>
            
            <button onClick = {this.onClickFilter}>In progress</button>
            
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
            </div>
        )
    }
}

const List = connect(mapStateToProps,mapDispatchToProps)(ConnectedList)
export default List