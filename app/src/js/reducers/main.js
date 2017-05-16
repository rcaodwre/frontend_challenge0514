import {
	SEND,
	UPDATE,
	CHECKFORM
} from '../actions/main'

var stateDefault = {
	loadingStatus:false,
	name:"",
	email:"",
	confirmEmail:""
}
function mainReducer(state = stateDefault,action){

	switch (action.type){
		case  `${SEND}_SUCCESS`:
			console.log(1);
			return Object.assign({},state,{value:action.data});

		case  `${SEND}_ERROR`:
			//mock 硬编码: 处理为成功状态

			


			return Object.assign({},state,{loadingStatus:false,isOpen:false});

		case  UPDATE:
			return Object.assign({},state,action.data);	
		
		case CHECKFORM:
			//表单验证
			if(state.name.length < 3){
				return Object.assign({},state,{message:"用户名不得少于3个字符"});
			};

			if(!(/^([A-Za-z0-9-_.]+)*@([A-Za-z0-9-_.]+)$/).test(state.email)){
				return Object.assign({},state,{message:"请输入正确的邮箱地址"});
			}

			if(state.email != state.confirmEmail ){
				return Object.assign({},state,{message:"两次邮箱地址不一致"});
			}

			return Object.assign({},state,{message:"send"});


		default:
			return  Object.assign({},state);
	}
}

export default  mainReducer