import React from 'react';
import '../index.css';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import './RestPage.css';



class RestPage extends React.Component {
    constructor(props) {
        let params = new URLSearchParams(window.location.search);
        console.log(params.get("ID"));
        super(props);
        this.state = {
            searchVal: params.get("ID"),
            tileData: [],
            tileData2: [],
        };
    }

    componentDidMount() { 
        fetch('https://localhost:3000/api/v1/rest?_id='+ this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({tileData: response1.results}, console.log(response1.results))});
       fetch('https://localhost:3000/api/v1/spot?restID='+ this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({tileData2: response1.results}, console.log(response1.results))});
    }

    render() {
            return (
                <div>
                <Container component="main" maxWidth="md">
                            <div>
                                <Paper style={{paddingTop: '55px', paddingBottom: '55px'}}>
                                    <div>
                                        <img src={require( "../assets/placeholder.jpg")} className="img-responsive img-thumbnail float-right w-25 mr-3" />
                                        {this.state.tileData.map(rest => 
                                            <Typography variant="h5"  className="mb-4 ml-4">
                                            
                                                <b> <h2>{rest.restinfo.restName}</h2></b>
                                                <br/> {rest.restinfo.address}
                                                <br/> {rest.restinfo.openTime} {rest.restinfo.closeTime}
                                                <br/> 
                                            </Typography>
                                            
                                        )}
  
                                            <h2 className="spotTitle"> SPOTS </h2>
                                        
                                        <List className='spotTable'>
                                       
                                            {this.state.tileData2.map(rest =>
                                                <ListItem>
                                                     <ListSubheader>{"Date|Time"}</ListSubheader> 
                                                   <ListItemText primary={rest.date + " | " + rest.hours} secondary={"$" + rest.price} />
                                                   <Button variant="contained" color="primary"  className="">
                                                        Order Spot
                                                    </Button> 
                                                    <Divider />
                                                </ListItem>
                                            )}
                                        </List>
                                    </div>




                                    <div>
                                        <TextField
                                            id="outlined-basic"
                                            wdith="75%"
                                            multiline={true}
                                            label="Comment"
                                            className="w-75 ml-3 mt-5"
                                            variant="outlined"
                                        />
                                        <Button variant="contained" color="primary"  className="mb-4 ml-1 mt-5">
                                                Submit
                                        </Button>
                                    </div>
                                </Paper>
                                
                            </div>


                </Container>
            </div>
            );

      

    }
}

export default RestPage;