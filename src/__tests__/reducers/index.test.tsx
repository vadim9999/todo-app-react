import rootReducer from '../../reducers'
import {updateTaskById} from '../../actions'

describe('testing Reducers', ()=>{
  const initialState = {
    user: {},
    tasks: [],
    currentPage: 1,
    selectedRowKeys: [],
    currentSelectedRowKeys: []
  };

  it('UPDATE_TASK',()=>{
    
    let state = rootReducer(initialState, updateTaskById({
      name:'newtask',
      completed: true,
      login_id: '1234',
      date: '12:22'
    }))

    expect(state).toEqual({
      ...initialState
    })
  })

  it('check reducers',() =>{
    let state = rootReducer(initialState
    ,{type:"ADD_TASK_SUCCESS", payload:{
      _id:'23'
    }})

    expect(state).toEqual(
      {
        user: {},
        tasks: [{_id:'23'}],
        currentPage: 1,
        selectedRowKeys: [],
        currentSelectedRowKeys: []
      }
      
      
      )
  })
})