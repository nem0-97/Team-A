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
      name:"",
      operation:"search"
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    if(event.target.type === 'text'){//text field
      this.setState({name: event.target.value});
    }else{//select
      this.setState({operation: event.target.value});
    }
  }

  handleSubmit(event) {
    let data;
    let meth;
    let apiPath=hidden.apiPaths.base+'/rest';

    if(this.state.operation === 'search'){
      if(this.state.name!==''){
        apiPath+= "?name="+this.state.name;
      }
      meth='GET'
    }else{
      data = {
        "name":this.state.name,
        "location": "SJSU",
        "desc": "A restaurant on SJSU campus",
        "rating": 4
      }
      meth='POST'
    }

    const req={ method: meth, headers: {'Content-Type': 'application/json'} }
    if(meth !== 'GET'){
      req["body"]=JSON.stringify(data) // GET cannot have body:: body data type must match "Content-Type" header 
    }
    console.log('Sending API request');
    console.log(apiPath);
    console.log(req);
  
    fetch(apiPath, req)
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
          <label>
            Operation:
            <select value={this.state.operation} onChange={this.handleChange}>
              <option value="search">Search for A Restaurant by Name</option>
              <option value="add">New Restaurant</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>);
    }
    return <div>{JSON.stringify(this.state.response)}</div>
  }
}

export default RestSignup;
