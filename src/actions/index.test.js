import {addTask} from './index'


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
})