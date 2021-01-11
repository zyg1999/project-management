import { common } from './common';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

let composeEnhancers = compose;
// if (isDebug()) {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }
const store = createStore(
  combineReducers({
    common: common.register,
  }),
  composeEnhancers(applyMiddleware(thunk)),
)
export default store;
