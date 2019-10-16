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
import RestView from './PageComponents/RestView';
import Dashboard from './PageComponents/Dashboard';
import RestSearch from './CustomerPages/RestSearch';
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
    return <RestView />
}
function restSearch()
{
    return <RestSearch />
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
