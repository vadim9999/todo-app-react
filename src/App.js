import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList'
import Post from "./components/Posts";

class App extends Component {
  constructor(props){
    super(props);
    // this.onAddItem = this.onAddItem.bind(this)
  }

  

  render() {
    return(
      <div className="App">
        <TodoList />
        {/* <Post /> */}
      </div>
    )
    
  }
}

export default App;
