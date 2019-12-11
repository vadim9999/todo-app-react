import React from 'react'
import Enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import ButtonSave, {ConnectedButtonSave} from '../../components/ButtonSave/ButtonSave'
import {addCurrentSelectedRowKeys} from '../../actions'
import renderer from 'react-test-renderer'
import {createStore} from 'redux'
import {Button} from 'antd'

import rootReducer from '../../reducers'

Enzyme.configure({adapter: new Adapter()})

describe('Testing ButtonSave after authorization', ()=>{
  const initialState = {
    user: {
      _id:'1234'
    },
    tasks: [],
    currentPage: 1,
    selectedRowKeys: [],
    currentSelectedRowKeys: []
  }

  let store:any, wrapper:any;

  beforeEach(()=>{
    store = createStore(rootReducer,initialState)
    wrapper = mount(
      <Provider store ={store}>
        <ButtonSave />
      </Provider>
    )
  })

  it('checks on render button',()=>{
    expect(wrapper.find(ButtonSave).length).toEqual(1)
  })

  it('checks on click button without tasks',()=>{  
    const button = wrapper.find(Button)
    
    button.simulate('click')
  })

  it('checks on click when app has three tasks', ()=>{
    const button = wrapper.find(Button)

    store.dispatch({type:"GET_TASKS_SUCCESS", payload:{
      data:[
      {name:'task1',
      completed: true},
    {name:'task2',
    completed: false},
    {name:'task2',
    completed: false}
    ],
    selectedRowKeys: [0]
  }}
  )

    store.dispatch(addCurrentSelectedRowKeys([1,2]))
    wrapper.update()
    // jest.useFakeTimers()
    button.simulate('click')
  })

  describe('checks match initialState in props', ()=>{
    it('selectedRowKeys', ()=>{
      expect(wrapper.find(ConnectedButtonSave).prop('selectedRowKeys')).toEqual(initialState.selectedRowKeys)
    })
  
    it('currentSelectedRowKeys',() =>{
      expect(wrapper.find(ConnectedButtonSave).prop('currentSelectedRowKeys')).toEqual(initialState.currentSelectedRowKeys)
    })
  
    it('tasks',()=>{
      expect(wrapper.find(ConnectedButtonSave).prop('tasks')).toEqual(initialState.tasks)
    })

    it('user_id', ()=>{
      expect(wrapper.find(ConnectedButtonSave).prop('user_id')).toEqual(initialState.user._id)
    })
  })
  
  describe('snapshot ButtonSave',()=>{
    it('checks snapshot',()=>{
      const renderValue = renderer.create(<ConnectedButtonSave {...initialState} />).toJSON()
      expect(renderValue).toMatchSnapshot()
    })
  })
})