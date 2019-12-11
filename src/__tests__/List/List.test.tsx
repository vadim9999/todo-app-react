import List,{ConnectedList} from '../../components/List/List'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme,{mount} from 'enzyme'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import rootReducer from '../../reducers'

Enzyme.configure({adapter: new Adapter})

describe('testing component List when user in authenticated', ()=>{
  const initialState = {
    user: {
      _id:'12'
    },
    tasks: [],
    currentPage: 1,
    selectedRowKeys: [],
    currentSelectedRowKeys: []
  }
  const tasks = [
    {name:'task1',
    completed: true},
  {name:'task2',
  completed: false},
  {name:'task2',
  completed: true}
  ]

  let store:any, wrapper: any;

  beforeEach(()=>{
    store = createStore(rootReducer, initialState)

    wrapper = mount(
    <Provider store={store}>
        <List />
      </Provider>
    )
  })

  it('checks on rendering component', () =>{
    expect(wrapper.find(ConnectedList)).toHaveLength(1)
  })

  it('match props with state of redux',()=>{
    const ListComponent = wrapper.find(ConnectedList)

    expect(ListComponent.prop('tasks')).toEqual(initialState.tasks)
    expect(ListComponent.prop('currentPage')).toEqual(initialState.currentPage)
    expect(ListComponent.prop('user_id')).toEqual(initialState.user._id)
    expect(ListComponent.prop('currentSelectedRowKeys')).toEqual(initialState.currentSelectedRowKeys)
  })

  it('testing component willReveiveProps', ()=>{
    store.dispatch({
      type:'GET_TASKS_SUCCESS',
      payload:{
      data:tasks,
      selectedRowKeys: [0,2]
    }
    })

    wrapper.update()
    expect(wrapper.find(ConnectedList).prop('currentSelectedRowKeys')).toEqual([0,2])
  })

  it('testing function getSelectedRowKeysFromTasks',()=>{
    
  })
})