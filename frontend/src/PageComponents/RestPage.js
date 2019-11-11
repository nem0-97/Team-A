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
            comments:[]
        };
        this.orderSpot = this.orderSpot.bind(this);
    }

    componentDidMount() { 
        fetch('https://localhost:3000/api/v1/rest?_id='+ this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({tileData: response1.results}, console.log(response1.results))});
       fetch('https://localhost:3000/api/v1/spot?restID='+ this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({tileData2: response1.results}, console.log(response1.results))});
       fetch('https://localhost:3000/api/v1/review?restID='+this.state.searchVal).then(response => response.json()).then(response1 => {this.setState({comments: response1.results}, console.log(response1.results))});
        
    }
    orderSpot(ID){
        window.location.href = "http://localhost:3001/Checkout?id=" + ID
    }

    render() {
        console.log(this.state.comments)
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
                                       
                                            {this.state.tileData2.map(spot =>
                                                <ListItem>
                                                     <ListSubheader>{"Date|Time"}</ListSubheader> 
                                                   <ListItemText primary={spot.date + " | " + spot.hours} secondary={"$" + spot.price} />
                                                   <Button variant="contained" color="primary" type="button"  className="" onClick={()=> {this.orderSpot(spot._id)}}>
                                                        Order Spot
                                                    </Button> 
                                                    <Divider />
                                                </ListItem>
                                            )}
                                        </List>
                                    </div>



                                    <Typography variant="h5"  className="mb-5 mt-5 ml-4">
                                        Reviews
                                    </Typography>
                                    <div>
                          
                                {this.state.comments.map(review=>(
                                      <div>
                                          
                                          <p>
                                              {review.Comment}
                                              {review.cust}
                                          </p>
                                      </div>
                                ))}
                               
                                    </div>


                                    <div>
                                        <form action="https://localhost:3000/api/v1/review" method="post">
                                        <input name="restID" value={this.state.tileData[0]?this.state.tileData[0]._id:"" } hidden></input> 
                                        <TextField
                                            id="outlined-basic"
                                            wdith="75%"
                                            multiline={true}
                                            label="Comment"
                                            name="Comment"
                                            className="w-75 ml-3 mt-5"
                                            variant="outlined"
                                        />
                                        <Button variant="contained" color="primary" type="submit" className="mb-4 ml-1 mt-5">
                                                Submit
                                        </Button>
                                        </form>
                                    </div>
                                </Paper>
                                
                            </div>


                </Container>
            </div>
            );

      

    }
}

export default RestPage;