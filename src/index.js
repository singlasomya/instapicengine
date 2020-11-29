import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'
import {PersistGate} from 'redux-persist/integration/react';

import Project from './components/Project';
import * as serviceWorker from './serviceWorker';
import rootSaga from './sagas'
import {configureStore} from './store';

const [store, persistor] = configureStore();

// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <Project />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
