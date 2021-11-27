import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore} from "redux";
import App from './component/App';
import { requestUserReducer } from "./state/reducers";
import reportWebVitals from './reportWebVitals';

export const store = createStore(requestUserReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();