import React from 'react';
import Typography from '@material-ui/core/Typography';
import './nameSearch.css';
/*
TODO: 

*/

function search(){
    console.log("Search function triggered");


}


class NameSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
        };
        
    }
  

    render() {
            return (   
                <div class="form-group">
                <Typography variant="h6"  className="mb-4">
                        Search Restaurant by name {this.state.search}
                     </Typography>
                     <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button type="button" className="searchBtn" onClick={search}>
                            <span className="input-group-text" ><i className="material-icons">search</i></span>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Restaurant Name"  />
                    </div>
                  
                 </div>

            );
    }
}

export default NameSearch;