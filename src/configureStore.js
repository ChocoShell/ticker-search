import { compose, createStore, applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import rootReducer  from './reducers';
import logic  from './logic';

const logicMiddleware = createLogicMiddleware(logic);

const middleware = applyMiddleware(
  logicMiddleware
);

// using compose to allow for applyMiddleware, just add it in
const enhancer = compose(
  middleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function configureStore() {
  const store = createStore(
    rootReducer,
    enhancer
  );
  return store;
}
