import { render,unmountComponentAtNode} from 'react-dom'
import React from 'react'
import {act} from 'react-dom/test-utils'

import Login from './Login'
import Hello from './Hello'

import Toggle from './Toggle'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

let container = null;

beforeEach(() =>{
  console.log("before Each");
  
  container = document.createElement('div');
  document.body.appendChild(container)
})

afterEach(()=>{
  console.log("after Each");
  
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})


describe("Testing react components", () =>{
  // it("renders with or without a name", () =>{
  //   act(() =>{
  //     render(<Hello />, container)
  //   })
  //   console.log(container.textContent);
    
  //   expect(container.textContent).toBe("Hey, stranger")
    
   
    
  // })

  // it("pass props into Hello component", () =>{
  //   console.log("container", container);
    
  //   act(() =>{
  //     render(<Hello name="Jenny" />, container)
  //   })
  //   console.log("container After", container);
    
  //   expect(container.textContent).toBe("Hello, Jenny!")
  // })

  it('changed when button was clicked', () =>{
    const onChange = jest.fn();

    act(() =>{
      render(<Toggle onChange={onChange} />, container)
    })

    const button = document.querySelector("[data-testid=toggle]")
    console.log("button", button);
    
    expect(button.innerHTML).toBe("Turn on")

    act(()=>{
      button.dispatchEvent(new MouseEvent("click", {bubbles:true}))
    })

    expect(onChange).toHaveBeenCalledTimes(1);
    
  })

  
})
