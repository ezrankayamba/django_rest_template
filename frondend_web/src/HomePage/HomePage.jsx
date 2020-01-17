import React from 'react';
import {connect} from 'react-redux';
import {projectActions} from '../_actions';
import {Router, Route, Switch, Redirect, Link} from 'react-router-dom';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        const {user, projects} = this.props;
        return (
            <div className="row">
                <div className="col">
                    <h6>List of projects</h6>
                    {projects.loading && <em>Loading projects...</em>}
                    {projects.error && <span className="text-danger">ERROR: {projects.error}</span>}
                    <div className="row pb-3 small">
                        <div className="col-md table-responsive-sm">
                            {projects.items &&
                            <table className="table table-sm table-hover table-bordered">
                                <thead className="bg-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Duration(Days)</th>
                                    <th>Initiated</th>
                                    <th>Owner</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects.items.map((project, index) =>
                                    <tr key={project.id}>
                                        <td role="row">{project.name}</td>
                                        <td>{project.duration}</td>
                                        <td>{project.start_date}</td>
                                        <td>{project.owner.name}</td>
                                        <td><Link to={{
                                            pathname: `/projects/${project.id}`,
                                            state: {project}
                                        }}>View</Link></td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            }
                        </div>
                    </div>
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

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};