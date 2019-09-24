import React from 'react';
import './RestSignup.css';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
      return (<Container component="main" maxWidth="xs">
        <form onSubmit={this.handleSubmit}>
        <label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Name"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </label>


        <label>
        <Typography component="h1" variant="h5">
          Operation:
        </Typography>
          <select value={this.state.operation} onChange={this.handleChange}>
            <option value="search">Search for A Restaurant by Name</option>
            <option value="add">New Restaurant</option>
          </select>
        </label>
        
        
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Submit
          </Button>
      </form>
      </Container>);
    }
    return <div>{JSON.stringify(this.state.response)}</div>
  }
}

export default RestSignup;
