import React, {Component} from "react";
import { connect } from "react-redux";

function mapStateToProps(state){
    return { tasks: state.tasks }
}

class ConnectedList extends Component{
    constructor(){
        super()
    }

    render(){
        // console.log(this.props.tasks);
        
        return (
            <ul>
                {this.props.tasks.map(
                    task => (
                        <li >
                            {task.taskName + '  ' + task.date} 
                        </li>
                    )
                )}
            </ul>
        )
    }
}

const List = connect(mapStateToProps)(ConnectedList)
export default List