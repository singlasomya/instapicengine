import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

//import { history } from '../helpers';
import { alertActions } from '../../actions';
import { ControlPanel } from '../ControlPanel';
import { RegisterPage } from '../RegisterPage';
import { LoginPage } from '../LoginPage';

import ProjectCss from './Project.scss';

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="app">
                <div className="project_container">
                    <div className="col-sm-12 col-sm-offset-2">
                        
                        <Router>
                            <main>
                                <Route exact path="/" component={this.props.api_token ? ControlPanel : LoginPage} />
                                <Route exact path="/home/:api_token" component={ControlPanel} />
                                <Route exact path="/login" component={LoginPage} />
                                <Route exact path="/register" component={RegisterPage} />
                            </main>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.name,
	api_token: state.api_token
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Project)
