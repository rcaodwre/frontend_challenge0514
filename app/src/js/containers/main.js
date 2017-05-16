import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as indexAction from '../actions/main'
import React from "react"

import AlertView from "../components/AlertView.js"

function matchStateToProps(state) {
  return {
    state: state.mainReducer
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    indexAction,dispatch);
}


class Main extends React.Component{
constructor(...args){
	super(...args);
}


componentDidUpdate(){
	if(this.props.state.message == "send"){
		console.log("send");
		this.props.update({message:"",loadingStatus:true})
		var {name,email} = this.props.state;
		this.props.send({name:name,email:email});
	};
}


changeName(self,ev){
	this.props.update({name:ev.target.value});
}
changeEmail(self,ev){
	this.props.update({email:ev.target.value});
}

confirmEmail(self,ev){
	this.props.update({confirmEmail:ev.target.value});
}
alertViewOpen(){
	this.props.update({isOpen:true});
}
alertViewClose(){
	this.props.update({isOpen:false});
}
sendHandle(){
	this.props.checkForm();
}
render(){
	var send;
	if(this.props.state.loadingStatus){
		send = <div className="sendBox loading">sending,please wait...</div>
	}else{
		send = <div onClick={this.sendHandle.bind(this)} className="sendBox">send</div>
	}

	return (
		<section className="body">
			<article>
				<header>
					<div className="headerBox">
						<h1 className="logo">BROCCOLI & CO .</h1>
					</div>
				</header>
				<article className="container">
					<div >
						<h2>A better way <br /> to enjoy every day.  </h2>
						<span>be the first to know when we launch.</span>
						<div className="button" onClick={this.alertViewOpen.bind(this,event)}>Request an invite</div>
					</div>
				</article>
				<footer>
					<div className="footerBox">
						<div>
							<p>Mode with @ in Melbourne.</p>
							<p>@ 2016 Broccoli & Co. All rights reserved.</p>
						</div>
					</div>		
				</footer>
			</article>
			<article>
				<AlertView ref="alertView" isOpen={this.props.state.isOpen}>
					<div className="formBg"  >
						<div className="formBox">
							<h3>Request an invite</h3>
							<p><input placeholder="Full name" onChange={this.changeName.bind(this,event)} value={this.props.state.name} /></p>
							<p><input placeholder="Email" onChange={this.changeEmail.bind(this,event)} value={this.props.state.email} /></p>
							<p><input placeholder="Confirm emall" onChange={this.confirmEmail.bind(this,event)} value={this.props.state.confirmEmail} /></p>
							{send}
							<p className="error">{this.props.state.message}</p>
						</div>
						<div className="formClose close" onClick={this.alertViewClose.bind(this)} ></div>
					</div>	
				</AlertView>
				
			</article>
		</section>
	)
}
}

export default connect(matchStateToProps,matchDispatchToProps)(Main)