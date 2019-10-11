import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

//import tileData from './tileData';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Badge from '@material-ui/core/Badge';
import ListSubheader from '@material-ui/core/ListSubheader';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Autocomplete from 'react-google-autocomplete';
let tileData = []

const useStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    gridList2: {
        width: 1000,
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    avatar: {
        position: "absolute",
        right: 200,
    },
    root2: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      root3: {
      }
  });
  
class RestCard extends React.Component{
        constructor(props){
          super(props);
          this.state={
              tileData:[]
          }
        }
        componentDidMount() {
            fetch('https://localhost:3000/api/v1/rest').then(response => response.json()).then(response1 => {this.setState({tileData: response1.results})});
        }

        render() {
            //console.log(this.state.tileData)
            const {classes} = this.props;
            return (
                <div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh' }}>
                    <Autocomplete
                        onPlaceSelected={(place) => {
                        console.log(place.geometry.location.lat());
                        console.log(place.geometry.location.lng())
                        }}
                        types={['address']}
                        componentRestrictions={{country: "us"}}
                    />
                </div>
    
                <div className={classes.root3}>
                    {/* <GoogleMapsContainer />      */}
                </div>
                <div className={classes.root}>
                    <GridList className={classes.gridList} cols={2.5}>
                        {this.state.tileData.map(tile => (
                            <GridListTile key={tile._id}>
                                <img src={require( "./food.png")} alt={tile.restinfo.restName} />
                                <GridListTileBar
                                    title={tile.restinfo.restName}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                }}
                                actionIcon={
                                    <IconButton aria-label={`star ${tile.restinfo.restName}`}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                }
                            />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
    
                <div className={classes.root}>
                    <GridList cellHeight={150} className={classes.gridList2}>
                        <GridListTile cols={2}>
                        </GridListTile>
                        {this.state.tileData.map(tile => (
                            <GridListTile key={tile._id}>
                                <img src={require( "./food1.jpg")} alt={tile.restinfo.restName} />
                                <GridListTileBar
                                title={tile.restinfo.restName}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
            );
            
        }
}


export default withStyles(useStyles)(RestCard);