import React, { Component } from 'react'
import { connect } from "react-redux";
import { addTask, deleteTaskById, updateTaskById } from "../actions/index";

import moment from "moment"

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTaskById: (task_id) => dispatch(deleteTaskById(task_id)),
        updateTaskById: (task) => dispatch(updateTaskById(task))
    }
}

class ConnectedTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isHiddenInput: true,
            name: this.props.task.name,
            isCompleted: this.props.task.completed

        }
        this.onDelete = this.onDelete.bind(this)
        this.onClickTaskName = this.onClickTaskName.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onCheck = this.onCheck.bind(this)

    }
        onDelete(e){
            console.log(e.target.id);
            this.props.deleteTaskById({ task_id: this.props.task.task_id, login_id: "5d7fc031ffc1684b52083d09" })
            // this.props.getTasks("5d7fc031ffc1684b52083d09")
        }

        onClickTaskName(e){
            e.preventDefault()
            console.log("its clicked task");
            console.log(e.target);
            this.setState({
                isHiddenInput: !this.state.isHiddenInput
            })
        }


        onSave(e){
            e.preventDefault()

            console.log("on save");
            this.setState({
                isHiddenInput: !this.state.isHiddenInput,
            })
            this.props.updateTaskById({
                ...this.props.task,
                name: this.state.name,
                completed: this.state.isCompleted,
                login_id: "5d7fc031ffc1684b52083d09",
                date: moment().toISOString()
            })
        }

        onChange(e){
            console.log("on change");
            this.setState({
                name: e.target.value
            })
        }

        onCheck(){
            this.setState({
                isCompleted: !this.state.isCompleted,
                isHiddenInput: !this.state.isHiddenInput,

            })
        }

    render() {
        const {task} = this.props;
        return (
            <div style={ task.completed ?{textDecoration: "line-through"} : {}}>
                <input type="checkbox" checked={this.state.isCompleted} onChange={this.onCheck} ></input>
                <input onChange={this.onChange} value={this.state.name} hidden={this.state.isHiddenInput}></input>

                <a  onClick={this.onClickTaskName} hidden={!this.state.isHiddenInput} >{task.name + "   "}</a>
                {moment(task.date).format("HH:mm:ss, dddd DD MMMM YYYY")}
                <button hidden={this.state.isHiddenInput} onClick={this.onSave}>Save</button>
                <button onClick={this.onDelete} >delete</button>
            </div>
        )
    }
}

const Task = connect(null, mapDispatchToProps)(ConnectedTask)
export default Task