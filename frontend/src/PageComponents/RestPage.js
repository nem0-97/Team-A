import React from 'react';

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
  });



class RestPage extends React.Component {
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
        return (
            <div>
           
            </div>
        );
    }
}

export default RestPage;