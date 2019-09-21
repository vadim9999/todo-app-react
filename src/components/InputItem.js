import React, { Component } from 'react'
import { connect } from "react-redux";
import { addTask } from "../actions/index";
import moment from "moment"
// function mapDispatchToProps(dispatch){
//     console.log("Call mapDispatchToProps");
    
//     return {
//         addTask: task => dispatch(addTask(task))
//     }
// }

class ConnectedInputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            // toggle:
        }

    this.onHandleInput = this.onHandleInput.bind(this)
    this.onAddTask = this.onAddTask.bind(this)
    }

    onHandleInput(e) {

        const name = e.target.value
        this.setState({
            name
        })
    }

    

    onAddTask(e){
        const { name } = this.state
        e.preventDefault()
        console.log("clicked");
        var date = moment().toISOString();
        const login = "miron2311";
        const completed = true
        
        
        this.props.addTask({login_id: "5d7fc031ffc1684b52083d09", completed:false, name, date})
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.onAddTask}>
                        <input placeholder="Task" onChange={this.onHandleInput} />
                        
                        <button type="submit"> Add Task </button>
                        
                    </form>
                </div>
            </div>
        )
    }
}

const InputItem = connect(null, {addTask})(ConnectedInputItem)
export default InputItem