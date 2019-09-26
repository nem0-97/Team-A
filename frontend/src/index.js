import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import RestSignup from './RestaurantPages/RestSignup';
import * as serviceWorker from './serviceWorker';

function Index() {
    return <h2>Home</h2>;
}

function Restaurant() {
    return <RestSignup />
}

function Customer() {
    return <h2>Customer Signup page</h2>;
}



class App extends Component{
    render(){
        return(
            <div className="App">

                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/Restaurant/">Restaurant</Link>
                                </li>
                                <li>
                                    <Link to="/Customer/">Customer</Link>
                                </li>
                            </ul>
                        </nav>

                        <Route path="/" exact component={Index} />
                        <Route path="/Restaurant/" component={Restaurant} />
                        <Route path="/Customer/" component={Customer} />
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
