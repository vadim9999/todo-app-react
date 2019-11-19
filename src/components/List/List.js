import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import { sortTasksByGrowthDate, sortTasksByDecreaseDate, getTasks, deleteTaskById, updateTaskById } from "../../actions"
import Task from '../Task/Task'
// import BlockAnimation  from "./BlockAnimation.js"
// import CustomPagination from '../Pagination/Pagination'
// import 'antd/dist/antd.css'
import { Table, Popconfirm, Form, Input } from 'antd'

import "./List.css"

import { EditableCell, EditableRow } from '../EditableCell/EditableCell'

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        filteredTasks: state.filteredTasks,
        date: state.date,
        currentPage: state.currentPage,
        selectedRows: state.selectedRowKeys,
        user_id: state.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sortTasksByGrowthDate: (tasks) => dispatch(sortTasksByGrowthDate(tasks)),
        sortTasksByDecreaseDate: (tasks) => dispatch(sortTasksByDecreaseDate(tasks)),
        getTasks: (user_id) => dispatch(getTasks(user_id)),
        deleteTaskById: (task_id) => dispatch(deleteTaskById(task_id)),
        updateTaskById: (task_id) => dispatch(updateTaskById(task_id))
    }
}



const EditableFormRow = Form.create()(EditableRow)




class ConnectedList extends Component {
    constructor() {
        super()

        this.state = {
            isFiltered: false,
            isSorted: false,
            filterOption: 0,
            filterOptionName: "Display uncompleted tasks",
            isSorted: false,
            sortOption: 0,
            sortOptionName: "Sort by growth date",
            selectedRowKeys: [],
            toggle: 0
        }


        this.onSort = this.onSort.bind(this)
        this.onClickFilter = this.onClickFilter.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.getRowSelection = this.getRowSelection.bind(this)
        this.getColumns = this.getColumns.bind(this)
        // this.getTasksForTable = this.getTasksForTable.bind(this)
    }

    componentDidMount() {
        // this.props.getTasks(this.props.user_id);
        console.log(this.props.tasks);
        console.log("selectedkeyrows redux", this.props.selectedRowKeys);



    }

    onSelectChange = selectedRowKeys => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        this.setState({
            selectedRowKeys
        })
    }

    onClickFilter() {

        let option = this.state.filterOption;
        option = ++option;
        console.log("Option", option);

        if (option === 3) { option = 0; }
        console.log("after assigne option");
        console.log(option);

        switch (option) {
            case 0:
                this.setState({
                    isFiltered: false,
                    filterOption: option,
                    filterOptionName: "Display uncompleted tasks"
                })
                break;
            case 1:
                // this.props.filterUncompletedTasks(tasks)
                this.setState({
                    isFiltered: true,
                    filterOption: option,
                    filterOptionName: "Display completed tasks"
                })
                break;

            case 2:
                // this.props.filterCompletedTasks(tasks)

                this.setState({
                    isFiltered: true,
                    filterOption: option,
                    filterOptionName: "Display all tasks"

                })
                break;
            default:

                break;

        }

    }


    onSort(e) {

        let sortOption = this.state.sortOption;
        sortOption = ++sortOption
        if (sortOption === 3) { sortOption = 0; }
        switch (sortOption) {

            case 0:
                this.props.getTasks(this.props.user_id)
                this.setState({
                    isSorted: false,
                    sortOption: sortOption,
                    sortOptionName: "Sort by growth date"
                })
                break;
            case 1:
                // this.props.filterUncompletedTasks(tasks)
                this.props.sortTasksByGrowthDate([...this.props.tasks])

                this.setState({
                    isSorted: true,
                    sortOption: sortOption,
                    sortOptionName: "Sort by decrease date"
                })
                break;

            case 2:
                // this.props.filterCompletedTasks(tasks)
                this.props.sortTasksByDecreaseDate([...this.props.tasks])
                this.setState({
                    isSorted: true,
                    sortOption: sortOption,
                    sortOptionName: "Unsort"

                })
                break;
            default:

                break;

        }


    }
    //    0 - reset(all tasks will be unfiltered)
    //    1 - filter uncompleted tasks
    //    2 - filter completed tasks
    displayTasks(tasks) {
        const result = []
        const firstItem = this.props.currentPage * 10;
        // const lastItem = firstItem + 9;
        let lastTask;
        let lengthTasksInCurrentPage = (tasks.length - 1) - firstItem;
        if (lengthTasksInCurrentPage <= 9)
            lastTask = firstItem + lengthTasksInCurrentPage;
        else
            lastTask = firstItem + 9;

        for (let currentTask = firstItem; currentTask <= lastTask; currentTask++) {
            console.log(tasks[currentTask]);
            result.push(
                <li className="task-block" key={tasks[currentTask]["_id"]} >
                    <Task task={tasks[currentTask]} />
                </li>
            )

        }
        // const result = tasks.map(
        //     (task, index) => {


        //         return (

        //             <li className="task-block" key={task["_id"]} >
        //                 <Task task={task} />
        //             </li>
        //         )
        //     }
        // )
        console.log("result", result);

        return result;
    }

    getTasksForTable(tasks) {
        console.log("getTasks for table");

        const data = [];

        for (let i = 0; i < tasks.length; i++) {
            data.push({
                ...tasks[i],
                key: i,

                date: moment(tasks[i].date).format("HH:mm:ss, DD.MM.YYYY")

            })
        }




        // this.setState({
        //     selectedRowKeys: 
        // })
        // console.log("data", data);

        return data
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

            render: (text, record) => this.props.tasks.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => {
                    this.props.deleteTaskById({ task_id: record._id, login_id: this.props.user_id })
                    console.log("record", record);
                }}>
                    <a>Delete</a>
                </Popconfirm>
            ) : null,
        }
    ]

    getSelectedRowKeys(tasks) {
        console.log("call selectedRowKeys");
        // const {selectedRows} = this.props;
        const selectedRows = []
        tasks.map((task, index) => {
            if (task.completed) {
                selectedRows.push(index)
            }
        })
        // const selectedKeys = tasks.filter(task => task.completed)

        console.log("selected Keys", selectedRows);

        if (tasks != undefined && tasks.length > 0 && this.state.toggle === 0) {
            this.setState({
                selectedRowKeys: [...selectedRows],
                toggle: 1
            })
        }
    }
    componentWillReceiveProps(newProps) {
        console.log("component will receive props");

        if (this.props != newProps && newProps.tasks != undefined) {
            this.getSelectedRowKeys(newProps.tasks)
        }

    }

    handleSave = row => {
        console.log(row);
        const {tasks} =  this.props;
        const index = tasks.findIndex(item => row._id === item._id);
        const item = tasks[index]
        console.log("item", item);
        
        const founded = this.state.selectedRowKeys.find(item =>{
            console.log(item);
            console.log(index);
            
            
            return item === index
        })
        console.log("founded", founded);
        
        // this.state.selectedRowKeys.find
        
        this.props.updateTaskById({
            ...item,
            name: row.name,
            completed: ((founded !== undefined) ? true : false),
            login_id: this.props.user_id,
            date: moment().toISOString()
        })

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


    getRowSelection = () => {
        let { tasks } = this.props;
        console.log(tasks);

        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: 'all-data',
                    text: 'Select All Data',
                    onSelect: () => {
                        console.log("This is on select");

                        this.setState({
                            selectedRowKeys: [...Array(tasks.length).keys()]
                        }, () => {
                            console.log("after render", this.state.selectedRowKeys);

                        })
                    }
                }
            ]
        }

        return rowSelection;

    }

    getComponents = ()=>{
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            }
        }
        
        return components
    }

    getColumns =() =>{
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            }
        })

        return columns
    }

    render() {

        console.log("UPDATE");

        let { tasks } = this.props;
        console.log(tasks);

        const { selectedRowKeys } = this.state;
        console.log("selected row keys state", selectedRowKeys);

        const {getComponents, getRowSelection, getTasksForTable, getColumns} = this;

        if (this.state.isFiltered) {
            console.log("call checking conditions");
            if (this.state.filterOption === 1) {
                tasks = tasks.filter(task => !task.completed)
            } else {
                tasks = tasks.filter(task => task.completed)
            }

        }

        return (
            <div >

                <Table
                    components={getComponents()}
                    rowClassName={() => 'editable-row'}
                    bordered
                    rowSelection={getRowSelection()}
                    dataSource={getTasksForTable(tasks)}
                    columns={getColumns()}
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
        )
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
export default List