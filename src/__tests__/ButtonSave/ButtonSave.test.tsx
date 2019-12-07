import React from 'react'
import Enzyme, {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import ButtonSave, {ConnectedButtonSave} from '../../components/ButtonSave/ButtonSave'
import {updateTaskById} from '../../actions'
import renderer from 'react-test-renderer'

import {Button} from 'antd'
Enzyme.configure({adapter: new Adapter()})

describe('Testing ButtonSave', ()=>{
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

  beforeEach(()=>{
    store = mockStore(initialState)

    wrapper = mount(
      <Provider store ={store}>
        <ButtonSave />
      </Provider>
    )
  })

  it('checks on render button',()=>{
    expect(wrapper.find(ButtonSave).length).toEqual(1)
  })

  it('checks dispatching updateTaskById', () =>{
    let action
    store.dispatch(updateTaskById({
      name:'newtask',
      // name: row.name,
      completed: true,
      login_id: '1234',
      date: '12:22'
    }))

    action = store.getActions()

    expect(action[0].type).toBe('UPDATE_TASK')
  })

  it('checks on click button',()=>{
    const button = wrapper.find(Button)
    const result = button.prop('onClick')()
    expect(result).toEqual(undefined)
    
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