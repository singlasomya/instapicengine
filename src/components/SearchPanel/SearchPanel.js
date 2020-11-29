import React from "react";
import { connect } from "react-redux";

import SearchPanelCss from "./SearchPanel.scss";

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search_header col-3">
        <div className="search_div col-12">
          <input
            className="searchElement"
            placeholder="Search by username"
            ref={this.props.searchref}
            onKeyUp={this.props.searchKeyword}
            defaultValue={this.props.setRefValue ? this.props.setRefValue : ""}
          />

          <div
            className="clear_search"
            onClick={this.props.clearSearch.bind(this)}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAa0lEQVR4AeWSsREDIQwEtwlRhO3vP0JFPLgeHJDdnEfBh2y8F2hHnM5FJ1AayRtLshiE6F8WHUsw9kT0m8BDMFlMotZ10rzuaHtS63qo6s8HWkaLFXpo5ErXyKWukS25dRM5sXz+Pt+Ls/kBnolC6l7shJkAAAAASUVORK5CYII=" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

const mapDispatchToProps = {};

const connectedISearchPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel);
export { connectedISearchPanel as SearchPanel };
