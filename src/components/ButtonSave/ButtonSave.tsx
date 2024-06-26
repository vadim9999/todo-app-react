import React from 'react'
import { Button } from 'antd'

import moment from 'moment';
import { connect } from 'react-redux';
import { TasksTypes } from '../Interfaces';
import { updateTaskById } from '../../actions';
import {getKeys} from './selector'

interface ButtonSaveProps {
  tasks: TasksTypes[];
  selectedRowKeys: number[];
  currentSelectedRowKeys: number[];
  user?: any;
  user_id: string;

  updateTaskById: any;
}


interface ButtonSaveState {
  loading: boolean;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTaskById: (id: string) => dispatch(updateTaskById(id)),
  };
};

const mapStateToProps = (state: ButtonSaveProps) => {
  return {
    selectedRowKeys: state.selectedRowKeys,
    currentSelectedRowKeys: state.currentSelectedRowKeys,
    tasks: state.tasks,
    user_id: state.user._id
  };
};

export class ConnectedButtonSave extends React.Component<ButtonSaveProps, ButtonSaveState>{
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false
    };
  }

  // componentDidMount =() =>{
  //   console.log("componentDidMount props= ", this.props);
    
  // }
  start = () => {
    const { tasks, selectedRowKeys, currentSelectedRowKeys } = this.props;

    this.setState({
      loading: true
    });

    const rowKeys = getKeys(selectedRowKeys, currentSelectedRowKeys)
    
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
    const { loading } = this.state;
    // console.log("******render ", this.props);
    
    return (
      <Button
        type="primary"
        onClick={this.start}
        // disabled={equalRowKeys}
        loading={loading}
      >
        Save
          </Button>
    )
  }
}

const ButtonSave = connect(mapStateToProps,mapDispatchToProps)(ConnectedButtonSave)
export default ButtonSave