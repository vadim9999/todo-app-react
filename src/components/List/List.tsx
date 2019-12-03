import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Popconfirm, Form} from 'antd';
import {
  sortTasksByGrowthDate,
  sortTasksByDecreaseDate,
  getTasks,
  deleteTaskById,
  updateTaskById,
  addTask,
  addCurrentSelectedRowKeys
} from '../../actions';
// import BlockAnimation  from "./BlockAnimation.js"
// import CustomPagination from '../Pagination/Pagination'
// import 'antd/dist/antd.css'
import { onClickFilter, onSort } from './selector';
import { getTasksForTable, getColumns, getRowSelection } from './selectorTable';
import { TasksTypes } from '../Interfaces';
// import './List.css';
import { TableBlock } from './TableBlock';
import { EditableCell, EditableRow } from '../EditableCell/EditableCell';

// import Example from './Example'

function mapStateToProps(state: any) {
  return {
    tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    date: state.date,
    currentPage: state.currentPage,
    selectedRows: state.selectedRowKeys,
    user_id: state.user._id,
    currentSelectedRowKeys: state.currentSelectedRowKeys
  };
}

const mapDispatchToProps = (dispatch: any) => ({
  sortTasksByGrowthDate: (tasks: any) => dispatch(sortTasksByGrowthDate(tasks)),
  sortTasksByDecreaseDate: (tasks: any) =>
    dispatch(sortTasksByDecreaseDate(tasks)),
  getTasks: (user_id: any) => dispatch(getTasks(user_id)),
  deleteTaskById: (task_id: any) => dispatch(deleteTaskById(task_id)),
  updateTaskById: (task_id: any) => dispatch(updateTaskById(task_id)),
  addTask: (data: any) => dispatch(addTask(data)),
  addCurrentSelectedRowKeys: (data:number[]) => dispatch(addCurrentSelectedRowKeys(data))
});

const EditableFormRow = Form.create()(EditableRow);

interface ListProps {
  tasks: TasksTypes[];
  selectedRows: string[];
  filteredTasks: object[];
  date: any;
  currentPage: any;
  user_id: string;
  currentSelectedRowKeys: number[]

  updateTaskById: any;
  deleteTaskById: any;
  addTask: any;
  addCurrentSelectedRowKeys:any;
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


  }

  

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
      this.props.addCurrentSelectedRowKeys([...selectedRows])
      this.setState({
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
    const { tasks, currentSelectedRowKeys } = this.props;
    const index = tasks.findIndex(item => row._id === item._id);
    const item = tasks[index];

    const founded = currentSelectedRowKeys.find((item: any) => {
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

  

  handleTableChange = (pagination: { current: number }) => {
    this.setState({
      currentPage: pagination.current
    });
  };

  render() {
    let { tasks } = this.props;

    
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
        {/* <Example /> */}
        

        <TableBlock>
          <Table
            components={getComponents()}
            rowClassName={() => 'editable-row'}
            bordered
            rowSelection={getRowSelection(this.props)}
            dataSource={getTasksForTable(tasks)}
            columns={getColumns(this.columns, this)}
            onChange={this.handleTableChange}
            pagination={{ current: this.state.currentPage }}
          />
        </TableBlock>

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
