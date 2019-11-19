import React, { Component } from 'react'
import InputItem from '../InputItem/InputItem'
import List from "../List/List"
// import ConnectedLogin from './Login/Login';
import {getTasks, addSelectedRowKeys} from "../../actions/index"
import {connect} from "react-redux"
// import { connect } from "react-redux";
import {Redirect} from "react-router-dom"
// function mapStateToProps(state){
//     return { tasks: state.tasks }
// }
import {Layout} from 'antd'

const {Content} = Layout;
const mapDispatchToProps = (dispatch) =>{
    return {
        getTasks: (login_id) => dispatch(getTasks(login_id)),
        addSelectedRowKeys:  (keys) => dispatch(addSelectedRowKeys(keys))
    }
}

const mapStateToProps = (state) => {
    return{
        user_id: state.user._id,
        tasks: state.tasks,
        selectedRowKeys: state.selectedRowKeys
    }
}

class ConnectedTodoList extends Component {
    constructor(props) {
        super(props);
        
    
    }

    componentDidMount(){
        const {getTasks, user_id, addSelectedRowKeys} = this.props;
        if(user_id != undefined){
            getTasks(user_id)
            
           
            
            // addSelectedRowKeys([2])
        } 
    }

    render() {
        if(this.props.user_id === undefined) return (<Redirect to={"/"} />)
        
        return (
            <Content>
                
          
            {/* <div className="todoListMain"> */}
                <List/>
                <InputItem />
                {/* <ConnectedLogin /> */}
            {/* </div> */}
            </Content>
        )
    
    }
}
const TodoList = connect(mapStateToProps, mapDispatchToProps)(ConnectedTodoList)
export default TodoList