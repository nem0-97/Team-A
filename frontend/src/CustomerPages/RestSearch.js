import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import './restSearch.css';

let params = new URLSearchParams(window.location.search); 
let lng = params.get('lng');
let lat = params.get('lat');
let restaurants = [];

/*
    This function will calculate the distance between to coordinates
    We are getting one coordinate from the url param, and the other one we will fetch from the database.
    @param lat1 = first latitude coordinate
    @param lng1 = second longtitude coordinate
    @ unit = if it should use metric or miles, KM = metric default is miles
    Credit to:  https://www.geodatasource.com/developers/javascript 
    To test this functionality: http://localhost:3001/RestSearch?lat=37.34880909999999&lng=-121.89608240000001
*/
function calcDistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 === lat2) && (lon1 === lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit==="KM") { dist = dist * 1.609344 }
		return dist;
	}
}

class RestSearch extends React.Component {
    constructor(props) {
        super(props);
        console.log("Latitude: "+lat);
        console.log("Longtitude: "+lng);
        
        async function apiGetAll () {
            try {
              const resp = await fetch('https://localhost:3000/api/v1/rest')
              return resp.json();
            } catch (err) {
                 console.log(err)
              }
         }
         this.data = apiGetAll().then(function(data){
            console.log(data.results.restInfo);
            /*
                 loop through all the fetched data, and see if the coordinates is is less than X away
                 If it is, put it into restaurant array for later to be displayed
            */
            data.results.forEach(item => {
                let lng2 = item.restinfo.lng;
                let lat2 = item.restinfo.lat;
                let distance = calcDistance(lat,lng,lat2,lng2,"m");
                if(distance <= 5){ //If the restaurant is less than 5km away, we will probably have to change this later for the user to change the distance
                    console.log(item.restinfo.restName + " is: " + distance.toFixed(3) + " miles away from (" + lat + "," + lng + ")");
                    restaurants.push(item);
                    console.log(restaurants);
                }
                else {
                    console.log(item.restinfo.restName + " is not within the target range");
                }
               
            });
        });
    }
    
    
    render() {
        /* 
        FIXME: Neoman can you fix why it is not rendering my restaurants array?
        
        */
            return (   
                <Container component="main" maxWidth="md">
                <Paper className="containerPadding">
              <Typography variant="h3" className="text-center">
                  Restaurants located on this location:
              </Typography>
              
              <ol>
      {restaurants.map(restaurants => <li>{restaurants.restinfo.restName}</li>)}
    </ol>
                
              </Paper>
              </Container>
            );
    }
}

export default RestSearch;