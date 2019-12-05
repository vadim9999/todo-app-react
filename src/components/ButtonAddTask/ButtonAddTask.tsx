import React from 'react'

import {Button} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import {addTask, addCurrentPage} from '../../actions'

import {TasksTypes} from '../Interfaces'

interface ButtonAddTaskProps {
  tasks: TasksTypes[];
  user_id: string;

  addTask: any;
  addCurrentPage: any;

}
const mapStateToProps = (state:any) =>{
  return {
    user_id: state.user._id,
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch:any) =>{
  return {
    addTask : (task:TasksTypes) => dispatch(addTask(task)),
    addCurrentPage: (page:number) => dispatch(addCurrentPage(page))
  }
}

export class ConnectedButtonAddTask extends React.Component<ButtonAddTaskProps,{}>{

  getPagination = (tasks: object[]) => {
    let counter = 0;
    tasks.map((elem, index) => {
      // console.log(index);
      if (index % 10 === 0) {
        counter++;

        // return(<Item onClick= {this.onClick} key = {elem["_id"]} id={counter++}>{counter}</Item>)
      }
    });

    return counter;
  };

  handleAdd = (e: any) => {
    e.preventDefault();
    const { tasks } = this.props;

    const date = moment().toISOString();

    this.props.addTask({
      login_id: this.props.user_id,
      completed: false,
      name: 'New task',
      date
    });

    const page = this.getPagination(tasks);
    this.props.addCurrentPage(page);
  };

  render(){
    return (
      <Button onClick={this.handleAdd} type="primary">
            Add a row
        </Button>
    );
  }
    
  
}

const ButtonAddTask = connect(mapStateToProps,mapDispatchToProps)(ConnectedButtonAddTask)
export default ButtonAddTask