import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Task.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { addTask, deleteTaskById, updateTaskById } from '../../actions/index';
import { Wrapper, InputTask } from './styles.js';

const mapDispatchToProps = (dispatch) => ({
  deleteTaskById: (task_id) => dispatch(deleteTaskById(task_id)),
  updateTaskById: (task) => dispatch(updateTaskById(task)),
});

const mapStateToProps = (state) => ({
  user_id: state.user._id,
});
class ConnectedTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHiddenInput: true,
      name: this.props.task.name,
      isCompleted: this.props.task.completed,
      size: 1,
      shakeField: false,
    };
    this.onDelete = this.onDelete.bind(this);
    this.onClickTaskName = this.onClickTaskName.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onDelete(e) {
    // console.log(e.target.id);
    console.log('__onDelete ', this.props.task._id);

    this.props.deleteTaskById({ task_id: this.props.task._id, login_id: this.props.user_id });
    // this.props.getTasks("5d7fc031ffc1684b52083d09")
  }

  onClickTaskName(e) {
    e.preventDefault();
    console.log('its clicked task');
    console.log(e.target);
    this.setState({
      isHiddenInput: !this.state.isHiddenInput,
      size: this.state.name.length,
    });
  }


  onSave(e) {
    e.preventDefault();
    if (this.state.name.length > 0) {
      console.log('on save');
      this.setState({
        isHiddenInput: !this.state.isHiddenInput,

      });
      this.props.updateTaskById({
        ...this.props.task,
        name: this.state.name,
        completed: this.state.isCompleted,
        login_id: this.props.user_id,
        date: moment().toISOString(),
      });
    } else {
      console.log('Field is empty');
      console.log(e.style);

      this.setState({
        shakeField: true,
      });
    }
  }

  onChange(e) {
    console.log('on change');
    if (e.target.value.length === 1) {
      this.setState({
        name: e.target.value,
        shakeField: false,
      });
    } else if (e.target.value.length === 0) {
      this.setState({
        name: e.target.value,
        shakeField: true,
      });
    } else {
      this.setState({
        name: e.target.value,

      });
    }
  }

  onCheck() {
    if (this.state.isHiddenInput) {
      this.setState({
        isCompleted: !this.state.isCompleted,
        isHiddenInput: !this.state.isHiddenInput,
        // completed: !this.state.isCompleted
      });
    } else {
      this.setState({
        isCompleted: !this.state.isCompleted,
        // completed: !this.state.isCompleted
        // isHiddenInput: !this.state.isHiddenInput,

      });
    }
  }

  render() {
    const { task } = this.props;
    return (


      <div className="task" onClick={this.onClickTask}>

        <div className="task-header" style={this.state.isCompleted ? { textDecoration: 'line-through' } : {}}>
          <input type="checkbox" className="checkbox-task" checked={this.state.isCompleted} onChange={this.onCheck} />
          <InputTask
            onChange={this.onChange}
            shakeField={this.state.shakeField}
            value={this.state.name}
            hidden={this.state.isHiddenInput}
          />
          {/* <input type="text" className="input-change-task"  onChange={this.onChange} value={this.state.name} hidden={this.state.isHiddenInput}></input> */}

          <a onClick={this.onClickTaskName} hidden={!this.state.isHiddenInput}>{`${task.name}   `}</a>

        </div>

        <div className="additional-btn">
          <div hidden={this.state.isHiddenInput} className="save-btn" onClick={this.onSave}>
            <FontAwesomeIcon icon={faSave} />
          </div>

          <div className="delete-btn" onClick={this.onDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div className="date">{moment(task.date).format('HH:mm:ss, DD.MM.YYYY')}</div>

        </div>
      </div>


    );
  }
}

const Task = connect(mapStateToProps, mapDispatchToProps)(ConnectedTask);
export default Task;
