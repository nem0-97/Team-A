import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import './restSearch.css';
/*
TODO: 

*/


class RestSearch extends React.Component {
    constructor(props) {
        let params = new URLSearchParams(window.location.search)
        super(props);
        this.state = {
         lng: params.get('lng'),
         lat: params.get('lat'),
        };
        
        console.log(params.get('lat'));
        console.log(params.get('lng'));
    }
    
    render() {
        
            return (   
                <Container component="main" maxWidth="md">
                <Paper className="containerPadding">
              <Typography variant="h3" className="text-center">
                  Restaurants located on this location:
              </Typography>
              <p className="coordinates">
                  lng: {this.state.lng} <br/>
                  lat: {this.state.lat}
              </p>
                
              </Paper>
              </Container>
            );
    }
}

export default RestSearch;