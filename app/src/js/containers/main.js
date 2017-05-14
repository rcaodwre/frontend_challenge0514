import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as indexAction from '../actions/main'
import React from "react"

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
componentDidMount(){

	//console.log(this) 
}


changeValue(ev){
	this.props.update(ev.target.value);
}
render(){

	return (
		<section className="body">
			<header>
				<div className="headerBox">
					<h1 className="logo">BROCCOLI & CO .</h1>
				</div>
			</header>
			<article></article>
			<footer>
				<div className="footerBox">
					<div>
					<p>Mode with @ in Melbourne.</p>
					<p>@ 2016 Broccoli & Co. All rights reserved.</p>
					</div>
				</div>		
			</footer>
		</section>
	)
}
}

export default connect(matchStateToProps,matchDispatchToProps)(Main)