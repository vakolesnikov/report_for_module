import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import View from './containers/View';
import './normalize.css';
import { initApp, updateReport } from './asyncActions';

const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(initApp);
setInterval(() => store.dispatch(updateReport), 30 * 1000);

ReactDOM.render(
    <Provider store={store}>
        <View />
    </Provider>,
    document.getElementById('root')
);
