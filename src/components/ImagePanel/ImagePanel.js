import React from "react";
import classNames from "classnames";
import Cookies from "universal-cookie";
import { connect } from "react-redux";

class ImagePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: "",
      offset: 0,
      limit: 20,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div
        className="col-3 my-2 text-center"
        onClick={this.props.handleClickImg}
      >
        <div className="img_container">
          <div className="my_favourite">
            <img src={this.props.preview_url} width="200" height="200" />
          </div>
          <div className="row">
            <span className="col-12 m-2">
              {this.props.remark ? "Remark: " + this.props.remark : ""}
            </span>
            <span className="col-12 m-2">
              {this.props.name ? "Shared by: " + this.props.name : ""}
            </span>
            <span className="col-12 m-2">
              {this.props.created_at
                ? "Shared at: " + this.props.created_at
                : ""}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.LoginReducer.name,
    api_token: state.LoginReducer.api_token,
  };
};

const mapDispatchToProps = (dispatch) => ({});

const connectedImagePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePanel);
export { connectedImagePanel as ImagePanel };
