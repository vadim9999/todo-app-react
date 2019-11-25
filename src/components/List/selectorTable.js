import moment from 'moment';

const getTasksForTable = (tasks) => {
  console.log('getTasks for table');

  const data = [];

  for (let i = 0; i < tasks.length; i++) {
    data.push({
      ...tasks[i],
      key: i,

      date: moment(tasks[i].date).format('HH:mm:ss, DD.MM.YYYY'),

    });
  }
  
  // context.setState({
  //     selectedRowKeys:
  // })
  // console.log("data", data);

  return data;
};


const getColumns = (columnsTable, context) => {
  const columns = columnsTable.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: context.handleSave,
      }),
    };
  });

  return columns;
};


const getRowSelection = (tasks, context) => {
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

          context.setState({
            selectedRowKeys: [...Array(tasks.length).keys()],
          }, () => {
            console.log('after render', context.state.selectedRowKeys);
          });
        },
      },
      {
        key: 'undo-all-selections',
        text: 'Undo all selections',
        onSelect: () => {
            console.log("on click undo");
            let counter = 0;
            const selectedRows =  []
            tasks.map((task, index) => {
            if (task.completed) {
                selectedRows.push(index)
            }
        })
            context.setState({
                selectedRowKeys: selectedRows
            })
            
        }
      }
    ],
  };

  return rowSelection;
};

export {
  getTasksForTable,
  getColumns,
  getRowSelection,
};
