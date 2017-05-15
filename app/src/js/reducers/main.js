import {
	SEND
} from '../actions/main'
import {combineReducers} from 'redux';

function mainReducer(state = {},action){
	switch (action.type){
		case  `${SEND}_SUCCESS`:
		console.log(action.payload);
		return Object.assign({},state,{value:action.data});
		
		default:
		return  Object.assign({},state);
	}
}

export default  mainReducer