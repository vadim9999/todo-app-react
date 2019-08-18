import React, { Component } from 'react'
import { connect } from "react-redux";
import { addTask } from "../actions/index";

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
            taskName: "",
        }

    this.onHandleInput = this.onHandleInput.bind(this)
    this.onAddTask = this.onAddTask.bind(this)
    }

    onHandleInput(e) {

        const taskName = e.target.value
        this.setState({
            taskName
        })
    }

    addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

    onAddTask(e){
        const { taskName } = this.state
        e.preventDefault()
        console.log("clicked");
        var dateObj = new Date();
        var h = this.addZero(dateObj.getHours());
        var m = this.addZero(dateObj.getMinutes());
        var s = this.addZero(dateObj.getSeconds());

        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var date = h + ":" + m + ":" + s + " " + year + "/" + month + "/" + day;
        
        this.props.addTask({taskName, date})
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