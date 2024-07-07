import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';
// import InputItem from '../InputItem/InputItem';
import List from '../../components/List/List';
// import ConnectedLogin from './Login/Login';
// import { getTasks, addSelectedRowKeys } from '../../actions/index';
// import { connect } from "react-redux";
// function mapStateToProps(state){
//     return { tasks: state.tasks }
// }
import { TasksTypes } from '../../components/Interfaces';

const { Content } = Layout;
// const mapDispatchToProps = (dispatch: any) => ({
//   getTasks: (login_id: string) => dispatch(getTasks(login_id)),
//   addSelectedRowKeys: (keys: number[]) => dispatch(addSelectedRowKeys(keys))
// });

// const mapStateToProps = (state: any) => ({
//   user_id: state.user._id,
//   tasks: state.tasks,
//   selectedRowKeys: state.selectedRowKeys
// });

interface TodoListProps {
  user_id: string;
  tasks: TasksTypes[];
  selectedRowKeys: any;

  getTasks: any;
  // addSelectedRowKeys: any;
}

// interface TodoListState { }

const TodoList = () => {
  // constructor(props: any) {
  //   super(props);
  // }

  // componentDidMount() {
  //   const { getTasks, user_id } = this.props;
  //   if (user_id != undefined) {
  //     getTasks(user_id);

  //     // addSelectedRowKeys([2])
  //   }
  // }


  // if (this.props.user_id === undefined) return <Redirect to="/" />;

  return (
    <Content>
      <Row justify="center">
        <Col style={{ width: '50%' }}>
          TODO list
          <List />
        </Col>
      </Row>
    </Content>
  );

}

export default TodoList;
