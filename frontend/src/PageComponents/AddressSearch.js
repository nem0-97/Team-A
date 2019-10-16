import React from 'react';
import Typography from '@material-ui/core/Typography';
import Autocomplete from 'react-google-autocomplete';

/*
TODO: 

*/


class AddressSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };

        
       
        

    }
    render() {
            return (   
                <div class="form-group">
                <Typography variant="h6"  className="mb-4">
                        Search Restaurant
                     </Typography>
                     <div class="input-group mb-2">
                     <div class="input-group-prepend">
                    <div class="input-group-text"><i class="material-icons">my_location</i></div>
                    </div>
                     <Autocomplete
                     style={{width: '90%'}}
                     onPlaceSelected={(place) => {
                        console.log(place.geometry.location.lat());
                        console.log(place);
                        let lat = place.geometry.location.lat();
                        let lng = place.geometry.location.lng();
                        window.location.href = "http://localhost:3001/RestSearch?lat="+ lat +"&lng=" + lng + "";

                     }}
                     className="form-control"
                     id="standard-search"
                    label="Search field"
                    type="search"
                     types={['address']}	
                     componentRestrictions={{country: "us"}}
                 />
                 </div>
                 </div>  
            );
    }
}

export default AddressSearch;