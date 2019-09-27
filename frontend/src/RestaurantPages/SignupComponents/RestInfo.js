import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


/*
TODO: 

*/


class RestInfo extends React.Component {
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


        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }


    /*
    FIXME:
   
    */


    render() {
        if (!this.state.submitted) {

            return (
                <Container component="main" maxWidth="xs">
                    <div >

                        <Typography component="h1" variant="h5" id="tagline">

                            Restaurant Information
                               </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="rname"
                                        name="restName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="restName"
                                        label="Restaurant Name"
                                        autoFocus
                                        onChange={this.handleFormChange}
                                        value={this.state.firstName}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        onChange={this.handleFormChange}
                                        value={this.state.email}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel htmlFor="age-native-simple">Cuisine</InputLabel>
                                    <Select
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="Cuisine"

                                    >
                                        <option value="" />
                                        <option value={10}>American</option>
                                        <option value={20}>Chineese</option>
                                        <option value={30}>Danish</option>
                                    </Select>

                                </Grid>
                                <Grid item xs={6}>

                                    <TextField
                                        id="time"
                                        label="Open time"
                                        type="time"
                                        defaultValue="07:30"
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <TextField
                                        id="time"
                                        label="Close time"
                                        type="time"
                                        defaultValue="07:30"
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            );
        }


    }
}

export default RestInfo;