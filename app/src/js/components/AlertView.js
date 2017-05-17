import React from "react"
//弹出层组件
class AlertView extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            isOpen:false,
            height:0
        }
    }
    componentWillMount(){
       

        this.state.backgroundStyle ={
            position:"fixed",
            left:"0px",
            right:"0px",
            bottom:"0px",
            top:"0px",
            backgroundColor:"rgba(0,0,0,0)",
            transition:".3s",
        }
    }
    componentDidMount(){
        this.state.height = this.refs.child.offsetHeight;
        
        this.setState({
            alertStyle:{
                width:"100%",
                height:"100%",
                visibility:"hidden",
                position:"absolute",
                bottom:"0px",
                left:"0px",
                
                transition:".3s",
                transform : `translate3d(0,${this.state.height}px,0)`
            }
        })

      
    }
    componentDidUpdate(){
        this.state.height = this.refs.child.offsetHeight;


    }

    clearEvent(event){
        event.preventDefault();
    }

    checkClose(ev){
        //console.log(ev.target.parentNode.parentNode,this.refs.child);
        // var target = this.getClass(ev.target,"close");
        // while(target){
        //     if(target == this.refs.child){
        //         return
        //     }
        //     target = this.getClass(target.parentNode,"close");
        // }
        // this.props.close();
    }

    getClass(children,className){
        var classAll = children.className.split(" ");
        for(var i=0;i<classAll.length;i++){
            if(classAll[i] == className){
                return false;
            }
        }

        return children;
    }
    render(){

        if(this.props.isOpen == true){
            this.state.backgroundStyle = {
                visibility:"visible",
                position:"fixed",
                left:"0px",
                right:"0px",
                bottom:"0px",
                top:"0px",
                backgroundColor:"rgba(0,0,0,0.5)",
                transition:".3s",
            }
            this.state.alertStyle = {
                visibility:"visible",
                transform :"translate3d(0,0px,0)",
                width:"100%",
                height:"100%",
                position:"absolute",
                bottom:"0px",
                left:"0px",
                transition:".3s"
            }    
        }else{
             this.state.backgroundStyle = {
                visibility:"hidden",
                opacity:"0",
                position:"fixed",
                left:"0px",
                right:"0px",
                bottom:"0px",
                top:"0px",
                backgroundColor:"rgba(0,0,0,0)",
                transition:".3s",
            }
            this.state.alertStyle = {
                visibility:"hidden",
                transform :`translate3d(0,${this.state.height}px,0)`,
                width:"100%",
                height:"100%",
                position:"absolute",
                bottom:"0px",
                left:"0px",
                transition:".3s"
            }    
        }


        return (
            <div style={this.state.backgroundStyle  } >
             
                <div style={this.state.alertStyle } ref="child" >
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default AlertView;
