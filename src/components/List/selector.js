import moment from 'moment';


const onClickFilter = (context) => {
  let option = context.state.filterOption;
  option = ++option;
  console.log('Option', option);

  if (option === 3) { option = 0; }
  console.log('after assigne option');
  console.log(option);

  switch (option) {
    case 0:
      context.setState({
        isFiltered: false,
        filterOption: option,
        filterOptionName: 'Display uncompleted tasks',
      });
      break;
    case 1:
      // context.props.filterUncompletedTasks(tasks)
      context.setState({
        isFiltered: true,
        filterOption: option,
        filterOptionName: 'Display completed tasks',
      });
      break;

    case 2:
      // context.props.filterCompletedTasks(tasks)

      context.setState({
        isFiltered: true,
        filterOption: option,
        filterOptionName: 'Display all tasks',

      });
      break;
    default:

      break;
  }
};

const onSort = (context) => {
  let { sortOption } = context.state;
  sortOption = ++sortOption;
  if (sortOption === 3) { sortOption = 0; }
  switch (sortOption) {
    case 0:
      context.props.getTasks(context.props.user_id);
      context.setState({
        isSorted: false,
        sortOption,
        sortOptionName: 'Sort by growth date',
      });
      break;
    case 1:
      // context.props.filterUncompletedTasks(tasks)
      context.props.sortTasksByGrowthDate([...context.props.tasks]);

      context.setState({
        isSorted: true,
        sortOption,
        sortOptionName: 'Sort by decrease date',
      });
      break;

    case 2:
      // context.props.filterCompletedTasks(tasks)
      context.props.sortTasksByDecreaseDate([...context.props.tasks]);
      context.setState({
        isSorted: true,
        sortOption,
        sortOptionName: 'Unsort',

      });
      break;
    default:

      break;
  }
};


//   //    0 - reset(all tasks will be unfiltered)
//     //    1 - filter uncompleted tasks
//     //    2 - filter completed tasks
//     displayTasks(tasks) {
//         const result = []
//         const firstItem = this.props.currentPage * 10;
//         // const lastItem = firstItem + 9;
//         let lastTask;
//         let lengthTasksInCurrentPage = (tasks.length - 1) - firstItem;
//         if (lengthTasksInCurrentPage <= 9)
//             lastTask = firstItem + lengthTasksInCurrentPage;
//         else
//             lastTask = firstItem + 9;

//         for (let currentTask = firstItem; currentTask <= lastTask; currentTask++) {
//             console.log(tasks[currentTask]);
//             result.push(
//                 <li className="task-block" key={tasks[currentTask]["_id"]} >
//                     <Task task={tasks[currentTask]} />
//                 </li>
//             )

//         }
//         // const result = tasks.map(
//         //     (task, index) => {


//         //         return (

//         //             <li className="task-block" key={task["_id"]} >
//         //                 <Task task={task} />
//         //             </li>
//         //         )
//         //     }
//         // )
//         console.log("result", result);

//         return result;
//     }

export {
  onClickFilter,
  onSort,

};
