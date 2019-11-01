/*import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import orderData from '../orderData';
import Paper from '@material-ui/core/Paper';
//import '../checkout.css';
const hidden = require('../../hidden.js');

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            card: "", 
            month: "", 
            year: "",
            operation: "order"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        

    }

    handleFormChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        let data;
        let meth;
        let apiPath = hidden.apiPaths.base + '/Checkout'; 
        if (this.state.operation === 'order') {
            data = {
                "checkout":{
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    card: this.state.card,
                    month: this.state.month,
                    year: this.state.year,
                }
            }
            meth = 'POST'
        }

        const req = {method: meth}

        fetch(apiPath, req)
            .then(res => res.json())
            .then(
                (result) => { this.setState({ submitted: true, response: result }); },
                (error) => { this.setState({ submitted: true, error }); }
            )
        event.preventDefault();
    }

    // TODO(@mannat): total price, address, pickup time. Look at: 
    // https://docs.google.com/drawings/d/12avz1T7cH0vR36rV1BdCg49f1SJ6bsJ3Cba7aP4MF3U/edit?usp=sharing
    render() {
        if (!this.state.submitted) {
            return (
                <Grid container>
                    <Grid item sm={6} className="gridItem marginLeft" >
                        <Typography component="h1" variant="h5" id="tagline">
                            Checkout
                        </Typography>
                            <form onSubmit={this.handleSubmit}>
                            <Paper id="signup-paper">
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
                                            label="Email"
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
                                            id="card"
                                            label="Card Number"
                                            name="card"
                                            onChange={this.handleFormChange}
                                            value={this.state.card}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="month"
                                            label="M"
                                            name="month"
                                            onChange={this.handleFormChange}
                                            value={this.state.month}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="year"
                                            label="Y"
                                            name="year"
                                            onChange={this.handleFormChange}
                                            value={this.state.year}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="cvv"
                                            label="CVV"
                                            name="cvv"
                                            onChange={this.handleFormChange}
                                            value={this.state.cvv}
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
                                    value="Submit">
                                Purchase
                                </Button>
                                </Paper>
                            </form>
                    </Grid>

                    <Grid item sm={5} className="gridItem marginLeft" >
                    <Typography component="h1" variant="h5" id="tagline">
                            Order Details
                        </Typography>
                    <Paper id="signup-paper">

                    <div className="root">
                        <GridList cols={1} cellHeight={180} className="gridList">
                            {orderData.map(tile => (
                                <GridListTile key={tile.img}>
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                />
                        </GridListTile>
                        ))}
                        </GridList>
                    </div>

                         <Typography variant="h6" noWrap >
                            Total:
                         </Typography>
                         <Typography variant="h6" noWrap >
                            Pick-up Time: 
                         </Typography>
                         <Typography variant="h6" noWrap >
                            Address: 
                         </Typography>
                    </Paper>
                    </Grid>    
                </Grid>
            );
        
        }

        return <div>
            <Container component="main" maxWidth="xs">
            <Paper id="signup-paper">
                    <Typography component="h1" variant="h5" id="tagline">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon><br />
                        Your receipt has been emailed to you. Please refer to the email for the address and pickup time.
        </Typography>
            </Paper>
            </Container>
        </div>
    }
}

export default Checkout;*/