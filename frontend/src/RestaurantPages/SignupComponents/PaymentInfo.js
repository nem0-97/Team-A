import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

class PaymentInfo extends React.Component{
    render(){
        return <div>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <h1>Registration summary:</h1>
                        <hr />
                    </Grid>
                    <Grid item xs={6}>
                        <h3>
                            Restaurant information
                        </h3>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4>Restaurant name:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{this.props.restName}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Restaurant address:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{this.props.address} <br /> {this.props.zipCode} {this.props.city}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Operating hours:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{this.props.openTime} - {this.props.closeTime}</p>
                            </Grid> 
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>
                            Account information
                        </h3>
                        <Grid container>
                            <Grid item xs={6}>
                                <h4>Fullname:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{this.props.firstName} {this.props.lastName}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Email:</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <p>{this.props.email}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>;
    }
}
export default PaymentInfo;