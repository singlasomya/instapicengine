import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Loading } from "../Loading";

import { login, setUserName, setApiToken } from "../../actions";
import loginStyle from "../RegisterPage/RegisterPage.scss";

class LoginPage extends React.Component {
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
    this.setState({ submitted: true, isLoading: true });
    const { user } = this.state;
    if (user.email && user.password) {
      self.props.login(user, function (cb) {
        alert(cb.msg);
        if (cb) {
          self.props.setUserName(cb.name);
          self.props.setApiToken(cb.user_token);
          self.props.history.push("/home/" + cb.user_token);
        } else {
          self.props.setApiToken("");
        }
      });
    }
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
              <h2>Login</h2>
              <form name="form" onSubmit={this.handleSubmit}>
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
                  <button className="btn btn-primary">Login</button>
                  {registering && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )}

                  <Link to="/register" className="btn btn-link">
                    Register
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
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (data, callback) => dispatch(login(data, callback)),
  setUserName: (name) => dispatch(setUserName(name)),
  setApiToken: (api_token) => dispatch(setApiToken(api_token)),
});

const connectedLoginPage = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
export { connectedLoginPage as LoginPage };
