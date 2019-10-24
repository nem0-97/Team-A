import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import './restSearch.css';
/*
TODO: 
    #Google maps dinstance matrix API:
        #calculate distance between searchquery and restaurants - https://developers.google.com/maps/documentation/distance-matrix/start

*/

function getCoordinates(){
   

}

class RestSearch extends React.Component {
    constructor(props) {
        let params = new URLSearchParams(window.location.search)
        super(props);
        this.state = {
        /* gets the query param  */
         lng: params.get('lng'),
         lat: params.get('lat'),
         data: [],
        };
        
        console.log(params.get('lat'));
        console.log(params.get('lng'));
        
    }
    componentDidMount(){
        getCoordinates();
        
        
        //fetch('https://localhost:3000/api/v1/rest').then(response => response.json()).then(response1 => {this.setState({tileData: response1.results})});
        //fetch('https://localhost:3000/api/v1/rest').then(response => response.json()).then(response1 => {this.setState({data: response1})});

        /* FIXME: SHOULD NOT FETCH EVERYTHING
                 RIGHT NOW IT's ALSO fetching password etc from the restaurant collection.
        
        */
        async function apiGetAll () {
            try {
              const resp = await fetch('https://localhost:3000/api/v1/rest')
              
              
              return resp.json();
            } catch (err) {
                 console.log(err)
              }
         }
         this.data = apiGetAll().then(function(data){
            console.log(data.results);
        });;

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