import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';
import {NavBar} from "./NavBar"
import {ProjectDetailsPage} from "../HomePage"

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <Router history={history}>
                <NavBar/>
                <div className="container pt-1">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 small">
                            {alert.message &&
                            <div className={`alert p-1 ${alert.type}`}>{alert.message}</div>
                            }
                        </div>
                    </div>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <PrivateRoute exact path="/projects/:projectId" component={ProjectDetailsPage}/>
                        <Redirect from="*" to="/"/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapState(state) {
    const {alert} = state;
    return {alert};
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export {connectedApp as App};