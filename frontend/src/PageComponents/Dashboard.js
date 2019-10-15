import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../index.css';


/*
TODO: 

*/

const gridItem = {
    border: '1px solid',
    textAlign: 'center',
    padding: '55px',
    marginBottom: '10px',
}
const marginLeft = {
    marginLeft: '45px',
}
const marginCenter = {
    margin: '0 auto',
}
const marginTop = {
    marginTop: '25px',
}


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };

        

        

    }



    

    render() {


            return (
                <Grid container >
                <Grid item sm={6} className="gridItem marginLeft" >
                    <Typography variant="h6" noWrap >
                        Address Component
                     </Typography>
                </Grid>
                <Grid item sm={5} className="gridItem marginLeft" >
                <Typography variant="h6" noWrap >
                        Status
                     </Typography>
                </Grid>
                <Grid item sm={10} className="gridItem marginCenter marginTop">
                <Typography variant="h6" noWrap >
                        Favorite Restaurant Component
                     </Typography>
                </Grid>
                <Grid item sm={10}  className="gridItem marginCenter marginTop">
                <Typography variant="h6" noWrap >
                        All Restaurant Component
                     </Typography>
                </Grid>
            </Grid>
            );

      

    }
}

export default Dashboard;