import React from 'react';
import { ButtonGroup, StyledButton } from './ButtonGroup';
import { Button } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { TasksTypes } from '../Interfaces';
import { updateTaskById, addTask, addCurrentPage } from '../../actions';

interface ButtonBlockProps {
  tasks: TasksTypes[];
  selectedRowKeys: number[];
  currentSelectedRowKeys: number[];
  user?: any;
  user_id: string;

  updateTaskById: any;
  addTask: any;
  addCurrentPage: any;
}

interface ButtonBlockState {
  loading: boolean;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTaskById: (id: string) => dispatch(updateTaskById(id)),
    addTask: (task: TasksTypes) => dispatch(addTask(task)),
    addCurrentPage: (page: number) => dispatch(addCurrentPage(page))
  };
};

const mapStateToProps = (state: ButtonBlockProps) => {
  return {
    selectedRowKeys: state.selectedRowKeys,
    currentSelectedRowKeys: state.currentSelectedRowKeys,
    tasks: state.tasks,
    user_id: state.user._id
  };
};

class ConnectedButtonBlock extends React.Component<
  ButtonBlockProps,
  ButtonBlockState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false
    };
  }

  

  start = () => {
    const { tasks, selectedRowKeys, currentSelectedRowKeys } = this.props;

    this.setState({
      loading: true
    });

    const keysNotFounded = [];
    const changedRowKeys = [...currentSelectedRowKeys];

    for (let i = 0; i < selectedRowKeys.length; i++) {
      let founded = false;
      for (let j = 0; j < changedRowKeys.length; j++) {
        if (selectedRowKeys[i] === changedRowKeys[j]) {
          changedRowKeys.splice(j, 1);
          founded = true;
          break;
        }
      }

      if (!founded) {
        keysNotFounded.push(selectedRowKeys[i]);
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

 

  render() {
    // const { currentSelectedRowKeys } = this.props;
    const { loading } = this.state;

    // const sortedKeys = selectedRowKeys.sort((a: number, b: number) => a < b);
    // let equalRowKeys = false;

    // if (
    //   JSON.stringify(sortedKeys) === JSON.stringify(selectedRowKeys)
    // ) {
    //   equalRowKeys = true;
    // }

    return (
      <ButtonGroup>
        <StyledButton>
          <Button
            type="primary"
            onClick={this.start}
            // disabled={equalRowKeys}
            loading={loading}
          >
            Save
          </Button>
        </StyledButton>
        <StyledButton>
          
        </StyledButton>
      </ButtonGroup>
    );
  }
}

const ButtonBlock = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedButtonBlock);
export default ButtonBlock;
