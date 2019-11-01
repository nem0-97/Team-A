import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../index.css';
import RestCard from './RestCard';
import AddressSearch from './AddressSearch';
import NameSearch from './NameSearch';
/*
TODO: 
    #Make it able to search for restaurant by name
*/


class Dashboard extends React.Component {
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
                        <Grid item sm={5} >
                            <AddressSearch />
                        </Grid>
                        <Grid item sm={5} className="marginLeft">
                            <NameSearch/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={5} className="gridBorder gridItem marginLeft" >
                <Typography variant="h6" noWrap >
                        Status
                     </Typography>
                </Grid>
                <Grid item sm={10} className="gridBorder gridItem marginCenter marginTop">
                <Typography variant="h6" noWrap >
                        Favorite Restaurant Component
                     </Typography>
                </Grid>
                <Grid item sm={10} className="gridItem marginCenter marginTop">
                <Typography variant="h5" className="bold text-center heading-padding">
                    All Restaurants in San Jose, CA
                </Typography>
                <RestCard />
                </Grid>
            </Grid>
            );

      

    }
}

export default Dashboard;