import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
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



class RestNameSearch extends React.Component {
    constructor(props) {
        super(props);
        let params = new URLSearchParams(window.location.search);
        console.log(params.get("name"));

        this.state = {
            searchVal: params.get("name"),
            tileData: [],
        }

    }

    componentDidMount() { 
        fetch('https://localhost:3000/api/v1/rest/'+ this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({tileData: response1.results}, console.log(response1.results))});
    }

    render() {
        const {classes} = this.props;
        console.log(this.state.inRange);
        return (
            <div>

            </div>
        );
    }
}

export default RestNameSearch;