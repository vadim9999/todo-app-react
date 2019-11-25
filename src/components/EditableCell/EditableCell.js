import React, { Component } from "react";

import {Table, Popconfirm, Form, Input} from 'antd'

import './styled.css'

const EditableContext = React.createContext();

console.log(EditableContext);


const EditableRow = ({form, index, ...props}) =>(
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
)

class EditableCell extends React.Component {
    constructor(){
        super()

        this.state = {
            editing: false,
        }
    }

    toggleEdit = () =>{
        console.log('toggle edit');
        
        const editing = !this.state.editing;

        this.setState({
            editing
        }, ()=>{
            if(editing){
                this.input.focus()
            }
        })
    }

    save = e =>{
        const { record, handleSave} = this.props;

        this.form.validateFields((error, value) =>{
            if (error && error[e.currentTarget.id]){
                return;
            }
            this.toggleEdit();
            handleSave({...record, ...value});
        })
    }

    renderCell = form =>{

    
        
        this.form = form; 
        const { children, dataIndex, record, title } = this.props;

        const { editing }  = this.state;
        return editing ? (
            <Form.Item style={{margin: 0}}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} isrequired.`,
                        }
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ): (
            <div 
            className="editable-cell-value-wrap"
            style={{paddingRight: 24}}
            onClick={this.toggleEdit}
            >
            {children}
            </div>
        )
    };

    render(){
        const {editable, dataIndex, title, record, index, handleSave, children, ...restProps} = this.props;
        
        // console.log('editable', editable);
        // console.log("props of editablecell", this.props);
        
        return(
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                    {this.renderCell}
                    </EditableContext.Consumer>
                    ):(
                        children
                    )
                    }
            </td>
        )
    }


}

export {EditableCell, EditableRow}