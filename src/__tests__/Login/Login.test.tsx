import React from 'react'
import Enzyme,{mount, shallow } from 'enzyme';
import sinon from 'sinon'
import Login,{ConnectedLogin} from '../../components/Login/Login'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import {Form, Input} from 'antd'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import {createStore} from 'redux'
import renderer from 'react-test-renderer'
import {authorizate, addUser} from '../../actions/user'
import rootReducer from '../../reducers/index'
Enzyme.configure({adapter: new Adapter() })

describe('testing component Login', () =>{
  const initialState = {
    user: {},
    tasks: [],
    currentPage: 1,
    selectedRowKeys: [],
    currentSelectedRowKeys: []
  }

  // const mockStore = configureStore()


  let store:any, wrapper:any

  beforeEach(() =>{
    store =createStore(rootReducer,initialState)
    // store = mockStore(initialState)

    // container = shallow(
    //   <BrowserRouter>
    //   <Switch>
    //   <Login store={store} />
    //   </Switch>
    //   </BrowserRouter>
      
    //   )
    wrapper = mount(<Provider store={store} >
      <BrowserRouter>
      <Switch>
      <Login  />
      </Switch>
      </BrowserRouter>
      
      </Provider>)
  })
  
  it('test', ()=>{
    const my = wrapper.find(ConnectedLogin).prop('user_id')
    console.log(my)
     
    expect (wrapper.find(ConnectedLogin).length).toEqual(1)
    expect(wrapper.find(ConnectedLogin).prop('user_id')).toEqual(initialState.user._id)
  })

  // it('check action on dispatchin', () =>{
  //   let action 
  //   store.dispatch(authorizate({
  //     email:'3434',
  //     password:'3434'
  //   }))

  //   action = store.getActions()

  //   console.log(action);

  //   expect(action[0].type).toBe("AUTHORIZATE")

   
  // })

  it('testing form on submit when user is not logged with empty fields',()=>{
    // console.log("props in component", wrapper.find(ConnectedLogin).props() );
    // console.log(wrapper.find(Redirect).props());
    
    const LoginForm = wrapper.find(Form)
      
    LoginForm.props().onSubmit({preventDefault: jest.fn()})

    // let action = store.getActions()
    // console.log(action);
    
    // const my = props.authorizate.mock.calls[0][0].email;
    // console.log(my);
    
  })

  it('testing onTyping email in Login input',()=>{
    const InputLogin = wrapper.find(Input).at(0)

    InputLogin.props()
    .onChange({target:{value:'newemail',
  name:'email'}})

    expect(wrapper.find(ConnectedLogin).state('email')).toEqual('newemail')
    // InputLogin
    // .simulate('change',{target:{value:'addd'}})
    // expect()
    // .simulate('change',{target:{value:'My new value'}})
    
  })

  it('testing redirect to /todolist when user is logged',()=>{
    store.dispatch({type:'ADD_USER_SUCCESS',payload:{
      _id:'2445'
    }})
    wrapper.update()
    expect(wrapper.find(Redirect).prop('to')).toEqual('/todolist')
  })
  // it('calls',() =>{
  //     console.log(container.prop('user'));
      
  //     expect(container.length).toEqual(1)
  //     // expect(container.prop('user')).toEqual(initialState.user)
  //   // sinon.spy(ConnectedLogin.prototype, 'componentDidMount')
  //   // const wrapper = mount(<ConnectedLogin />)
  // })

})


describe('snapshot', () =>{
  it('snpa1',()=>{
    const renderedValue = renderer.create(<ConnectedLogin />).toJSON()
    expect(renderedValue).toMatchSnapshot()
  } )
})
 
