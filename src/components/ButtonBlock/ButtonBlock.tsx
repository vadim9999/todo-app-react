import React from 'react'
import { ButtonGroup, StyledButton } from './ButtonGroup';
import {Button} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import {TasksTypes} from '../Interfaces'

const mapStateToProps = (state:{selectedRowKeys:string[], tasks: object[]}) =>{
  return {
    selectedRows: state.selectedRowKeys,
    tasks: state.tasks
  }
}

interface ButtonBlockProps {
  tasks: TasksTypes[];
  selectedRows: number[]
}

class ConnectedButtonBlock extends React.Component<ButtonBlockProps,{}>{
  constructor(props:any){
    super(props)
  }

  start = () => {
    const { tasks, selectedRows } = this.props;
    const { selectedRowKeys } = this.state;

    this.setState({
      loading: true
    });

    const keysNotFounded = [];
    const changedRowKeys = [...selectedRowKeys];

    for (let i = 0; i < selectedRows.length; i++) {
      let founded = false;
      for (let j = 0; j < changedRowKeys.length; j++) {
        if (selectedRows[i] === changedRowKeys[j]) {
          changedRowKeys.splice(j, 1);
          founded = true;
          break;
        }
      }

      if (!founded) {
        keysNotFounded.push(selectedRows[i]);
      }
    }

    // changedRowKeys[...keysNotFounded]

    const rowKeys = changedRowKeys.concat(keysNotFounded);

    rowKeys.map((item: any) => {
      this.props.updateTaskById({
        ...tasks[item],
        // name: row.name,
        completed: !tasks[item].completed,
        login_id: this.props.user_id,
        date: moment().toISOString()
      });
    });

    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  };


  handleAdd = (e: any) => {
    e.preventDefault();
    const date = moment().toISOString();

    this.props.addTask({
      login_id: this.props.user_id,
      completed: false,
      name: 'New task',
      date
    });

    const page = this.getPagination(this.props.tasks);
    this.setState({
      currentPage: page
    });
  };

  render(){

    const { selectedRowKeys, loading } = this.state;
    const sortedKeys = selectedRowKeys.sort((a: number, b: number) => a < b);
    let equalRowKeys = false;

    if (
      JSON.stringify(sortedKeys) === JSON.stringify(this.props.selectedRows)
    ) {
      equalRowKeys = true;
    }

    return (
      <ButtonGroup>
          <StyledButton>
            <Button
              type="primary"
              onClick={this.start}
              disabled={equalRowKeys}
              loading={loading}
            >
              Save
            </Button>
          </StyledButton>
          <StyledButton>
            <Button onClick={this.handleAdd} type="primary">
              Add a row
            </Button>
          </StyledButton>
        </ButtonGroup>
    )
  }
}

const ButtonBlock = connect(mapStateToProps)(ConnectedButtonBlock)
export default ButtonBlock