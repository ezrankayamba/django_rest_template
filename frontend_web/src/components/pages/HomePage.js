import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <div>
                <h5>Home Page</h5>
                <NavLink to="/contact">
                    Contact
                </NavLink>
            </div>
        );
    }
}

export default HomePage;