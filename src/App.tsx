import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';

import Router from './Router';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <div className="main-block">
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();