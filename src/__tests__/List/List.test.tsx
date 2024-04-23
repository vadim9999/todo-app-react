import List,{ConnectedList} from '../../components/List/List'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme,{mount} from 'enzyme'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Table, Popconfirm} from 'antd'
import rootReducer from '../../redux/reducers'
import {addCurrentPage} from '../../actions/index'
import renderer from 'react-test-renderer'

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
    {_id:'1',
      name:'task1',
    completed: true},
  {_id:'2',
    name:'task2',
  completed: false},
  {_id:'3',
    name:'task2',
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

  it('testing component willReceiveProps', ()=>{
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

  it('testing willReceiveProps when tasks are undefined',()=>{
    store.dispatch({
      type:'GET_TASKS_SUCCESS',
      payload: {
        data:undefined,
        selectedRowKeys:[]
      }
    })

    wrapper.update()

    expect(wrapper.find(ConnectedList).prop('tasks')).toEqual(undefined)
  })
  it('testing dispatch on addCurrentPage',()=>{
    store.dispatch(addCurrentPage(2))
    wrapper.update()
    expect(wrapper.find(ConnectedList).prop('currentPage')).toEqual(2)
  })
  
  it('testing onChange Table',()=>{
    wrapper.find(Table).prop('onChange')({current:2})
    wrapper.update()
    const listProps = wrapper.find(ConnectedList).prop('currentPage')
    expect(listProps).toEqual(2)
  })
  it('testing handleSave',()=>{
    store.dispatch({
      type:'GET_TASKS_SUCCESS',
      payload:{
        data: tasks,
        selectedRowKeys:[0,2]
      }
    })

    wrapper.update()
    wrapper.find(ConnectedList).instance().handleSave({
      _id:'2',
      name:'changedTaskName'})
  })
    // wrapper.update()

    it('testing row on delete',()=>{
    store.dispatch({
      type:'GET_TASKS_SUCCESS',
      payload:{
        data: tasks,
        selectedRowKeys:[0,2]
      }
    })
    wrapper.update()
    const popconfirmProps = wrapper.find(Popconfirm).at(1).props()
    popconfirmProps.onConfirm()
    })

    
})

// describe('snapshot List',()=>{
//   it('checking snapshot', ()=>{
//     const renderedValue = renderer.create(
    
//       <ConnectedList />
      
//       ).toJSON()
//     expect(renderedValue).toMatchSnapshot()
//   })
// })