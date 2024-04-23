import moment from 'moment';

import { TasksTypes } from '../Interfaces';

const getTasksForTable = (tasks: TasksTypes[]) => {
  const data = [];
  if (tasks !== undefined) {
    for (let i = 0; i < tasks.length; i++) {
      data.push({
        ...tasks[i],
        key: i,

        date: moment(tasks[i].date).format('HH:mm:ss, DD.MM.YYYY')
      });
    }
  }
  return data;
};

interface columnsTableTypes {
  title?: string;
  name?: string;
  dataIndex?: string;
  width?: string;
  editable?: boolean;
  render?: any
}
const getSelectedRowKeysFromTasks = (tasks: TasksTypes[]) => {
  const selectedRowKeys: number[] = [];
  if (tasks !== undefined) {
    tasks.forEach((task, index) => {
      if (task.completed) {
        selectedRowKeys.push(index);
      }
    });
  }
  return selectedRowKeys;
}

const getColumns = ({
  deleteTask,
  handleSave
}: any

) => {

  const columnsTable: columnsTableTypes[] = [
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
      render: deleteTask
    }
  ];

  const cell = (record: object, col: any) => ({
    record,
    editable: col.editable,
    dataIndex: col.dataIndex,
    title: col.title,
    handleSave
  })

  const columns = columnsTable.map(col => {
    if (!col.editable)
      return col;
    else
      return {
        ...col,
        onCell: (record: any) => cell(record, col)
      };
  });

  return columns;
};

// const onSelectChange = (selectedRowKeys: number[]): void => {
//   // const lastIndex = selectedRowKeys.length - 1;

//   // const lastItem = selectedRowKeys[lastIndex];

//   // const task = this.props.tasks[lastItem]

//   // this.props.updateTaskById({
//   //     ...task,
//   //     name: task.name,
//   //     completed: !task.completed,
//   //     login_id: this.props.user_id,
//   //     date: moment().toISOString()
//   // })
//   this.props.addCurrentSelectedRowKeys([...selectedRowKeys]);
//   // this.setState({
//   //   selectedRowKeys
//   // });
// };

const getRowSelection = (props: any): any => {
  let rowSelection: any = [];

  if (props !== undefined) {
    const {
      tasks,
      currentSelectedRowKeys,
      addCurrentSelectedRowKeys
    } = props;

    // console.log("props", props);

    const onSelectChange = (selectedRowKeys: number[]): void => {
      addCurrentSelectedRowKeys([...selectedRowKeys]);
    };

    const selectAllData = () => {
      addCurrentSelectedRowKeys([...Array(tasks.length).keys()]);
    }

    const undoAllSelection = () => {
      const counter = 0;
      const selectedRows: any = [];
      tasks.forEach((task: TasksTypes, index: number) => {
        if (task.completed) {
          selectedRows.push(index);
        }
      });
      addCurrentSelectedRowKeys([...selectedRows]);
    }

    rowSelection = {
      selectedRowKeys: currentSelectedRowKeys,
      onChange: onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: selectAllData
        },
        {
          key: 'undo-all-selections',
          text: 'Undo all selections',
          onSelect: undoAllSelection
        }
      ]
    };
  }



  return rowSelection;
};

export { getTasksForTable, getColumns, getRowSelection, getSelectedRowKeysFromTasks };
