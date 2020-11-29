
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootSagas from './sagas';
// import thunk from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import immutableTransform from 'redux-persist-transform-immutable';

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    //
    sagaMiddleware,
    // thunk,
  ];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    });

    middlewares.push(logger);
  }

  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage: AsyncStorage,
    keyPrefix: '',
    whitelist: ['LoginReducer', 'cachingFile'], // only  will be persisted
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSagas);

  return [store, persistor];
};