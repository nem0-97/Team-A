import React from 'react';
import Typography from '@material-ui/core/Typography';
import './nameSearch.css';

/*
TODO: 

*/

/*
This function will fetch the necessary data from the database using fetch
*/

let searchVal;


class NameSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            tileData: [],
            open: false,
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.search = this.search.bind(this);
    }
  
    handleFormChange(event) {
        this.setState({ value: event.target.value });
        searchVal = event.target.value;
    }

    search(){
        window.location.href = "http://localhost:3001/RestNameSearch?restName=" + this.state.value;
        //fetch('https://localhost:3000/api/v1/rest/'+ searchVal).then(response => response.json()).then(response1 => {this.setState({tileData: response1.results}, console.log(response1.results))});
        console.log("Search function triggered");
    }
    
    render() {
            return (   
                <div class="form-group">
                <Typography variant="h6"  className="mb-4">
                        Search Restaurant by name {this.state.search}
                     </Typography>
                     <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button type="button" className="searchBtn" onClick={this.search}>
                            <span className="input-group-text" ><i className="material-icons">search</i></span>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Restaurant Name" id="restName" onChange={this.handleFormChange} value={this.state.value}>
                        </input>
                    </div>
                  
                 </div>

            );
    }
}

export default NameSearch;