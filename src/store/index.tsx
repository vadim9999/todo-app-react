import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';
import { forbiddenWordsMiddleware } from '../middleware';
import apiSaga from '../sagas/api-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialiseSagaMiddleware = createSagaMiddleware();


// const store = createStore(rootReducer,
//     storeEnhancers(
//         applyMiddleware(forbiddenWordsMiddleware, thunk)
//         )
//         );

const store = createStore(
  rootReducer,
    composeWithDevTools(
      applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware),
    )
);

initialiseSagaMiddleware.run(apiSaga);

export default store;
