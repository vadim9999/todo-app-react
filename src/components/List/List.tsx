import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Popconfirm, Form, Input, Button } from 'antd';
import {
  sortTasksByGrowthDate,
  sortTasksByDecreaseDate,
  getTasks,
  deleteTaskById,
  updateTaskById,
  addTask
} from '../../actions';
// import BlockAnimation  from "./BlockAnimation.js"
// import CustomPagination from '../Pagination/Pagination'
// import 'antd/dist/antd.css'
import { onClickFilter, onSort } from './selector';
import { getTasksForTable, getColumns, getRowSelection } from './selectorTable';
import { TasksTypes } from '../Interfaces';
// import './List.css';

import { EditableCell, EditableRow } from '../EditableCell/EditableCell';

function mapStateToProps(state: any) {
  return {
    tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    date: state.date,
    currentPage: state.currentPage,
    selectedRows: state.selectedRowKeys,
    user_id: state.user._id
  };
}

const mapDispatchToProps = (dispatch: any) => ({
  sortTasksByGrowthDate: (tasks: any) => dispatch(sortTasksByGrowthDate(tasks)),
  sortTasksByDecreaseDate: (tasks: any) =>
    dispatch(sortTasksByDecreaseDate(tasks)),
  getTasks: (user_id: any) => dispatch(getTasks(user_id)),
  deleteTaskById: (task_id: any) => dispatch(deleteTaskById(task_id)),
  updateTaskById: (task_id: any) => dispatch(updateTaskById(task_id)),
  addTask: (data: any) => dispatch(addTask(data))
});

const EditableFormRow = Form.create()(EditableRow);

interface ListProps {
  tasks: TasksTypes[];
  selectedRows: string[];
  filteredTasks: object[];
  date: any;
  currentPage: any;
  user_id: string;

  updateTaskById: any;
  deleteTaskById: any;
  addTask: any;
}

interface ListState {
  isFiltered?: boolean;
  isSorted?: boolean;
  filterOption?: number;
  filterOptionName?: string;
  sortOption?: number;
  sortOptionName?: string;
  selectedRowKeys?: any;
  toggle?: number;
  loading?: boolean;
  currentPage?: number;
}
class ConnectedList extends Component<ListProps, ListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isFiltered: false,
      isSorted: false,
      filterOption: 0,
      filterOptionName: 'Display uncompleted tasks',
      sortOption: 0,
      sortOptionName: 'Sort by growth date',
      selectedRowKeys: [],
      toggle: 0,
      loading: false,
      currentPage: 1
    };

    this.onSelectChange = this.onSelectChange.bind(this);
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

  onSelectChange = (selectedRowKeys: number[]): void => {
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
      selectedRowKeys
    });
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      editable: true
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Action',
      dataIndex: '',

      render: (text: string, record: { _id: string }) =>
        this.props.tasks.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              this.props.deleteTaskById({
                task_id: record._id,
                login_id: this.props.user_id
              });
            }}
          >
            <a> Delete </a>
          </Popconfirm>
        ) : null
    }
  ];

  getSelectedRowKeys = (tasks: { completed: boolean }[]): void => {
    const selectedRows: number[] = [];
    tasks.map((task, index) => {
      if (task.completed) {
        selectedRows.push(index);
      }
    });
    // const selectedKeys = tasks.filter(task => task.completed)

    if (tasks != undefined && tasks.length > 0 && this.state.toggle === 0) {
      this.setState({
        selectedRowKeys: [...selectedRows],
        toggle: 1
      });
    }
  };

  componentWillReceiveProps = (newProps: any) => {

    if (this.props != newProps && newProps.tasks != undefined) {
      this.getSelectedRowKeys(newProps.tasks);
    }
  };

  handleSave = (row: { _id: string; name: string }): void => {
 
    const { tasks } = this.props;
    const index = tasks.findIndex(item => row._id === item._id);
    const item = tasks[index];
 
    const founded = this.state.selectedRowKeys.find((item: any) => {

      return item === index;
    });


    // this.state.selectedRowKeys.find

    this.props.updateTaskById({
      ...item,
      name: row.name,
      completed: founded !== undefined,
      login_id: this.props.user_id,
      date: moment().toISOString()
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
  };

  getComponents = (): object => {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    return components;
  };

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

  handleTableChange = (pagination: { current: number }) => {
    this.setState({
      currentPage: pagination.current
    });
  };

  render() {
    let { tasks } = this.props;

    const { selectedRowKeys, loading } = this.state;
    const sortedKeys = selectedRowKeys.sort((a: number, b: number) => a < b);
    let equalRowKeys = false;

    if (
      JSON.stringify(sortedKeys) === JSON.stringify(this.props.selectedRows)
    ) {
      equalRowKeys = true;
    }
    // const hasSelected = selectedRowKeys.length > 0;
    const { getComponents } = this;

    if (this.state.isFiltered) {
      if (this.state.filterOption === 1) {
        tasks = tasks.filter(task => !task.completed);
      } else {
        tasks = tasks.filter(task => task.completed);
      }
    }

    return (
      <div>
        <Button
          type="primary"
          onClick={this.start}
          disabled={equalRowKeys}
          loading={loading}
        >
          Save
        </Button>
        <Button onClick={this.handleAdd} type="primary">
          {' '}
          Add a row
        </Button>
        <Table
          components={getComponents()}
          rowClassName={() => 'editable-row'}
          bordered
          rowSelection={getRowSelection(tasks, this)}
          dataSource={getTasksForTable(tasks)}
          columns={getColumns(this.columns, this)}
          onChange={this.handleTableChange}
          pagination={{ current: this.state.currentPage }}
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
