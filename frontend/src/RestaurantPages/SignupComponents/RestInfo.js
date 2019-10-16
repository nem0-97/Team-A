import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Autocomplete from 'react-google-autocomplete';

/*
TODO: 

*/


class RestInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restName: "",
            address: "",
            lng:"",
            lat:"",
            openTime: "",
            closeTime: "",
            city:"",
            zipCode:"",
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


            return (
                <Container component="main" maxWidth="xs">
                    <div >

                        <Typography component="h1" variant="h5" id="tagline">

                            Restaurant Information
                               </Typography>
                        <form  onSubmit={this.handleSubmit}>
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
                                        value={this.state.restName}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                 
                                      <Autocomplete
                                            style={{width: '100%'}}
                                            variant="outlined"
                                            required
                                            onPlaceSelected={(place) => {
                                                console.log(place.geometry.location.lat());
                                                console.log(place);
                                                this.state.lat = place.geometry.location.lat();
                                                this.state.lng = place.geometry.location.lng();
                                                this.state.address = place.formatted_address;
                                            }}
                                            className="form-control"
                                            id="standard-search"
                                            label="Search field"
                                            type="search"
                                            types={['address']}	
                                            componentRestrictions={{country: "us"}}
                                            onChange={this.handleFormChange}
                                     />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        name="city"
                                        onChange={this.handleFormChange}
                                        value={this.state.city}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="zipCode"
                                        label="Zip code"
                                        name="zipCode"
                                        onChange={this.handleFormChange}
                                        value={this.state.zipCode}
                                    />
                                </Grid>

                                <Grid item xs={6}>

                                    <TextField
                                        id="openTime"
                                        label="Open time"
                                        type="time"
                                        defaultValue="07:30"
                                        variant="outlined"
                                        fullWidth
                                        onChange={this.handleFormChange}
                                        value={this.state.openTime}
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
                                        id="closeTime"
                                        label="Close time"
                                        type="time"
                                        defaultValue="07:30"
                                        variant="outlined"
                                        fullWidth
                                        onChange={this.handleFormChange}
                                        value={this.state.closeTime}
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

export default RestInfo;