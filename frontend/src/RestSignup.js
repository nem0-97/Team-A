import React from 'react';
import './RestSignup.css';
const hidden = require('./hidden.js'); //store api paths here

class RestSignup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error:null,
      submitted:false,
      response:null,
      name:""
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    let data = {
      "name":this.state.name,
      "location": "SJSU",
      "desc": "A restaurant on SJSU campus",
      "rating": 4
    }
    console.log('Sending API request');
    fetch(hidden.apiPaths.base+'/rest', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // GET cannot have body:: body data type must match "Content-Type" header 
    })
    .then(res => res.json())
    .then(
      (result) => {this.setState({submitted: true,response: result});},
      (error) => {this.setState({submitted: true, error});}
    )
    event.preventDefault();
  }

  render(){
    if(!this.state.submitted){
      return (<form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>);
    }
    return <div>{JSON.stringify(this.state.response)}</div>
  }
}

export default RestSignup;
