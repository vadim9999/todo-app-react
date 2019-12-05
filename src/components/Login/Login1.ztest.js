import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import { authorizate } from '../../actions/user';
import Login, {ConnectedLogin} from './Login'
import {Input, Form} from 'antd'
import {Provider} from 'react-redux'
import store from '../../store/index'

import sinon from 'sinon'

Enzyme.configure({adapter: new Adapter() })

function setup({user_id}){
  console.log("call setup");
  
  const props = {
    authorizate: jest.fn(),
    user_id
  }


  const enzymeWrapper = shallow(
      <ConnectedLogin {...props} />
  )
 
  return{
    props,
    enzymeWrapper, 
  
  }
}

describe('Testing ConnectedLogin', () =>{
  describe('Test Not logged user', ()=>{
    
    it('checks component on Input & Input.Password', () =>{
      const {enzymeWrapper} = setup({user_id:''})
      
      const InputPasswordField = enzymeWrapper.find(Input.Password).props()

      const InputField = enzymeWrapper.find(Input).props()
      
      expect(InputField.name).toBe('email')
      expect(InputField.placeholder).toEqual('Enter your email')

      expect(InputPasswordField.name).toBe('password')
      expect(InputPasswordField.placeholder).toEqual('Input password')
    })

    it('Testing button Login',()=>{
      const {enzymeWrapper, props} = setup({user_id:''})
      const InputField = enzymeWrapper.find(Form)
      
      InputField.props().onSubmit({preventDefault: jest.fn()})
      const my = props.authorizate.mock.calls[0][0].email;
      

      // const userId = props.user_id = '1234'
      
      // console.log(props);
      
      // const redirect = enzymeWrapper.find('Redirect').props()
      // console.log(redirect);
      
      
    })

    
  })

  describe('test logged user', ()=>{
    it('should redirect to /todolist', () =>{
      const {enzymeWrapper, props} = setup({user_id:'1'})
      // props.user_id ='124'
      // enzymeWrapper.setProps()
      
      const redirect = enzymeWrapper.find('Redirect').props()
      expect(redirect.to).toEqual('/todolist')
  
    })
  })
})