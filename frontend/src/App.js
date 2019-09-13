import React from 'react';
import logo from './logo.svg';
import './App.css';
const hidden = require('./hidden.js'); //store api paths here

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error:null,
      loaded:false,
      response:null
    };
  }

  componentDidMount() {
    let data = {
      "name":"Steak n Shake",
      "location": "SJSU",
      "desc": "A reestaurant on SJSU campus",
      "rating": 4
    }
    console.log('Sending API request');
    fetch(hidden.apiPaths.base+'/rest', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      //body: JSON.stringify(data) // GET cannot have body:: body data type must match "Content-Type" header 
    })
    .then(res => res.json())
    .then(
      (result) => {this.setState({loaded: true,response: result});},
      (error) => {this.setState({loaded: true, error});}
    )
  }

  render(){
    const {error,loaded,response} = this.state;
    console.log(loaded);
    if(error){
      return <div> Error: {error.message}</div>;
    }
    if (!loaded){
      return <div> Loading ...</div>;
    }
    return <div>{JSON.stringify(response)}</div>;
  }
}

export default App;
