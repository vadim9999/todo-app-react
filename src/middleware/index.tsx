import Cookies from 'universal-cookie';


export function forbiddenWordsMiddleware({ dispatch:any }) {
  return function (next:any) {
    return function (action:any) {
      switch (action.type) {
        case 'SORT_TASKS_BY_GROWTH_DATE':
          const tasks = [...action.payload];
          
          // const tasks = action.payload;
          tasks.sort((task1, task2) => {
            if (task1.date > task2.date) return 1;
            return -1;
          });
          action.payload = tasks;


          break;
        case 'SORT_TASKS_BY_DECREASE_DATE':
          const tasks1 = [...action.payload];
          
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
