import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Popconfirm, Form } from 'antd';
import {
  sortTasksByGrowthDate,
  sortTasksByDecreaseDate,
  getTasks,
  deleteTaskById,
  updateTaskById,
  addCurrentSelectedRowKeys,
  addCurrentPage
} from '../../actions';
// import { onClickFilter, onSort } from './selector';
import { getTasksForTable, getColumns, getRowSelection, getSelectedRowKeysFromTasks } from './selectorTable';
import { TasksTypes } from '../Interfaces';
// import './List.css';
import { TableBlock } from './TableBlock';
import { EditableCell, EditableRow } from '../EditableCell/EditableCell';
import ButtonBlock from '../ButtonBlock/ButtonBlock';
// import Example from './Example'

interface ListProps {
  user: any;
  tasks: TasksTypes[];
  selectedRowKeys: number[];
  filteredTasks: object[];
  date: any;
  currentPage: any;
  user_id: string;
  currentSelectedRowKeys: number[];

  updateTaskById: any;
  deleteTaskById: any;
  addCurrentSelectedRowKeys: any;
  addCurrentPage: any;
}

const mapStateToProps = (state: ListProps) => {
  return {
    tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    date: state.date,
    currentPage: state.currentPage,
    selectedRowKeys: state.selectedRowKeys,
    user_id: state.user._id,
    currentSelectedRowKeys: state.currentSelectedRowKeys
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  // sortTasksByGrowthDate: (tasks: any) => dispatch(sortTasksByGrowthDate(tasks)),
  // sortTasksByDecreaseDate: (tasks: any) =>
  //   dispatch(sortTasksByDecreaseDate(tasks)),
 
  deleteTaskById: (task_id: any) => dispatch(deleteTaskById(task_id)),
  updateTaskById: (task_id: any) => dispatch(updateTaskById(task_id)),
  addCurrentSelectedRowKeys: (data: number[]) =>
    dispatch(addCurrentSelectedRowKeys(data)),
  addCurrentPage: (page: number) => dispatch(addCurrentPage(page))
});

const EditableFormRow = Form.create()(EditableRow);

interface ListState {
  isFiltered?: boolean;
  isSorted?: boolean;
  filterOption?: number;
  filterOptionName?: string;
  sortOption?: number;
  sortOptionName?: string;
  toggle?: number;
}
export class ConnectedList extends Component<ListProps, ListState> {

  columns: object[] = [
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
  constructor(props: any) {
    super(props);

    this.state = {
      isFiltered: false,
      isSorted: false,
      filterOption: 0,
      filterOptionName: 'Display uncompleted tasks',
      sortOption: 0,
      sortOptionName: 'Sort by growth date',
      toggle: 0
    };
  }

  getSelectedRowKeys = (tasks: TasksTypes[]): void => {
    if (tasks != undefined && tasks.length > 0 && this.state.toggle === 0) {
      const selectedRowKeys: number[] = getSelectedRowKeysFromTasks(tasks);
      this.props.addCurrentSelectedRowKeys([...selectedRowKeys]);
      this.setState({
        toggle: 1
      });
    }
  };

  // shouldComponentUpdate = (newProps:any) =>{
  //   console.log("call shouldComponentUpdate");

  //   if (this.props != newProps && newProps.tasks != undefined) {
  //     this.getSelectedRowKeys(newProps.tasks);
  //   }
  //   return true;
  // }

  UNSAFE_componentWillReceiveProps = (newProps: any) => {
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

  handleTableChange = (pagination: { current: number }): void => {
    this.props.addCurrentPage(pagination.current);
  };

  render() {
    let { tasks, currentPage } = this.props;
    // const hasSelected = selectedRowKeys.length > 0;
    const { getComponents } = this;

    // if (this.state.isFiltered) {
    //   if (this.state.filterOption === 1) {
    //     tasks = tasks.filter(task => !task.completed);
    //   } else {
    //     tasks = tasks.filter(task => task.completed);
    //   }
    // }
    // const my = {
    //   components: getComponents(),
    //   bordered: true
    // }
    return (
      <div>
        {/* <Example /> */}

        <ButtonBlock />

        <TableBlock>
          <Table
            // {...my}
            components={getComponents()}
            rowClassName={() =>
              `border: 1px solid #d9d9d9;
            border-adius: 4px;
            padding: 4px 11px;`

            }
            bordered
            rowSelection={getRowSelection(this.props)}
            dataSource={getTasksForTable(tasks)}
            columns={getColumns(this.columns, this)}
            onChange={this.handleTableChange}
            pagination={{ current: currentPage }}
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
