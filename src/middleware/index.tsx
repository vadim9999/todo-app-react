import Cookies from 'universal-cookie';
import { ADD_TASK } from '../constants/action-types';
import { FOUND_WORD, addFoundWord } from '../actions/index';


export function forbiddenWordsMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'SORT_TASKS_BY_GROWTH_DATE':
          console.log('__Middleware_sortTasks');
          console.log('Before sorting', action.payload);
          const tasks = [...action.payload];
          console.log('New created object with array', tasks);

          // const tasks = action.payload;
          tasks.sort((task1, task2) => {
            if (task1.date > task2.date) return 1;
            return -1;
          });

          action.payload = tasks;
          console.log('After sorting', tasks);

          break;
        case 'SORT_TASKS_BY_DECREASE_DATE':
          console.log('Middleware _ decrease date');
          const tasks1 = [...action.payload];
          console.log('New created object with array', tasks1);
          // const tasks = action.payload;
          tasks1.sort((task1, task2) => {
            if (task1.date < task2.date) return 1;
            return -1;
          });
          action.payload = tasks1;
          break;
      }
      // if (action.type === ADD_TASK) {


      //     const foundWord = forbiddenWords.filter(word =>
      //         action.payload.name.includes(word))


      //     if (foundWord.length) {
      //         return dispatch({ type: "FOUND_BAD_WORD" })

      //     }
      // }

      // switch (action.type) {
      //     case "FILTER_COMPLETED_TASKS":


      //         const result = action.payload.filter(task => task.completed)

      //         action.payload = result;

      //         break;

      //     case "FILTER_UNCOMPLETED_TASKS":
      //         const data = action.payload.filter(task => !task.completed)

      //         action.payload = data;

      //         break;
      // }

      if (action.type === 'ADD_USER_SUCCESS' || action.type === 'AUTHORIZATE_SUCCESS') {
        const cookies = new Cookies();
        cookies.set('user', action.token, { path: '/' });
        // console.log("***********This is midlleware Add USER Success");
        // console.log(action.token);
      }


      return next(action);
    };
  };
}
