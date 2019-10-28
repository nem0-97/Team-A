import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from "react-router-dom"; 
import CssBaseline from '@material-ui/core/CssBaseline';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import Checkout from './CheckoutPages/Checkout';
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

// TODO(@mannat): Take out/fix
const steps = ['Shipping Address', 'Payment Information', 'Review Your Order'];

class Check extends React.Component{
  constructor(props){
    super(props);
    this.state={
    	error:null,
      	submitted:false,
      	response:null,
      	firstName:"",
      	lastName: "",
        email: "", 

    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleFormChange=this.handleFormChange.bind(this);
  }
}

let checkInfo = {};
function getStepContent(step) {
  switch (step) {
    case 0:
    return <Checkout ref={(checkout) => window.checkout = checkout}/>
    case 1:
      makeRestInfo(1);
      
    case 2:      
      makeRestInfo(2);
      return <h2>Payment Information</h2>;
    default:
      throw new Error('Unknown step');
  }
}
