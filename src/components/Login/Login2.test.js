import React from 'react'
import Enzyme,{mount, shallow } from 'enzyme';
import sinon from 'sinon'
import Login,{ConnectedLogin} from './Login'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import {Form} from 'antd'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import renderer from 'react-test-renderer'
import {authorizate} from '../../actions/user'
import rootReducer from '../../reducers/index'
Enzyme.configure({adapter: new Adapter() })

describe('Login', () =>{
  const initialState = {
      user:{
      
      }
  }

  const mockStore = configureStore()

  let store, wrapper

  beforeEach(() =>{
    store = mockStore(initialState)
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

  it('check action on dispatchin', () =>{
    let action 
    store.dispatch(authorizate({
      email:'3434',
      password:'3434'
    }))

    action = store.getActions()

    console.log(action);

    expect(action[0].type).toBe("AUTHORIZATE")

   
  })

  it('testing form on submit',()=>{
    const InputField = wrapper.find(Form)
      
    InputField.props().onSubmit({preventDefault: jest.fn()})

    let action = store.getActions()
    console.log(action);
    
    // const my = props.authorizate.mock.calls[0][0].email;
    // console.log(my);
    
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

describe('testing', ()=>{

  it('action',()=>{
    const auth = authorizate({email:'33', password:'33'})
    expect(auth).toEqual({type:'AUTHORIZATE', payload:{email:'33', password:'33'}}) 
  })

  it('reducers', ()=>{
    let state = {
      user:{}
    }

    state = rootReducer(state,{type:"AUTHORIZATE_SUCCESS",
    payload: {
      _id:'o2'
    
  }})

    expect(state).toEqual({user:{
      _id:'o2'
    }})

  })
  })
 
