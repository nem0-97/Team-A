import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
                <Grid container >
                <Grid item sm={6} className="gridBorder gridItem marginLeft" >
                    <Grid container>
                       <Paper>
                            <Grid item sm={5} >

                        </Grid>
                        <Grid item sm={5} className="marginLeft">

                        </Grid>
                       </Paper>
                    </Grid>
                </Grid>
               
                
               
            </Grid>
            );

      

    }
}

export default RestaurantDashboard;