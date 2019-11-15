import React from 'react';

import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import './RestCard.css';

const useStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      width: '100%',
      margin: '0 auto',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    gridList2: {
        width: '58%',
    },
    spotButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
  });

  const theme = createMuiTheme({
    typography: {
      h6: {
        fontSize: 20,
        fontFamily: 'Geneva',
        fontWeight: 575,
      },
      subtitle2: {
        fontWeight: 450,
      },
    },
  });


/* This is the home page that everyone will see after logging in or entering the website*/
class RestCard extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            tileData:[]
        }
    }
    
    componentDidMount() { /* Fetches data from backend and inputs data into tileData */
        fetch('https://localhost:3000/api/v1/rest').then(response => response.json()).then(response1 => {
            this.setState({tileData: response1.results});
            for(let r of response1.results){
                fetch('https://localhost:3000/api/v1/spot?restID='+r._id).then(res=>res.json()).then(spots=> {
                    let sum =0;
                    for(let s of spots.results){
                        sum+=s.amount-s.taken;
                    }
                    r.totalSpots=sum;
                    this.setState({});
                });
            }
        });
    }
    

    render() { //Renders the components used in the dashboard
        console.log(this.state.tileData)

        const {classes} = this.props;
        return (
            
        <div>
            <Paper style={{paddingTop: '60px', paddingBottom: '60px'}}>
                <div className={classes.root}>
                    <GridList cellHeight={225} className={classes.gridList2} cols={1} spacing={28}>
            
                        {this.state.tileData.map(tile => (
                            <GridListTile key={tile._id}>
                                <img src={require( "../assets/placeholder.jpg")} alt={tile.restinfo.restName} />
                                <a href={'http://localhost:3001/RestPage?ID=' + tile._id} >
                                    <ThemeProvider theme={theme}>
                                        <GridListTileBar
                                            title={
                                                <Typography variant="h6">
                                                    {tile.restinfo.restName}
                                                </Typography>
                                            }
                                            subtitle={
                                                <Typography variant="subtitle2">
                                                    {"$$ | " + tile.restinfo.address + "   | Open Hours: " + tile.restinfo.openTime + "-" + tile.restinfo.closeTime}
                                                </Typography>
                                            }
                                            actionIcon={
                                                <Button className={classes.spotButton} padding={1}>{tile.totalSpots +" spots left"}</Button>
                                            }
                                        />
                                    </ThemeProvider>
                                </a>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Paper>
        </div>
        );
    }
}

export default withStyles(useStyles)(RestCard);