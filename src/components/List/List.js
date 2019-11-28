import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Table, Popconfirm, Form, Input, Button,
} from 'antd';
import {
  sortTasksByGrowthDate, sortTasksByDecreaseDate, getTasks, deleteTaskById, updateTaskById, addTask,
} from '../../actions';
// import BlockAnimation  from "./BlockAnimation.js"
// import CustomPagination from '../Pagination/Pagination'
// import 'antd/dist/antd.css'
import { onClickFilter, onSort } from './selector';
import { getTasksForTable, getColumns, getRowSelection } from './selectorTable';

import './List.css';

import { EditableCell, EditableRow } from '../EditableCell/EditableCell';

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    date: state.date,
    currentPage: state.currentPage,
    selectedRows: state.selectedRowKeys,
    user_id: state.user._id,
  };
}

const mapDispatchToProps = (dispatch) => ({
  sortTasksByGrowthDate: (tasks) => dispatch(sortTasksByGrowthDate(tasks)),
  sortTasksByDecreaseDate: (tasks) => dispatch(sortTasksByDecreaseDate(tasks)),
  getTasks: (user_id) => dispatch(getTasks(user_id)),
  deleteTaskById: (task_id) => dispatch(deleteTaskById(task_id)),
  updateTaskById: (task_id) => dispatch(updateTaskById(task_id)),
  addTask: (data) => dispatch(addTask(data)),
});

const EditableFormRow = Form.create()(EditableRow);

class ConnectedList extends Component {
  constructor() {
    super();

    this.state = {
      isFiltered: false,
      isSorted: false,
      filterOption: 0,
      filterOptionName: 'Display uncompleted tasks',
      isSorted: false,
      sortOption: 0,
      sortOptionName: 'Sort by growth date',
      selectedRowKeys: [],
      toggle: 0,
      loading: false,
      currentPage: 1,

    };

    this.onSelectChange = this.onSelectChange.bind(this);
  }

    start = () => {
      const { tasks, selectedRows } = this.props;
      const { selectedRowKeys } = this.state;

      this.setState({
        loading: true,
      });


      const keysNotFounded = [];
      const changedRowKeys = [...selectedRowKeys];
      console.log('keys before', changedRowKeys);

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

      rowKeys.map((item) => {
        this.props.updateTaskById({
          ...tasks[item],
          // name: row.name,
          completed: !tasks[item].completed,
          login_id: this.props.user_id,
          date: moment().toISOString(),
        });
      });


      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      // const lastIndex = selectedRowKeys.length - 1;

      // const lastItem = selectedRowKeys[lastIndex];

      // const task = this.props.tasks[lastItem]

      // this.props.updateTaskById({
      //     ...task,
      //     name: task.name,
      //     completed: !task.completed,
      //     login_id: this.props.user_id,
      //     date: moment().toISOString()
      // })

      this.setState({
        selectedRowKeys,
      });
    }


    columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'Date',
        dataIndex: 'date',
      },
      {
        title: 'Action',
        dataIndex: '',

        render: (text, record) => (this.props.tasks.length >= 1 ? (


          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              this.props.deleteTaskById({ task_id: record._id, login_id: this.props.user_id });
              console.log('record', record);
            }}
          >
            <a> Delete </a>
          </Popconfirm>


        ) : null),
      },
    ]

    getSelectedRowKeys(tasks) {
      console.log('call selectedRowKeys');
      // const {selectedRows} = this.props;
      const selectedRows = [];
      tasks.map((task, index) => {
        if (task.completed) {
          selectedRows.push(index);
        }
      });
      // const selectedKeys = tasks.filter(task => task.completed)

      console.log('selected Keys', selectedRows);

      if (tasks != undefined && tasks.length > 0 && this.state.toggle === 0) {
        this.setState({
          selectedRowKeys: [...selectedRows],
          toggle: 1,
        });
      }
    }

    componentWillReceiveProps(newProps) {
      console.log('component will receive props');

      if (this.props != newProps && newProps.tasks != undefined) {
        this.getSelectedRowKeys(newProps.tasks);
      }
    }

    handleSave = (row) => {
      console.log(row);
      const { tasks } = this.props;
      const index = tasks.findIndex((item) => row._id === item._id);
      const item = tasks[index];
      console.log('item', item);

      const founded = this.state.selectedRowKeys.find((item) => {
        console.log(item);
        console.log(index);


        return item === index;
      });
      console.log('founded', founded);

      // this.state.selectedRowKeys.find

      this.props.updateTaskById({
        ...item,
        name: row.name,
        completed: ((founded !== undefined)),
        login_id: this.props.user_id,
        date: moment().toISOString(),
      });

      // this.props.deleteTaskById({ task_id: row.key, login_id: this.props.user_id })

      // const newData = [...this.props.tasks];
      // const index = newData.findIndex(item => row.key === item.key);
      // const item = newData[index];
      // newData.splice(index, 1, {
      //     ...item,
      //     ...row,
      // })

      // this.setState({

      // })
    }


    getComponents = () => {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };

      return components;
    }

    getPagination = (tasks) => {
      let counter = 0;
      tasks.map((elem, index) => {
        // console.log(index);
        if (index % 10 === 0) {
          console.log('Index', index);
          counter++;
          console.log('counter', counter);

          // return(<Item onClick= {this.onClick} key = {elem["_id"]} id={counter++}>{counter}</Item>)
        }
      });

      console.log(counter);

      return counter;
    }

    handleAdd = (e) => {
      const { name } = this.state;
      e.preventDefault();
      console.log('clicked');
      const date = moment().toISOString();
      const login = 'miron2311';
      const completed = true;


      this.props.addTask({
        login_id: this.props.user_id, completed: false, name: 'New task', date,
      });

      const page = this.getPagination(this.props.tasks);
      this.setState({
        currentPage: page,
      });
    }

    handleTableChange = (pagination) => {
      this.setState({
        currentPage: pagination.current,
      });
      console.log(pagination.current);


      console.log('change table');
    }

    render() {
      let { tasks } = this.props;

      const { selectedRowKeys, loading } = this.state;
      const sortedKeys = selectedRowKeys.sort((a, b) => (a < b));
      let equalRowKeys = false;


      if (JSON.stringify(sortedKeys) === JSON.stringify(this.props.selectedRows)) {
        equalRowKeys = true;
      }
      // const hasSelected = selectedRowKeys.length > 0;
      const { getComponents } = this;

      if (this.state.isFiltered) {
        console.log('call checking conditions');
        if (this.state.filterOption === 1) {
          tasks = tasks.filter((task) => !task.completed);
        } else {
          tasks = tasks.filter((task) => task.completed);
        }
      }

      return (
        <div>
          <Button type="primary" onClick={this.start} disabled={equalRowKeys} loading={loading}>Save</Button>
          <Button onClick={this.handleAdd} type="primary"> Add a row</Button>
          <Table
            components={getComponents()}
            rowClassName={() => 'editable-row'}
            bordered
            rowSelection={getRowSelection(tasks, this)}
            dataSource={getTasksForTable(tasks)}
            columns={getColumns(this.columns, this)}
            pagination={{ current: this.state.currentPage }}
            onChange={this.handleTableChange}
          />

          {/* <div className="btn-block">
                    <button onClick={this.onClickFilter} >{this.state.filterOptionName}</button>
                    <button onClick={this.onSort}>{this.state.sortOptionName}</button>

                </div>
                <BlockAnimation className="block-animation">
                    <ul className="tasks-list-block">

                        {this.displayTasks(tasks)}
                    </ul>
                </BlockAnimation>
                <CustomPagination /> */}

        </div>
      );
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;
