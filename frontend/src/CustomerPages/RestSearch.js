import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import './restSearch.css';

/*let params = new URLSearchParams(window.location.search);
let lng = params.get('lng');
let lat = params.get('lat');
let restaurants = [];*/

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
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "KM") { dist = dist * 1.609344 }
        return dist;
    }
}

class RestSearch extends React.Component {
    constructor(props) {
        super(props);
        let params = new URLSearchParams(window.location.search);

        this.state = {
            range: 5,
            units: "KM",
            lat:params.get('lat'),
            lng:params.get('lng'),
            inRange: [],
            outRange: []
        }

        console.log("Latitude: " + this.state.lat);
        console.log("Longtitude: " + this.state.lng);
    }

    componentDidMount() { //TODO maybe store in sorted list closest to furthest and store index of last one in range insteead of outRange and inRange lists?
        fetch('https://localhost:3000/api/v1/rest').then(response => { return response.json(); }).then(results => {
            console.log(JSON.stringify(results))
            let nearby = [];
            let farAway = [];

            for (let res of results.results) {
                if (calcDistance(res.restinfo.lat, res.restinfo.lng, this.state.lat, this.state.lng, this.state.units) <= this.state.range) {
                    nearby.push(res);//put in inRange list
                } else {
                    farAway.push(res);
                }
            }
            this.setState({inRange: nearby});
            this.setState({outRange: farAway});
        });
    }

    render() {
        console.log(this.state.inRange);
        return (
            <Container component="main" maxWidth="md">
                <Paper className="containerPadding">
                    <Typography variant="h3" className="text-center">
                        Restaurants located on this location:
              </Typography>
                    <ol>
                        {this.state.inRange.map(rest => <li>{rest.restinfo.restName}</li>)}
                    </ol>
                </Paper>
            </Container>
        );
    }
}

export default RestSearch;