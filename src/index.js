import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from "redux";
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from './modules/index';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger, promiseMiddleware))
); 
const persistor = persistStore(store);

ReactDOM.render(  
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
