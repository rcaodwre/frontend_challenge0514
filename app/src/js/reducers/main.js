import {
	UPDATE
} from '../actions/main'
import {combineReducers} from 'redux';

function mainReducer(state = {},action){
	switch (action.type){
		case UPDATE:
		return Object.assign({},state,{value:action.data});

		default:
		return  Object.assign({},state,{abc:"123"});
	}
}


const app = combineReducers({
	mainReducer
})

export default app;