import moment from 'moment';

import { TasksTypes } from '../Interfaces';

const getTasksForTable = (tasks: TasksTypes[]) => {
  const data = [];

  for (let i = 0; i < tasks.length; i++) {
    data.push({
      ...tasks[i],
      key: i,

      date: moment(tasks[i].date).format('HH:mm:ss, DD.MM.YYYY')
    });
  }

  // context.setState({
  //     selectedRowKeys:
  // })
  // console.log("data", data);

  return data;
};

const getSelectedRowKeysFromTasks = (tasks: TasksTypes[]) => {
  const selectedRowKeys: number[] = [];
  tasks.forEach((task, index) => {
    if (task.completed) {
      selectedRowKeys.push(index);
    }
  });
  return selectedRowKeys;
}

const getColumns = (
  columnsTable: { editable?: boolean; dataIndex?: string; title?: string }[],
  context: any
) => {
  const columns = columnsTable.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: object) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: context.handleSave
      })
    };
  });

  return columns;
};

const onSelectChange = (selectedRowKeys: number[]): void => {
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
  this.props.addCurrentSelectedRowKeys([...selectedRowKeys]);
  // this.setState({
  //   selectedRowKeys
  // });
};

const getRowSelection = ({
  tasks,
  currentSelectedRowKeys,
  addCurrentSelectedRowKeys
}: any): any => {
  const onSelectChange = (selectedRowKeys: number[]): void => {
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
    addCurrentSelectedRowKeys([...selectedRowKeys]);
    // this.setState({
    //   selectedRowKeys
    // });
  };

  const rowSelection = {
    selectedRowKeys: currentSelectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      {
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          addCurrentSelectedRowKeys([...Array(tasks.length).keys()]);
          // context.setState(
          //   {
          //     selectedRowKeys: [...Array(tasks.length).keys()]
          //   },
          //   () => {
          //     console.log('after render', context.state.selectedRowKeys);
          //   }
          // );
        }
      },
      {
        key: 'undo-all-selections',
        text: 'Undo all selections',
        onSelect: () => {
          const counter = 0;
          const selectedRows: any = [];
          tasks.map((task, index) => {
            if (task.completed) {
              selectedRows.push(index);
            }
          });
          addCurrentSelectedRowKeys([...selectedRows]);
          // context.setState({
          //   selectedRowKeys: selectedRows
          // });
        }
      }
    ]
  };

  return rowSelection;
};

export { getTasksForTable, getColumns, getRowSelection, getSelectedRowKeysFromTasks};
