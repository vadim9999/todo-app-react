import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addTask } from '../../actions/index';
import './InputItem.css';
// function mapDispatchToProps(dispatch){
//     console.log("Call mapDispatchToProps");

//     return {
//         addTask: task => dispatch(addTask(task))
//     }
// }
const mapStateToProps = (state) => ({
  user_id: state.user._id,
});

class ConnectedInputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // toggle:
    };

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
  }

  onHandleInput(e) {
    const name = e.target.value;
    this.setState({
      name,
    });
  }


  onAddTask(e) {
    const { name } = this.state;
    e.preventDefault();
    console.log('clicked');
    const date = moment().toISOString();
    const login = 'miron2311';
    const completed = true;

    this.setState({
      name: '',
    });
    this.props.addTask({
      login_id: this.props.user_id, completed: false, name, date,
    });
  }

  render() {
    return (
      <div className="input-item-block">
        <div className="header">
          <form onSubmit={this.onAddTask}>
            <input className="input-task" value={this.state.name} type="text" onChange={this.onHandleInput} />

            <button className="add-btn " type="submit"> Add Task </button>

          </form>
        </div>
      </div>
    );
  }
}

const InputItem = connect(mapStateToProps, { addTask })(ConnectedInputItem);
export default InputItem;
