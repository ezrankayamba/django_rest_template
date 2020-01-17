import React from 'react';
import {Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {alertActions} from '../_actions';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [
                {id: 1, path: "/", name: "Home"},
                {id: 2, path: "/login", name: "Login"},
                {id: 3, path: "/register", name: "Register"},
                {id: 4, path: "/protected", name: "Secured"},
            ]
        };
    }

    render() {
        return (
            <header className="app-bg-primary sticky-top">
                <nav className="container text-light navbar navbar-dark navbar-expand-md">
                    <a href="#" className="navbar-brand">Tigo Pesa <span>Projects</span></a>
                    <button
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navMenu"
                        aria-controls="navMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        id="menu-toggle-btn"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ml-auto">
                            {this.state.menus.map(item => (
                                <Link key={item.id} to={item.path} className="nav-link">{item.name}</Link>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
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

const connectedNavBar = connect(mapState, actionCreators)(NavBar);
export {connectedNavBar as NavBar};