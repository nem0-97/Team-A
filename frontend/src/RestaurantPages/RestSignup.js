import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import AccountInfo from './SignupComponents/AccountInfo';
import RestInfo from './SignupComponents/RestInfo';
import PaymentInfo from './SignupComponents/PaymentInfo';
const hidden = require('../hidden.js'); //store api paths here

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 720,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


const steps = ['Restaurant Information', 'Account Information', 'Payment information'];


/*
TODO: 
# Check if email is already used
# Make signup/login page default view
FIXME:
# fix console errors
# redirect when successful
*/


class RestSignup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error:null,
      submitted:false,
      response:null,
      firstName:"",
      lastName: "",
      email: "",
      password: "",
      operation:"signup"
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleFormChange=this.handleFormChange.bind(this);
  }
}
let restInfo = {};
function getStepContent(step) {
  switch (step) {
    case 0:

      return <RestInfo ref={(restinfo) => window.restinfo = restinfo} />;
    case 1:
      makeRestInfo(1);
      return <AccountInfo ref={(accountinfo) => window.accountinfo = accountinfo}/>
    case 2:      
      makeRestInfo(2);
      return <PaymentInfo 
      restName={restInfo.restinfo.restName}
      address={restInfo.restinfo.address}
      city={restInfo.restinfo.city}
      zipCode={restInfo.restinfo.zipCode}
      openTime={restInfo.restinfo.openTime}
      closeTime={restInfo.restinfo.closeTime}
      firstName={restInfo.accountinfo.firstName}
      lastName={restInfo.accountinfo.lastName}
      email={restInfo.accountinfo.email} />
    default:
      throw new Error('Unknown step');
  }
}

function makeRestInfo(step){

  if(step === 1){
  restInfo.restinfo = {
      restName: window.restinfo.state.restName,
      address: window.restinfo.state.address,
      city: window.restinfo.state.city,
      zipCode: window.restinfo.state.zipCode,
      openTime: window.restinfo.state.openTime,
      closeTime: window.restinfo.state.closeTime
    }
    console.log(restInfo);
  }
  else if (step === 2){
    restInfo.accountinfo = {
      firstName: window.accountinfo.state.firstName,
      lastName: window.accountinfo.state.lastName,
      email: window.accountinfo.state.email,
      password: window.accountinfo.state.password
    }
    console.log(restInfo);
  }
}

function handleSubmit(){
 
  let data = restInfo;
  let meth = "GET";
  let apiPath = hidden.apiPaths.base + '/rest'; //this path is defining which API-patch to use #will display like: http://localhost:3000/api/v1/cust
  let isSubmitted = false; //check if there has already been a submit
  let submit = false; //decides if the func should submit or not
  if(!isSubmitted && !submit){
  /* this function will check if the restaurant is already registered  */
  
    fetch(apiPath + "/" + data.restinfo.restName)
      .then(response => {
        return response.json();
      }).then(results => {
        /* FIXME: */
          /* If there is less than 1 restaurants with that name */
          if(results.results.length < 1){
            submit = true;
            submitRequest();
            console.log("There is no restaurants with that name");
          }
          /* if there is one restaurant with that name */
          else if(results.results.length >= 1){
            alert("There is one or more restaurants with that name");
            window.location.replace("/Restaurant")
            submit = false; 
          }
      }).catch(error => {
        console.log(error);
      });
    console.log(submit);
  }

  /**THIS CODE SUBMITS THE RESTAURANT */
  function submitRequest(){
    meth = "POST";
    const req = { method: meth, headers: { 'Content-Type': 'application/json' } }
    req["body"] = JSON.stringify(data);
    console.log("FETCHING POST to REST API...");
    fetch(apiPath, req)
      .then(res => res.json()).then(window.location.replace("/")) //Redirect
      .catch(error => console.log(error));
    }
    
}

export default function   Rest() {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextBtn = () => {
    setActiveStep(activeStep + 1);
  };
 

  return (
    <form  onSubmit={e => { e.preventDefault(); }}>
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
              Create Restaurant
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>

              </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                      
                    {activeStep !== steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNextBtn}
                      className={classes.button}
                    >
                      Next
                    </Button>

                    ) : (
                        <Button
                          variant="contained"
                          color="primary"
                            onClick={handleSubmit}
                          
                        >
                          Create Restaurant
                          
                        </Button>
                    )}
                      

                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>

      </main>
    </React.Fragment>
    </form>
  );
}