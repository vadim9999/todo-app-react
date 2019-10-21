import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList/TodoList'


import Router from "./Router"

class App extends Component {
  constructor(props) {
    super(props);
    // this.onAddItem = this.onAddItem.bind(this)
  }



  render() {
    return (
      <div class="main-block">
        <Router />
      </div>

    )

  }
}

export default App;
