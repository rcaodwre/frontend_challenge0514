import {
	SEND,
	UPDATELOADINGSTATUS
} from '../actions/main'
import {combineReducers} from 'redux';
var stateDefault = {
	loadingStatus:false
}
function mainReducer(state = stateDefault,action){

	switch (action.type){
		case  `${SEND}_SUCCESS`:
			console.log(1);
			return Object.assign({},state,{value:action.data});

		case  `${SEND}_ERROR`:
			console.log(2);
			return Object.assign({},state,{loadingStatus:false});

		case  UPDATELOADINGSTATUS:
			console.log("reduce",action.data);
			var obj = Object.assign({},state,{loadingStatus:action.data})

			return Object.assign({},state,{loadingStatus:action.data});	

		default:
			return  Object.assign({},state);
	}
}

export default  mainReducer