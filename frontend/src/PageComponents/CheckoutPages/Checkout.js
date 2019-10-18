import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
const hidden = require('../hidden.js'); //store api paths here

// const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }


class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            region: "",
            zip: "",
            country: "",
            operation: "signup"
        };

        
        this.handleFormChange = this.handleFormChange.bind(this);
        

    }

    handleFormChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

render() {


            return (
                <Container component="main" maxWidth="xs">
                        <div >

                            <Typography component="h1" variant="h5" id="tagline">

                                Account Information
                               </Typography>
                            <form onSubmit={this.handleSubmit}>
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
                                            id="address1"
                                            label="Address line 1"
                                            name="address1"
                                            onChange={this.handleFormChange}
                                            value={this.state.address1}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="address2"
                                            label="Address line 2"
                                            name="address1"
                                            onChange={this.handleFormChange}
                                            value={this.state.address2}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="city"
                                            label="City"
                                            type="city"
                                            id="city"
                                            onChange={this.handleFormChange}
                                            value={this.state.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="region"
                                            label="State/Province/Region"
                                            type="region"
                                            id="region"
                                            onChange={this.handleFormChange}
                                            value={this.state.region}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="zip"
                                            label="Zip/Postal Code"
                                            type="zip"
                                            id="zip"
                                            onChange={this.handleFormChange}
                                            value={this.state.zip}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="country"
                                            label="Country"
                                            type="country"
                                            id="country"
                                            onChange={this.handleFormChange}
                                            value={this.state.country}
                                        />
                                    </Grid>

                                </Grid>
                            </form>
                        </div>
                </Container>
            );

      

    }
}

export default Checkout;