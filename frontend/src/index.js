import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import './index.css';
import RestSignup from './RestaurantPages/RestSignup';
import CustSignup from './CustomerPages/CustSignup';
import NotFound from './PageComponents/NotFound';
import Login from './PageComponents/Login';
import * as serviceWorker from './serviceWorker';
import ButtonAppBar from './PageComponents/NavBar';
import RestaurantDashboard from './RestaurantPages/RestaurantDashboard';
import Dashboard from './PageComponents/Dashboard';
import RestSearch from './CustomerPages/RestSearch';
import CheckOut from './PageComponents/CheckoutPages/Checkout';
import RestNameSearch from './PageComponents/RestNameSearch';
import RestPage from './PageComponents/RestPage';
/*

TODO:
# Add bottom-nav component for customer/restaurant view
# Handle login
    # Maybe look here: https://reacttraining.com/react-router/web/example/auth-workflow
        IDEAS:
        - IF RESTAURANT IS LOGGED IN => SHOW DASHBOARD/OVERVIEW-COMPONENT/REDIRECT
            ELSE => SHOW LOGIN-FORM-COMPONENT


### Docs for routing: https://reacttraining.com/react-router/web/guides/quick-start
*/


/* These functions are for the react-router to which component has to be rendered */
function Index() {
    return <Dashboard />
}

function Restaurant() {
    return <RestSignup />
}

function Customer() {
    return <CustSignup />
}
function LoginComponent(){
    return <Login />
}
function RestaurantView()
{
    return <RestaurantDashboard />
}
function restSearch()
{
    return <RestSearch />
}
function restNameSearch(){
    return <RestNameSearch />
}
function checkOut(){
    return <CheckOut />
}
function restPage(){
    return <RestPage/>
}




class App extends Component{
    render(){
        return(
            <div className="App">

                <Router>
                <ButtonAppBar/> 
                    <div>
                        <Switch>
                            <Route path="/" exact component={Index} />
                            <Route path="/Restaurant/" component={Restaurant} />
                            <Route path="/Customer/" component={Customer} />
                            <Route path="/RestaurantView/" component={RestaurantView} />
                            <Route path="/Login/" component={LoginComponent} />
                            <Route path="/RestSearch/" component={restSearch} />
                            <Route path="/Checkout/" component={checkOut} />
                            <Route path="/RestNameSearch/" component={restNameSearch} />
                            <Route path="/RestPage/" component={restPage} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </div>
            
        )
    }
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
