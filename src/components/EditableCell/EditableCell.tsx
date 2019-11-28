import React, { Component } from 'react';

import { Form, Input } from 'antd';

import './styled.css';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }: any) => {
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
};

interface EditableCellState {
  editing?: boolean;
}

class EditableCell extends React.Component<{}, EditableCellState> {
  form: any;
  input: any;
  constructor(props: any) {
    super(props);

    this.state = {
      editing: false
    };
  }

  toggleEdit = () => {
    console.log('toggle edit');

    const editing = !this.state.editing;

    this.setState(
      {
        editing
      },
      () => {
        if (editing) {
          this.input.focus();
        }
      }
    );
  };

  save = (e: any) => {
    const { record, handleSave }: any = this.props;

    this.form.validateFields((error: { [x: string]: any }, value: any) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...value });
    });
  };

  renderCell = (form: any) => {
    this.form = form;
    const { children, dataIndex, record, title }: any = this.props;

    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} isrequired.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    }: any = this.props;

    // console.log('editable', editable);
    // console.log("props of editablecell", this.props);

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export { EditableCell, EditableRow };
