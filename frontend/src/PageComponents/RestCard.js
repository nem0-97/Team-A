import React from 'react';


import {  withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import './RestCard.css';
import Modal from '@material-ui/core/Modal';



let tileData = [];


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
            console.log(this.state.tileData)
           

            const {classes} = this.props;
            return (
                
                <div>
                <Paper style={{paddingTop: '55px', paddingBottom: '55px'}}>
                <div className={classes.root}>
                    <GridList cellHeight={250} className={classes.gridList2}>
               
                        {this.state.tileData.map(tile => (
                            <GridListTile key={tile._id}>
                                <img src={require( "../assets/placeholder.jpg")} alt={tile.restinfo.restName} />
                              
                            <GridListTileBar
                            title={tile.restinfo.restName}
                            subtitle={"$$ | " + tile.restinfo.address + "   | Open Hours: " + tile.restinfo.openTime + "-" + tile.restinfo.closeTime}
                            
                            />
                        
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