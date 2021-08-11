import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import rootReducer from './modules/index';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { applyMiddleware, createStore } from "redux";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';


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
