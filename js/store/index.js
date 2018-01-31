import { 
  compose,
  createStore,
  applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';

import callAPIMiddleware from '../libs/callAPIMiddleware'
import reducers from '../reducers';

// Setup all of your middlewares here
const middlewares = [thunk, callAPIMiddleware];

const configureStore = () => {
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middlewares)),
  )

  return { store };
}

export default configureStore;