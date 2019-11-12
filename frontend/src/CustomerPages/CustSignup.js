
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../PageComponents/Signup.css';
const hidden = require('../hidden.js'); //store api paths here


/*
TODO: 
# Check if email is already used
FIXME:
# fix console errors
*/


class CustSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            submitted: false,
            response: null,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            operation: "signup"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }


    /*
    FIXME:
    # Make possible to use the same component for both customer and restaurant
    */
    handleSubmit(event) {
        let data;
        let meth;
        let apiPath = hidden.apiPaths.base + '/cust'; //this path is defining which API-patch to use #will display like: http://localhost:3000/api/v1/cust
        if (this.state.operation === 'signup') {
            data = {
                "accountinfo":{
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "email": this.state.email,
                    "password": this.state.password
            }
            }
            console.log("data er:" + JSON.stringify(data));
            meth = 'POST'
        }

        const req = { method: meth, headers: { 'Content-Type': 'application/json' } }
        if (meth !== 'GET') {
            req["body"] = JSON.stringify(data); // GET cannot have body:: body data type must match "Content-Type" header 
            console.log(JSON.stringify(data));
        }
        console.log('Sending API request');
        console.log(apiPath);
        console.log(req);

        fetch(apiPath, req)
            .then(res => res.json())
            .then(
                (result) => { this.setState({ submitted: true, response: result }); },
                (error) => { this.setState({ submitted: true, error }); }
            )
        event.preventDefault();
    }

    render() {
        if (!this.state.submitted) {

            return (
                <Container component="main" maxWidth="xs">
                    <Paper id="signup-paper" className="text-center">
                        <div >
                            <Typography component="h1" variant="h5" id="tagline">
                                <i className="material-icons large-icon d-block">local_dining</i>
                                Customer Signup
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
                                            onChange={this.handleFormChange}
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
                                            onChange={this.handleFormChange}
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
                                            onChange={this.handleFormChange}
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
                                            onChange={this.handleFormChange}
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
                                        <Link href="/Login" variant="body2">
                                            Already have an account? Sign in here <i class="material-icons small-icon">account_circle</i>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Paper>
                </Container>
            );
        }
        /* What happens when submit */
        return <div>
            <Container component="main" maxWidth="xs">
                <Paper id="signup-paper">
                    <Typography component="h1" variant="h5" id="tagline">
                        <i className="material-icons green large-icon">check_box</i> <br />
                        Account created successfully
                    </Typography>
                </Paper>
            </Container>
        </div>

    }
}

export default CustSignup;