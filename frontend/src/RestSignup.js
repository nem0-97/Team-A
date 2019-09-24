import React from 'react';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
      operation:"operation"
    };
   /* this.handleChange=this.handleChange.bind(this);*/
    this.handleSubmit=this.handleSubmit.bind(this);
  }

/*  handleChange(event){
    if(event.target.type === 'text'){//text field
      this.setState({name: event.target.value});
    }else{//select
      this.setState({operation: event.target.value});
    }
  }*/

  handleSubmit(event) {
    let data;
    let meth;
    let apiPath = hidden.apiPaths.base +'/cust';

    if(this.state.operation === 'operation'){
      data = {
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "email": this.state.email,
        "password": this.state.password
      }
      console.log("data er:" + JSON.stringify(data));
      meth = 'POST'
    }

    const req={ method: meth, headers: {'Content-Type': 'application/json'} }
    if(meth !== 'GET'){
      req["body"]=JSON.stringify(data); // GET cannot have body:: body data type must match "Content-Type" header 
      console.log(JSON.stringify(data));
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
      return (/*<form onSubmit={this.handleSubmit}>
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
        
        <Button variant="contained" color="primary" type="submit" value="Submit">
          Search
    </Button> */

        <Container component="main" maxWidth="xs">
<Paper id="signup-paper">
          <div >
          
            <Typography component="h1" variant="h5" id="tagline">
              Customer signup
        </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={this.state.first_name}
                 onChange={this.changeHandler} 

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={this.state.last_name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={this.state.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                id="signup-button"
                value="Submit"
              >
                Sign up!
          </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in here
              </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          </Paper>
        </Container>

        /*</form>*/);
    }
    return <div>{JSON.stringify(this.state.response)} </div>
  }
}

export default RestSignup;
