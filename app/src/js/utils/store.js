import {
    createStore,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from '../reducers/reducers';

const store = createStore(
    reducer,
    applyMiddleware(promiseMiddleware({
        promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
    }), thunk)
);

export default store;
