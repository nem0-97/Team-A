import React from 'react';
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
        let params = new URLSearchParams(window.location.search);
        super(props);
        this.state = {
            searchVal: params.get("id"),
            firstName: "",
            lastName: "",
            email: "",
            card: "", 
            month: "", 
            year: "",
            operation: "order",
            tileData: [],
            tileData2:[]
        };

        this.handleFormChange = this.handleFormChange.bind(this);

    }

    handleFormChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
     componentDidMount(){
         fetch('https://localhost:3000/api/v1/spot?_id='+ this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({tileData: response1.results}, console.log(response1.results))}).then(
          () => fetch('https://localhost:3000/api/v1/rest?_id='+ this.state.tileData[0].restID).then(response => response.json()).then(response1 => {this.setState({tileData2: response1.results}, console.log(response1.results))})  
        );
    

      
    }
 
    
   

    render() {

        

            return (
                <Grid container>
                    <Grid item sm={6} className="gridItem marginLeft" >
                        <Typography component="h1" variant="h5" id="tagline">
                            Checkout
                        </Typography>
                            <form action="https://localhost:3000/api/v1/order" method="POST" >
                            <Paper id="signup-paper">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <input name="spotID" value={this.state.tileData[0]?this.state.tileData[0]._id:"" } hidden></input> 
                                        <input name="restID" value={this.state.tileData2[0]?this.state.tileData2[0]._id:"" } hidden></input> 
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
                                            type="email"
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

                        
                        <Typography variant="h6" noWrap >
                            Restaurant: {this.state.tileData2[0]?this.state.tileData2[0].restinfo.restName:""}
                         </Typography>
                         <Typography variant="h6" noWrap >
                            Address: {this.state.tileData2[0]?this.state.tileData2[0].restinfo.address:""}
                         </Typography>
                         <Typography variant="h6" noWrap >
                            Price: ${this.state.tileData[0]?this.state.tileData[0].price:""}
                         </Typography>
                         <Typography variant="h6" noWrap >
                            Date for pick-up: {this.state.tileData[0]?this.state.tileData[0].date:""}
                         </Typography>
                         <Typography variant="h6" noWrap >
                            Pick-up Time: {this.state.tileData[0]?this.state.tileData[0].hours:""}
                         </Typography>
                         
                    </Paper>
                    </Grid>    
                </Grid>
            );
    
        

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

export default Checkout;