import React from 'react'

import Enzyme, {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import ButtonAddTask,{ConnectedButtonAddTask} from '../../components/ButtonAddTask/ButtonAddTask'
import {addTask, addCurrentPage} from '../../actions'
import renderer from 'react-test-renderer'
import {Button} from 'antd'

Enzyme.configure({adapter: new Adapter()})

describe('Testing ButtonAddTask', () =>{
  const initialState = {
    user: {
      _id:'1234'
    },
    tasks: [],
    currentPage: 1,
    selectedRowKeys: [],
    currentSelectedRowKeys: []

  }

  const mockStore = configureStore()

  let store:any, wrapper:any;

  beforeEach(() =>{
    store = mockStore(initialState)

    wrapper = mount(
      <Provider store={store}>
        <ButtonAddTask />
      </Provider>
    )
  }) 

  it('check on render button', () =>{
    expect(wrapper.find(ButtonAddTask).length).toEqual(1)
  })

  it('check disptaching addTask',() =>{
    let action 
    store.dispatch(addTask({
      login_id: '134',
      completed: false,
      name: 'New task',
      date: '134:33'
    }))

    action = store.getActions()
    expect(action[0].type).toBe('ADD_TASK')
  })

  it('check dispatching addCurrentPage', ()=>{
    let action

    store.dispatch(addCurrentPage(1))

    action = store.getActions()

    expect(action[0].type).toBe('ADD_CURRENT_PAGE')
  })

  it('check props matches with initState', ()=>{
    expect(wrapper.find(ConnectedButtonAddTask).prop('tasks')).toEqual(initialState.tasks)
    expect(wrapper.find(ConnectedButtonAddTask).prop('user_id')).toEqual(initialState.user._id)
  })

  it('check on click Button',()=>{
    const button = wrapper.find(Button)
   const result =  button.prop('onClick')({preventDefault:jest.fn()})
    expect(result).toBe(undefined)
  })

  describe('check snapshot',()=>{
    it('snapshot',()=>{
      const renderedValue = renderer.create(<ConnectedButtonAddTask {...initialState} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

})