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
        };
    }

    render() {
            return (
                <Grid>
                    <Grid>
                       <Paper className='w-75 mx-auto' width='75%' overflowX= 'auto'>
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
                                        restaurant
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
                                        <h5 className="modal-title" id="exampleModalLabel">Add Spot</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-6">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Date"
                                                        margin="normal"
                                                        variant="outlined"
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Hours"
                                                        margin="normal"
                                                        variant="outlined"
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Amount"
                                                        margin="normal"
                                                        variant="outlined"
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Price"
                                                        margin="normal"
                                                        variant="outlined"
                                                    />
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