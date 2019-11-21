import React from 'react';
import {connect} from 'react-redux';
import {decrementValue, incrementValue} from './store/Actions/index';


class App extends React.Component{
  constructor(props){
    super(props);
  }
  increment=(e)=>{
    e.preventDefault();
    this.props.increment();
  }

  decrement=(e)=>{
    e.preventDefault();
    this.props.decrementValue();
  }
  render(){
    return(
      <div>
        <h1>Hello World</h1>
        <h2>State : {this.props.value}</h2>
        <button type="button" onClick={this.increment} >Increment</button>
        <button type="button" onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    value:state.value
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    increment:()=>dispatch(incrementValue()),
    decrementValue:()=>dispatch(decrementValue())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);