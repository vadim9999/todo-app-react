const initialState = {
  user: {},
  tasks: [],
  currentPage: 0,
  selectedRowKeys: [],
  currentSelectedRowKeys:[]
};

function rootReducer(state = initialState, action: any) {
  // console.error("Reducer");
  // console.log(action);
  // console.log("State");
  // console.log(state);

  switch (action.type) {
    // case types.ADD_TASK:
    //     return Object.assign({}, state, {
    //         tasks: state.tasks.concat(action.payload)
    //     })
    //     break;
    case 'ADD_TASK_SUCCESS':
      return { ...state, tasks: state.tasks.concat(action.payload) };

    case 'DATA_REQUESTED':
      // console.log("Reducers data requested");
      return state;

    case 'GET_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload.data,
        selectedRowKeys: [...action.payload.selectedRowKeys]
      };

    case 'ADD_USER_SUCCESS':
      return {
        ...state,
        user: action.payload
      };

    case 'AUTHENTICATE_SUCCESS':
      return {
        ...state,
        user: action.payload
      };

    case 'AUTHORIZATE_SUCCESS':
      return {
        ...state,
        user: action.payload
      };

    case 'SORT_TASKS_BY_GROWTH_DATE':
      console.log('call reducer sort tasks');

      return { ...state, tasks: [...action.payload] };
    case 'SORT_TASKS_BY_DECREASE_DATE':
      return {
        ...state,
        tasks: [...action.payload]
      };

    case 'ADD_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'ADD_CURRENT_SELECTED_ROW_KEYS':
      return {
        ...state,
        currentSelectedRowKeys: [...action.payload]
      };
    
    case 'ADD_SELECTED_ROW_KEYS':
      return {
        ...state,
        selectedRowKeys: [...action.payload]
      }
    default:
      return state;
  }
  // if (action.type === ADD_ARTICLE) {
  //     return Object.assign({}, state, {
  //         tasks: state.tasks.concat(action.payload)
  //     })
  // }else

  // return state;
}

export default rootReducer;
