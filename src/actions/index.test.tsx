import {addTask, updateTaskById} from './index'


describe('actions', ()=>{
  it('addTask', ()=>{
    const tasks = [{
      _id:"3433"
    }];

    const expectedAction = {
      type: "ADD_TASK",
      payload:[{
        _id:"3433"
      }]
    }


    expect(addTask(tasks)).toEqual(expectedAction)
  })

  it('updateTaskById',()=>{
    const task = {
      name:'newtask',
      completed: true,
      login_id: '1234',
      date: '12:22'
    }
      
    const expectedAction = {
      type: 'UPDATE_TASK',
      payload: {
        ...task
      }
    }
      expect(updateTaskById(task)).toEqual(expectedAction)
    
  })
})