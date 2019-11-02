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

/*
TODO: 
    #Make it able to search for restaurant by name
*/


class RestaurantDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            hours: "",
            amount: "",
            price: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(this.state.price);
    }

    render() {
            return (
                <Grid>
                    <Grid>
                       <Paper className='w-75 mx-auto' width='75%' >
                        <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="center">Hours</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                    <TableCell component="th" scope="row">
                                        {this.state.date}
                                    </TableCell>
                                    <TableCell align="center">7:00pm - 12:00am</TableCell>
                                    <TableCell align="center"> 0/50</TableCell>
                                    <TableCell align="center">123</TableCell>
                                    </TableRow>
                                
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
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                       </Paper>
                       </Grid>
                </Grid>
            );

      

    }
}

export default RestaurantDashboard;