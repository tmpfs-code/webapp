import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { App } from './components/App';
import './i18n';
import './index.css';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
