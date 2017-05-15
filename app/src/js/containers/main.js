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


componentDidMount(){

}


changeValue(ev){
	
}
alertViewOpen(){
	this.refs.alertView.open();
}
sendHandle(){
	this.props.updateLoadingStatus(true);
	this.props.send({name:"abc"});
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
						<div className="button" onClick={this.alertViewOpen.bind(this)}>Request an invite</div>
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
				<AlertView ref="alertView">
					<div className="formBg">
						<div className="formBox">
							<h3>Request an invite</h3>
							<p><input placeholder="Full name" /></p>
							<p><input placeholder="Emall" /></p>
							<p><input placeholder="Confirm emall" /></p>
							{send}
						</div>
						<div className="formClose close"></div>
					</div>	
				</AlertView>
			</article>
		</section>
	)
}
}

export default connect(matchStateToProps,matchDispatchToProps)(Main)