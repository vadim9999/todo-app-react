import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme';
import sinon from 'sinon'
import Login, { ConnectedLogin } from '../../components/Login/Login'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { Form, Input } from 'antd'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { createStore } from 'redux'
import renderer from 'react-test-renderer'
import { authorizate, addUser } from '../../actions/user'
import rootReducer from '../../reducers/index'
Enzyme.configure({ adapter: new Adapter() })

describe('testing component Login', () => {
  const initialState = {
    user: {},
    tasks: [],
    currentPage: 1,
    selectedRowKeys: [],
    currentSelectedRowKeys: []
  }

  let store: any, wrapper: any

  beforeEach(() => {
    store = createStore(rootReducer, initialState)
    wrapper = mount(
      <Provider store={store} >
        <BrowserRouter>
          <Switch>
            <Login />
          </Switch>
        </BrowserRouter>
      </Provider>)
  })

  it('test', () => {
    const my = wrapper.find(ConnectedLogin).prop('user_id')
    console.log(my)

    expect(wrapper.find(ConnectedLogin).length).toEqual(1)
    expect(wrapper.find(ConnectedLogin).prop('user_id')).toEqual(initialState.user._id)
  })

  it('testing form on submit when user is not logged with empty fields', () => {
    const LoginForm = wrapper.find(Form)

    LoginForm.props().onSubmit({ preventDefault: jest.fn() })
  })

  it('testing onTyping email in Login input', () => {
    const InputLogin = wrapper.find(Input).at(0)

    InputLogin.props()
      .onChange({
        target: {
          value: 'newemail',
          name: 'email'
        }
      })

    expect(wrapper.find(ConnectedLogin).state('email')).toEqual('newemail')
  })

  it('testing redirect to /todolist when user is logged', () => {
    store.dispatch({
      type: 'ADD_USER_SUCCESS', payload: {
        _id: '2445'
      }
    })
    wrapper.update()
    expect(wrapper.find(Redirect).prop('to')).toEqual('/todolist')
  })
})


describe('snapshot', () => {
  it('snpa1', () => {
    const renderedValue = renderer.create(<ConnectedLogin />).toJSON()
    expect(renderedValue).toMatchSnapshot()
  })
})

