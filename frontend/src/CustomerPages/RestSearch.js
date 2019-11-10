import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {  withStyles } from '@material-ui/core/styles';
import './restSearch.css';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';



const useStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      width: '90%',
      margin: '0 auto',
      
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    gridList2: {
        width: '100%',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    root2: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
  });

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
        const {classes} = this.props;
        console.log(this.state.inRange);
        return (
            <Container component="main" maxWidth="md">
               <div>
                <Paper style={{paddingTop: '55px', paddingBottom: '55px'}}>
                <div>
                <Typography variant="h5"  className="mb-4 ml-4">
                        Restaurants located within 5 {this.state.units} of location
                     </Typography>
                    <GridList cellHeight={250} >
                        
                        {this.state.inRange.map(rest => 
                        <GridListTile >
                        <img src={require( "../assets/placeholder.jpg")} alt={rest.restinfo.restName} />
                      
                    <GridListTileBar
                    title={rest.restinfo.restName}
                    subtitle={"$$ | " + rest.restinfo.address + "   | Open Hours: " + rest.restinfo.openTime + "-" + rest.restinfo.closeTime}
                    
                    />
                
                    </GridListTile>
                    
        )}
        </GridList>
        </div>
                    </Paper>
                
            </div>


            </Container>
        );
    }
}

export default RestSearch;