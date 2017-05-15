import Fetch from "../utils/fetch";
export const SEND = "SEND";
export function send(obj){
	
		
	return {
		type:SEND,

		payload:new Fetch({
			url:" https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
			data:{
				name:"mobbist",
				email:"XXXX@fjkd.com"
			},
			method:"POST",
			hasLoading:true
		})
	}
}