import React from 'react';
import '../index.css';




class RestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tileData: []
        };
    }

    componentDidMount() { 
        //fetch('https://localhost:3000/api/v1/rest/'+ this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({tileData: response1.results}, console.log(response1.results))});
    }

    render() {
            return (
                <div>

                </div>
            );

      

    }
}

export default RestPage;