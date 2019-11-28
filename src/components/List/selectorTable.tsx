import moment from 'moment';

import { TasksTypes } from '../Interfaces';

const getTasksForTable = (tasks: TasksTypes[]) => {
  console.log('getTasks for table');

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

const getColumns = (
  columnsTable: { editable: boolean; dataIndex: string; title: string }[],
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

const getRowSelection = (tasks: TasksTypes[], context: any) => {
  console.log(tasks);

  const { selectedRowKeys } = context.state;

  const rowSelection = {
    selectedRowKeys,
    onChange: context.onSelectChange,
    hideDefaultSelections: true,
    selections: [
      {
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          console.log('This is on select');

          context.setState(
            {
              selectedRowKeys: [...Array(tasks.length).keys()]
            },
            () => {
              console.log('after render', context.state.selectedRowKeys);
            }
          );
        }
      },
      {
        key: 'undo-all-selections',
        text: 'Undo all selections',
        onSelect: () => {
          console.log('on click undo');
          const counter = 0;
          const selectedRows: any = [];
          tasks.map((task, index) => {
            if (task.completed) {
              selectedRows.push(index);
            }
          });
          context.setState({
            selectedRowKeys: selectedRows
          });
        }
      }
    ]
  };

  return rowSelection;
};

export { getTasksForTable, getColumns, getRowSelection };
