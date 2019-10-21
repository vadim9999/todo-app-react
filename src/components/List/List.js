import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment"
import {sortTasksByGrowthDate, sortTasksByDecreaseDate} from "../../actions"
import Task from '../Task/Task'

import "./List.css"
function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        filteredTasks: state.filteredTasks,
        date: state.date
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        sortTasksByGrowthDate: (tasks) => dispatch(sortTasksByGrowthDate(tasks)),
        sortTasksByDecreaseDate: (tasks) => dispatch(sortTasksByDecreaseDate(tasks))
    }
}

class ConnectedList extends Component {
    constructor() {
        super()
        
        this.state ={
            isFiltered: false,
            isSorted:false,
            filterOption: 0,
            filterOptionName: "Display uncompleted tasks",
            isSorted: false,
            sortOption:0,
            sortOptionName: "Sort by growth date"
        }
        
        this.onSort= this.onSort.bind(this)
        this.onClickFilter = this.onClickFilter.bind(this)
    }

    componentDidMount(){
        
    }

    
    onClickFilter(){

        let option = this.state.filterOption;
        option = ++option;
        console.log("Option", option);
        
        if(option === 3) {option = 0;}
        console.log("after assigne option");
        console.log(option);
        
        switch(option){
            case 0:
                this.setState({
                    isFiltered:false,
                    filterOption:option, 
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

    
    onSort(e){
        
        let sortOption = this.state.sortOption;
        sortOption = ++sortOption
        if(sortOption === 3) {sortOption = 0;}
        switch(sortOption){
            case 0:
                this.setState({
                    isSorted:false,
                    sortOption:sortOption, 
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

    render() {

        let {tasks} = this.props;
             
        if(this.state.isFiltered) {
            console.log("call checking conditions");
            if(this.state.filterOption === 1){
                tasks = tasks.filter(task => !task.completed)
            }else {
                tasks = tasks.filter(task => task.completed)
            }

            }

        return (
            <div className="list-block">
            
            <button onClick = {this.onClickFilter} >{this.state.filterOptionName}</button>
            <button onClick = {this.onSort}>{this.state.sortOptionName}</button>
            <ul className="tasks-list-block">
 
                {tasks.map(
                    task => {
                    
                        
                        return (
                            
                            <li className="task-block" key={task["_id"]} >
                               <Task task={task}/>
                            </li>
                        )
                    }
                )}
            </ul>
            </div>
        )
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
export default List