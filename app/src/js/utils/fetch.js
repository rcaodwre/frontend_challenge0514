"use strict"
let reqCount = 0;
let _fetch = window.fetch;
//对Fetch API进行扩展
 class Fetch{
	 constructor(option={}) {
			this.option=option;
			return this.fetch(option);
		}
		// @param {object} option 请求参数对象
		// @return {promise} fetch
		fetch(option){
			reqCount++;
			deleteUndefined(option);
			//合并config配置
			option=Object.assign({},this.option,option);
			
			//结构, 在结构体内赋值则代表设默认值
			let {url,method='GET',hasLoading}=option;

			//loading处理
			if(hasLoading == true) this.showLoading();

			//this.addParams(option);

			//生成所需要到的url, 并将params参数转为URL拼接
			url = buildUrl(url,paramSerializer(option.params));
			this.handleBody(option);//请求body处理
			//这里因为对对象使用了扩展运算符, 所以需要babel的presets中的stage-0支持
			return _fetch(url,{
				method,
				...option.configs
			})
			.then((args)=>this.checkStatus(args))   //没有
			.then((args)=>this.parseJSON(args))
			.catch((args)=>this.catchParseJSON(args))
			.then((args)=>this.checkCode(args))
			//catch 是处理失败的返回
		}
		//成功回调,这里返回把数据Promise返回
		checkStatus(response){
			reqCount--
			if(reqCount==0){
				this.hideLoading();//请求数为零，隐藏loading
			}
			return  Promise.resolve(response);
		}
		//返回数据,讲数据以json的格式返回
		parseJSON(response){
			
			return response.text();
		}
		//如果没有成功返回, 或者数据无法json序列化,则会走这里
		catchParseJSON(err){
			
			console.log("data Error:"+err);
			return Promise.reject();
		}
		//这里对返回的数据进行检查,根据后端的返回值Code 可以进行一部分的统一处理
		checkCode(response){
			return Promise.resolve(response);
		}

		/*@description 根据ContentType系列化参数*/
		handleBody(option){
			let {method,headers={},data={}}=option;
			if(method.toUpperCase()=='POST'){
				option.configs=Object.assign({},option.configs) ||{};
				if(headers['Content-Type']==undefined){
					option.configs.headers=Object.assign({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',Accept:'application/json, text/plain, */*'},headers);
				}
				option.configs.body=option.configs.headers['Content-Type'].indexOf('x-www-form-urlencoded')>-1&&(typeof data=='object')?serialize(data):data;
			}
		}

		//@description 添加url参数
		addParams(){}

		


		//展示loading效果
		showLoading(){
			console.log("loading...");
		}
		//关闭loading效果
		hideLoading(){

		}

	
}
//@param {object} params  
//@return {string} 
//@
function paramSerializer(params={}){
	var parts = [];
	Object.keys(params).forEach((key)=>{
		
		if(typeof params[key]!=='object'&& params[key]!==undefined)
			parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
	})
	return parts.join('&');
}

function serialize(data){
	var strs=[];
	Object.keys(data).forEach((key)=>{
		paramsCollection(data[key],key,strs);
	})
	return strs.join('&');
}

//相当于剔除值为undefined的键值对
function	deleteUndefined(obj){
	
			for(let key in obj){
				if(obj[key] === undefined){
					delete obj[key];
				};
			}
			return obj
}

function buildUrl(url, serializedParams) {
	if (serializedParams.length > 0) {
		url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams;
	}
	return url;
}

function paramsCollection(data,prefix,strs){
	if (typeof data==='object' && data!=undefined) {
		Object.keys(data).forEach((key)=>{
			var pref = prefix + '[' + key + ']';
			paramsCollection(data[key], pref, strs);
		})

	} else if(data!==undefined) {
		strs.push(encodeURIComponent(prefix) + '=' + encodeURIComponent(data));
	}
}

export default Fetch