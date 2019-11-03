import React, { Component } from 'react'
import { PaginationBlock, Item } from './PaginationBlock'
import {connect} from "react-redux";
import {addCurrentPage} from '../../actions/'
const MapStateToProps = (state) =>{
    return {
        tasks: state.tasks
    }
}

const MapDispatchToProps = (dispatch)=>{
    return{
        addCurrentPage: (page) => dispatch(addCurrentPage(page))
    }
}

class ConnectedPagination extends Component{
    constructor(){
        super()
        this.onClick = this.onClick.bind(this)
    }

    onClick(e){
        console.log("onClick");
        console.log(e.target.id);
        this.props.addCurrentPage(e.target.id)
    }

    componentDidMount(){
        this.props.addCurrentPage(0)
    }
    getPagination(tasks){
        let counter = 0;
        let pagination =  tasks.map((elem, index)=>{
            // console.log(index);
                if(index % 10 ===0) {
                    console.log("Index", index);
                    
                    return(<Item onClick= {this.onClick} key = {elem["_id"]} id={counter++}>{counter}</Item>)
                }
            })
        
        
        return pagination
    }
    render(){
        console.log(this.props.tasks);
        
        return (
            <PaginationBlock>
            <Item>&laquo;</Item>
                {
                    
                this.getPagination(this.props.tasks)
       
                }
                
                    <Item href="#">&raquo;</Item>
            </PaginationBlock>
                    

        )
    }
       
    
}

const Pagination = connect(MapStateToProps, MapDispatchToProps)(ConnectedPagination)
export default Pagination;