import React from 'react';
import {connect} from 'react-redux';
import {projectActions} from '../_actions';
import {Router, Route, Switch, Redirect, Link} from 'react-router-dom';

class ProjectDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: null
        }
    }

    componentDidMount() {
        const {project} = this.props.location.state
        console.log(project)
        this.setState(() => ({project}))

    }

    render() {
        const {project} = this.props;
        return (
            <div className="row">
                <div className="col">
                    {project &&
                        <div>
                            <h6>{project.name}</h6>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const {projects, authentication} = state;
    const {user} = authentication;
    return {user, projects};
}

const actionCreators = {
    getProjects: projectActions.getAll,
}

const connectedHomePage = connect(mapState, actionCreators)(ProjectDetailsPage);
export {connectedHomePage as ProjectDetailsPage};