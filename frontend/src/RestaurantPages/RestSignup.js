import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountInfo from './SignupComponents/AccountInfo';
import RestInfo from './SignupComponents/RestInfo';
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
let restInfo = {};
function getStepContent(step) {
  switch (step) {
    case 0:

      return <RestInfo ref={(restinfo)=>window.restinfo=restinfo}/> ;
    case 1:
      makeRestInfo(1);
      return <AccountInfo ref={(accountinfo) => window.accountinfo = accountinfo}/>
    case 2:      
      makeRestInfo(2);
      return <h2>Payment Information</h2>;
    default:
      throw new Error('Unknown step');
  }
}

function makeRestInfo(step){

  if(step === 1){
  restInfo.restinfo = {
      restName: window.restinfo.state.restName,
      address: window.restinfo.state.address,
      cuisine: window.restinfo.state.cuisine,
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
  let meth = "POST";
  let apiPath = hidden.apiPaths.base + '/rest'; //this path is defining which API-patch to use #will display like: http://localhost:3000/api/v1/cust
  const req = { method: meth, headers: { 'Content-Type': 'application/json' } }
  req["body"] = JSON.stringify(data);
  console.log(req);
  /* FIXME: Need to implement exception */
  fetch(apiPath, req)
    .then(res => res.json())
}

export default function CreateRest() {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextBtn = () => {
    setActiveStep(activeStep + 1);
  };


  return (
    <form noValidate onSubmit={e => { e.preventDefault(); }}>
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