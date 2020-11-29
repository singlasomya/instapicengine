import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import { register, setUserName, setApiToken } from "../../actions";
import designPanelStyles from "./RegisterPage.scss";
import { Loading } from "../Loading";
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        username: "",
        password: "",
      },
      submitted: false,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    self.setState(
      {
        submitted: true,
        isLoading: true,
      },
      function () {
        const { user } = this.state;
        if (user.email && user.username && user.password) {
          self.props.register(user, this.props.api_token, function (cb) {
            if (cb) {
              alert(cb);
              self.props.history.push("/login");
            } else {
              self.props.setApiToken("");
              self.props.setUserName("");
            }
            self.setState({ isLoading: false });
          });
        }
      }
    );
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="row">
        {this.state.isLoading ? (
          <div className="col-12 m-2 text-center control_container">
            <Loading />
          </div>
        ) : (
          <div className="login_container col-12">
            <div className="col-md-6 col-md-offset-3">
              <h2>Register</h2>
              <form name="form" onSubmit={this.handleSubmit}>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.username ? " has-error" : "")
                  }
                >
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={user.username}
                    onChange={this.handleChange}
                  />
                  {submitted && !user.username && (
                    <div className="help-block">Username is required</div>
                  )}
                </div>
                <div
                  className={classNames(
                    "form-group" +
                      (submitted && !user.email ? " has-error" : "")
                  )}
                >
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className={classNames("form-control")}
                    name="email"
                    value={user.email}
                    onChange={this.handleChange}
                  />
                  {submitted && !user.email && (
                    <div className={classNames("help-block")}>
                      Email is required
                    </div>
                  )}
                </div>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.password ? " has-error" : "")
                  }
                >
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={user.password}
                    onChange={this.handleChange}
                  />
                  {submitted && !user.password && (
                    <div className="help-block">Password is required</div>
                  )}
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">Register</button>
                  {registering && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )}
                  <Link to="/" className="btn btn-link">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registering: state.registration,
    api_token: state.LoginReducer.api_token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  register: (data, api_token, callback) =>
    dispatch(register(data, api_token, callback)),
  setUserName: (name) => dispatch(setUserName(name)),
  setApiToken: (api_token) => dispatch(setApiToken(api_token)),
});

const connectedRegisterPage = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
);
export { connectedRegisterPage as RegisterPage };
