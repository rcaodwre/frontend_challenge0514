import Fetch from "../utils/fetch";
export const SEND = "SEND";
export const UPDATE = "UPDATE";
export const CHECKFORM = "CHECKFORM";



export function send(obj){
	console.log(obj);
	return {
		type:SEND,
		payload:new Fetch({
			url:" https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
			data:obj,
			method:"POST",
			hasLoading:true
		})
	}
}


export function update(obj){
		return {
			type:UPDATE,
			data:obj
		}
}

export function checkForm(){
		return {
			type:CHECKFORM
		}
}
