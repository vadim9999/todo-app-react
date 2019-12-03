import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';
// import InputItem from '../InputItem/InputItem';
import List from '../List/List';
// import ConnectedLogin from './Login/Login';
import { getTasks, addSelectedRowKeys } from '../../actions/index';
// import { connect } from "react-redux";
// function mapStateToProps(state){
//     return { tasks: state.tasks }
// }
import { TasksTypes } from '../Interfaces';

const { Content } = Layout;
const mapDispatchToProps = (dispatch: any) => ({
  getTasks: (login_id: string) => dispatch(getTasks(login_id)),
  addSelectedRowKeys: (keys: number[]) => dispatch(addSelectedRowKeys(keys))
});

const mapStateToProps = (state: any) => ({
  user_id: state.user._id,
  tasks: state.tasks,
  selectedRowKeys: state.selectedRowKeys
});

interface TodoListProps {
  user_id: string;
  tasks: TasksTypes[];
  selectedRowKeys: any;

  getTasks: any;
  // addSelectedRowKeys: any;
}

interface TodoListState {}

class ConnectedTodoList extends Component<TodoListProps, TodoListState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { getTasks, user_id } = this.props;
    if (user_id != undefined) {
      getTasks(user_id);

      // addSelectedRowKeys([2])
    }
  }

  render() {
    if (this.props.user_id === undefined) return <Redirect to="/" />;

    return (
      <Content>
        {/* <div className="todoListMain"> */}
        <Row type="flex" justify="center">
          <Col style={{ width: '50%' }}>
            <List />
          </Col>
        </Row>

        {/* <InputItem /> */}
        {/* <ConnectedLogin /> */}
        {/* </div> */}
      </Content>
    );
  }
}
const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedTodoList);
export default TodoList;
