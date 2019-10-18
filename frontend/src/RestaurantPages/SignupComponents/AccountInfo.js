import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/*
    This component handles all acountinfo for the restaurant signup
*/
class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
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
                            </form>
                        </div>
                </Container>
            );

      

    }
}

export default AccountInfo;