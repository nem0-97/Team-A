import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import '../index.css';
import { create } from 'jss';

//Redirect
import { Redirect } from 'react-router'

//Cookies
import Cookies from 'js-cookie';
import { throws } from 'assert';
import { Button } from '@material-ui/core';

/*
TODO: 
    #Make it able to search for restaurant by name
*/


class RestaurantDashboard extends React.Component {
    constructor(props) {
        super(props);
        let use = Cookies.get('userInfo'); //userInfo cookie has 2 props (collection:(restaurant or customer signed in) ID:the user's mongoDB unique ID )
        if (use){
            use = JSON.parse(use);
        }
        // ID is stored as this.state.userInfo.ID
        this.state = {
            userInfo: use,
            loggedIn: (use && use.collection == 'Restaurants'), 
            spots: [],
            orders:[],
            date: "",
            hours: "",
            amount: "",
            price: "",

        }
        if (this.state.loggedIn){
            fetch("https://localhost:3000/api/v1/spot?restID="+use.ID,{method:'GET'})
            .then(res=> res.json())
            .then(s => this.setState({spots : s.results}));
            fetch("https://localhost:3000/api/v1/order?restID="+use.ID,{method:'GET', credentials:'include'})
            .then(res=> res.json())
            .then(o => {console.log(o);this.setState({orders : o.results})});
        }

        this.handleChange = this.handleChange.bind(this);
        this.createSpot = this.createSpot.bind(this);
        this.deleteSpot = this.deleteSpot.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(this.state.price);
    }

    createSpot(){
        console.log("saved");
        const modals = document.getElementsByClassName('modal');
        // on every modal change state like in hidden modal
        for(let i=0; i<modals.length; i++) {
            modals[i].classList.remove('show');
            modals[i].setAttribute('aria-hidden', 'true');
            modals[i].setAttribute('style', 'display: none');
        }

        // get modal backdrops
        const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

        // remove every modal backdrop
        for(let i=0; i<modalsBackdrops.length; i++) {
            document.body.removeChild(modalsBackdrops[i]);
        }
    }

    deleteSpot(ID){
        const req = { method:'DELETE' , credentials:'include' , headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({_id: ID}) };
        fetch("https://localhost:3000/api/v1/spot", req);
    }
    
    render() {
        if(this.state.loggedIn){
            return (
                <div>
                <Grid>
                    <Paper className='w-75 mx-auto' width='75%' >
                        <h2 align="center">Current Orders</h2>                    
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">First Name</TableCell>
                                    <TableCell align="center">Last Name</TableCell>
                                    <TableCell align="center">Item(s)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.orders.map(order=>(
                                        <TableRow>
                                            <TableCell component="th" scope="row">{order.email}</TableCell>
                                            <TableCell align="center">{order.firstName}</TableCell>
                                            <TableCell align="center"> {order.lastName}</TableCell>
                                            <TableCell align="center"> {order.spotID}</TableCell>
                                        </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                <Grid>
                    <Grid>
                       <Paper className='w-75 mx-auto' width='75%' >
                        <h2 align="center">Spots</h2>                    
                        <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="center">Hours</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">ID</TableCell>

                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.state.spots.map(spot=>(
                                        <TableRow>
                                            <TableCell component="th" scope="row">{spot.date}</TableCell>
                                            <TableCell align="center">{spot.hours}</TableCell>
                                            <TableCell align="center"> {spot.taken}/{spot.amount}</TableCell>
                                            <TableCell align="center">${spot.price}</TableCell>
                                            <TableCell align="center">{spot._id}</TableCell>
                                            <TableCell align="center"><Button onClick={()=>{this.deleteSpot(spot._id)}}>X</Button></TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>

                            <Fab color="primary" aria-label="add" className="float-right mt-5" data-toggle="modal" data-target="#spotModal">
                                <AddIcon />
                            </Fab>
                            <div className="modal fade mt-5" id="spotModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog mt-5   " role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"><i className="material-icons icon-height">playlist_add_check
                                        </i> Create new Spot</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form method="POST" action="https://localhost:3000/api/v1/spot">
                                    <div className="modal-body">
                                        
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-6 spotCol">
                                                    <label for="date" className="spotLabel">
                                                        Date for spot
                                                    </label>
                                                    <TextField
                                                        id="date"
                                                        name="date"
                                                        
                                                        required
                                                        type="date"
                                                        margin="normal"
                                                        variant="outlined"
                                                        value={this.state.date}
                                                        onChange={this.handleChange}

                                                    />
                                                </div>
                                                <div className="col-6 mb-2 spotCol">
                                                <label for="hours" className="spotLabel">
                                                        Pickup time (e.g 19pm-21am)
                                                    </label>
                                                    <TextField
                                                        id="hours"
                                                        name="hours"
                                                        margin="normal"
                                                        required
                                                        variant="outlined"
                                                        value={this.state.hours}
                                                        onChange={this.handleChange}
                                                        
                                                    />
                                                </div>
                                                </div>
                                                <div className="row mt-2">
                                                <div className="col-6 spotCol">
                                                <label for="amount" className="spotLabel">
                                                        Amount of available spots
                                                    </label>
                                                    <TextField
                                                        id="amount"
                                                        name="amount"
                                                        margin="normal"
                                                        variant="outlined"
                                                        value={this.state.amount}
                                                        type="number"
                                                        required
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="col-6 spotCol">
                                                <label for="price" className="spotLabel">
                                                        Price pr. spot ($)
                                                    </label>
                                                    <TextField
                                                        id="price"
                                                        name="price"
                                                        required
                                                        margin="normal"
                                                        variant="outlined"
                                                        value={this.state.price}
                                                        type="number"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <span className="note">* This will be shown to the customers immediately</span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary"  type="submit">Save changes</button>
                                    </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                       </Paper>
                       </Grid>
                </Grid>
                </div>
            );
        }else{
            return (<Redirect to="/Login" />);
            //return "Your are not logged in as a restaurant";
        }

    }
}

export default RestaurantDashboard;