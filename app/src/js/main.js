import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Main from './containers/main';
import main from './reducers/main';
import React from "react"
import ReactDOM from "react-dom";
require("../sass/index.scss");
let store = createStore(main);

ReactDOM.render(
				<Provider store={store}>
					<Main />
				</Provider>,
document.getElementById("content"));