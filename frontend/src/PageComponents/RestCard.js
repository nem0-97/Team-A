import React from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import tileData from './tileData';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Badge from '@material-ui/core/Badge';
import ListSubheader from '@material-ui/core/ListSubheader';


import { Map, GoogleApiWrapper } from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import Autocomplete from 'react-google-autocomplete';

const useStyles = makeStyles(theme => ({
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
        width: 50
      }
  }));
  

export default function RestCard(){

    const classes = useStyles();

    return(
        <div>
            <Autocomplete
                style={{width: '40%'}}
                onPlaceSelected={(place) => {
                console.log(place.geometry.location.lat());
                console.log(place.geometry.location.lng())
                }}
                types={['address']}
                componentRestrictions={{country: "us"}}
            />
            <div className={classes.root3}>
                {/* <GoogleMapsContainer />      */}
            </div>
            <div>
                <Grid className={classes.avatar}>
                    <IconButton>
                        <Avatar>Hi</Avatar>
                    </IconButton>    
                    <IconButton>
                        <Badge badgeContent={4} color="primary">

                        </Badge>
                    </IconButton>
                </Grid>
            </div>

            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                            }}
                            actionIcon={
                                <IconButton aria-label={`star ${tile.title}`}>

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
                        <ListSubheader component="div">RESTAURANTS</ListSubheader>
                    </GridListTile>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                            title={tile.title}
                            actionIcon={
                                <IconButton className={classes.icon}>

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