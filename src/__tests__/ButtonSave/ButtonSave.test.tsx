import React from 'react'
import Enzyme, {mount, shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import ButtonSave, {ConnectedButtonSave} from '../../components/ButtonSave/ButtonSave'
import {updateTaskById, addCurrentSelectedRowKeys, addSelectedRowKeys} from '../../actions'
import renderer from 'react-test-renderer'
import {createStore} from 'redux'
import {Button} from 'antd'
import { unmountComponentAtNode } from 'react-dom'
import rootReducer from '../../reducers'

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
  // const mockStore = configureStore()

  let store:any, wrapper:any;

  beforeEach(()=>{
    // store = mockStore(initialState)
    store = createStore(rootReducer,initialState)
    wrapper = mount(
      <Provider store ={store}>
        <ButtonSave />
      </Provider>
    )
  })

  // afterEach(()=>{
  //   wrapper.unmount()
  //   wrapper = null
  // })
  // it('checks on render button',()=>{
  //   expect(wrapper.find(ButtonSave).length).toEqual(1)
  // })

  // it('checks dispatching updateTaskById', () =>{
  //   let action
  //   store.dispatch(updateTaskById({
  //     name:'newtask',
  //     // name: row.name,
  //     completed: true,
  //     login_id: '1234',
  //     date: '12:22'
  //   }))

  //   // console.log(store.getState());
    
  //   // action = store.getActions()

  //   // expect(action[0].type).toBe('UPDATE_TASK')
  // })

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
    
    // console.log(store);
    
    // wrapper.setProps({cord:"22"})
    
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
    // it('updateTaskById', ()=>{
    //   expect(wrapper.find(ConnectedButtonSave).prop('updateTaskById')({
    //     name:'newtask',
    //     // name: row.name,
    //     completed: true,
    //     login_id: '1234',
    //     date: '12:22'
    //   }))
    //   .toEqual(store.dispatch(updateTaskById({
    //     name:'newtask',
    //     // name: row.name,
    //     completed: true,
    //     login_id: '1234',
    //     date: '12:22'
    //   })))
    // })
  })
  
  
  describe('snapshot ButtonSave',()=>{
    it('checks snapshot',()=>{
      const renderValue = renderer.create(<ConnectedButtonSave {...initialState} />).toJSON()
      expect(renderValue).toMatchSnapshot()
    })
  })
})