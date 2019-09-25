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
      firstName:"",
      last_name: "",
      email: "",
      password: "",
      operation:"operation"
    };

    this.handleSubmit=this.handleSubmit.bind(this);
  }

  /*handleChange(event){
    //*this.setState({ event.target.id: event.target.value });
    if(event.target.id === 'firstName'){//text field
      this.setState({ first_name: event.target.value});
    }else{//select
      this.setState({operation: event.target.value});
    }
  }*/

handleChangeFirstName = (event) => {
  this.setState({
    firstName: event.target.value
  })
}
handleChangeLastName = (event) =>{
  this.setState({
    lastName: event.target.value
  })
}
handleChangeEmail = (event) =>{
  this.setState({
    email:event.target.value
  })
}
handleChangePassword = (event) =>{
  this.setState({
    password: event.target.value
  })
}

  handleSubmit(event) {
    let data;
    let meth;
    let apiPath = hidden.apiPaths.base +'/cust';
    if (this.state.operation === 'operation') {
      data = {
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
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
      return (
        <Container component="main" maxWidth="xs">
          <Paper id="signup-paper">
          <div >
          
            <Typography component="h1" variant="h5" id="tagline">
              Restaurant Signup
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
                      onChange={this.handleChangeFirstName} 
                      value={this.state.firstName}

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
                      onChange={this.handleChangeLastName}
                      value={this.state.lastName}
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
                      onChange={this.handleChangeEmail}
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
                      onChange={this.handleChangePassword}
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
    return <div>
      <Container component="main" maxWidth="xs">
        <Paper id="signup-paper">
          <Typography component="h1" variant="h5" id="tagline">
            Account created successfully
        </Typography>
        </Paper>
        </Container>
    </div>
  }
}

export default RestSignup;
