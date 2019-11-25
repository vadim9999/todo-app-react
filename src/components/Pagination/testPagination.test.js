describe('testing algorithms', () => {
  test('testing get id for 10 items', () => {
    const tasks = [
      {
        _id: '5d979093f6e20215372e6766', name: 'second', completed: true, date: '2019-10-04T19:43:05.692Z',
      },
      {
        _id: '5d97a15acc72d11dd49eb490', name: 'taskeree', completed: true, date: '2019-10-31T20:41:07.192Z',
      },
      {
        _id: '5d97af5c3a3949224520411d', name: 'giveddfdfd', completed: true, date: '2019-11-01T16:19:22.754Z',
      },
      {
        _id: '5d9c2ab97986300b577405a8', name: 'new taskxcxg', completed: true, date: '2019-11-01T16:19:23.681Z',
      },
      {
        _id: '5d9c7baf3001100e4715ecc6', name: 'dffffdfdfdf4444dfd44', completed: true, date: '2019-11-01T15:28:03.471Z',
      },
      {
        _id: '5d9c7baf3001100e4715ecc7', name: 'dfdfdf', completed: true, date: '2019-11-01T20:42:31.185Z',
      },
      {
        _id: '5d9c7baf3001100e4715ecc8', name: 'dfffdfdddfdfd', completed: true, date: '2019-11-01T19:58:27.611Z',
      },
      {
        _id: '5d9c7bb03001100e4715ecc9', name: '', completed: false, date: '2019-10-31T20:34:11.353Z',
      },
      {
        _id: '5dbb3ef4525d0809cc02c2da', name: '', completed: false, date: '2019-10-31T20:34:14.120Z',
      },
      {
        _id: '5dbbf4d511706916c49f690f', name: 'changed task name hey', completed: false, date: '2019-11-03T08:07:34.567Z',
      },
      {
        _id: '5dbbf4d511706916c49f690f', name: 'changed task name hey', completed: false, date: '2019-11-03T08:07:34.567Z',
      },

    ];

    // console.log(tasks);
    tasks.forEach((elem, index) => {
      // console.log(index);

      if (index % 10 === 0) console.log(index);
    });
    // ******************
    // const currentPage = 1;
    // const firstItem = currentPage * 10;
    // // const lastItem = firstItem + 9;
    // let lastTask;
    // let lengthTasksInCurrentPage = ( tasks.length - 1) - firstItem;
    // if(lengthTasksInCurrentPage <= 9)
    //     lastTask = firstItem + lengthTasksInCurrentPage;
    // else
    //     lastTask = firstItem + 9;

    // for (let currentTask = firstItem; currentTask <= lastTask; currentTask++ ){
    //     console.log(tasks[currentTask]);

    // }
    // ********************
    // const result = tasks.map((task,index)=>{
    //     console.log(currentPage );

    // })
    // console.log(result);
  });
});
