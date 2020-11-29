import React from "react";
import { connect } from "react-redux";
import LoadingScss from "./Loading.scss";

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading text-center">
        <div></div>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({});

const connectedLoading = connect(mapStateToProps, mapDispatchToProps)(Loading);
export { connectedLoading as Loading };
