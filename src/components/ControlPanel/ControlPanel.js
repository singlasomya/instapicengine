import React from "react";
import classNames from "classnames";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import Modal from "react-modal";
import { withRouter, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { ImagePanel } from "../ImagePanel";
import { SearchPanel } from "../SearchPanel";
import { Loading } from "../Loading";

import {
  logout,
  uploadMine,
  getDesignElement,
  setUserName,
  setApiToken,
} from "../../actions";
import upload from "./upload.png";

import header from "./header.scss";
import ImageGallery from "react-image-gallery";

//css and images
import "./modal.scss";

import "react-image-gallery/styles/css/image-gallery.css";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: "",
      offset: 0,
      limit: 12,
      menu_elements: [],
      isImageGallery: false,
      modalIsOpen: false,
      isEditRemark: false,
      remarkValue: "",
      isLoading: false,
      pageCount: 0,
      setRefValue: "",
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.selectUpload = this.selectUpload.bind(this);
    this.upload_mine_div = this.upload_mine_div.bind(this);
    this.refreshFiles = this.refreshFiles.bind(this);
    this.handleClickImg = this.handleClickImg.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleRemarkModal = this.handleRemarkModal.bind(this);
    this.handleRemarkChange = this.handleRemarkChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.getDesignElement = this.getDesignElement.bind(this);
    this.setRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    this.refreshFiles(false);
  }

  handleLogout() {
    var self = this;
    self.setState({ isLoading: true });
    self.props.logout(self.props.name, function (callback) {
      self.props.setUserName("");
      self.props.setApiToken("");
      self.props.history.push("/");
    });
  }
  closeModal() {
    this.setState({ modalIsOpen: false, isEditRemark: false });
  }

  upload_mine_div() {
    document.getElementById("upload").click();
  }

  selectUpload(event) {
    var self = this;
    console.log(event.target.files);
    this.setState(
      {
        minefiles: event.target.files,
      },
      function () {
        self.handleRemarkModal();
      }
    );
  }

  handleRemarkModal() {
    this.setState({ isEditRemark: true, modalIsOpen: true });
  }

  handleUpload() {
    var self = this;

    if (self.state.minefiles != null) {
      self.setState(
        {
          modalIsOpen: false,
          isLoading: true,
        },
        function () {
          self.props.uploadMine(
            self.state.minefiles,
            self.state.remarkValue,
            self.props.api_token,
            function (res) {
              alert(res.msg);
              debugger;
              if (res.msg) {
                self.setState({
                  minefiles: null,
                  isLoading: true,
                });
                //  document.getElementById("upload").value = ""; //Do not check how to clear input value in react
                self.refreshFiles(false);
              }
            }
          );
        }
      );
    }
  }

  refreshFiles(append) {
    var self = this;

    var offset = this.state.offset;
    if (!append) {
      this.setState({
        offset: 0,
        isLoading: true,
        stopMore: false,
      });
      offset = 0;
    }
    var data = {
      offset: offset,
      limit: this.state.limit,
      keyword: "",
    };
    if (this.props.api_token) {
      this.getDesignElement(data, this.props.api_token);
    } else {
      self.setState({
        stopMore: true,
        isLoading: false,
        menu_elements: [],
      });
    }
  }

  getDesignElement(data, api_token) {
    var self = this;
    self.props.getDesignElement(data, api_token, function (json) {
      if (self._isMounted) {
        if (json.elements.length > 0) {
          self.setState({
            menu_elements: json.elements,
            isLoading: false,
            pageCount: Math.ceil(json.totalElement / self.state.limit),
          });
        } else {
          self.setState({
            stopMore: true,
            isLoading: false,
            menu_elements: [],
            pageCount: 0,
          });
        }
      }
    });
  }

  handleClearSearch() {
    var self = this;
    this.setState({ setRefValue: "" });
    if (self.setRef.current.value != "") {
      self.setRef.current.value = "";
      self.refreshFiles(false);
    }
  }

  searchKeyword(e) {
    var self = this;

    if (e.keyCode == 13) {
      if (self.setRef.current.value != "") {
        var data = {
          offset: self.state.offset,
          limit: self.state.limit,
          keyword: self.setRef.current.value,
        };
        self.setState({
          isLoading: true,
          setRefValue: self.setRef.current.value,
        });
        self.getDesignElement(data, self.props.api_token);
      }
    }
  }

  handleClickImg() {
    this.setState({ modalIsOpen: true });
  }

  handleRemarkChange(event) {
    this.setState({ remarkValue: event.currentTarget.value });
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.limit);

    this.setState({ offset: offset }, () => {
      this.refreshFiles(true);
    });
  }

  render() {
    const renderElements =
      this.state.menu_elements && this.state.menu_elements.length > 0 ? (
        this.state.menu_elements.map((element, index) => (
          <ImagePanel
            key={index}
            idx={index}
            preview_url={element.original}
            remark={element.remark}
            sharedBy={element.sharedBy}
            created_at={element.created_at}
            handleClickImg={this.handleClickImg}
          />
        ))
      ) : (
        <div> No Image Found</div>
      );
    return (
      <div className="col-12 m-2 text-center control_container">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="header col-12">
              <div className="css_header col-12 d-flex">
                <div className="left_header_group col-9 text-left m-auto">
                  {this.props.name}
                </div>
                <div className="right_header_group text-right col-3">
                  <div className={classNames(this.state.upload_container)}>
                    <input
                      className="upload_mine"
                      type="file"
                      id="upload"
                      name="upload"
                      onChange={this.selectUpload}
                      accept=".png,.jpg,.jpeg,.svg"
                    />
                  </div>

                  <div className="btn" onClick={this.upload_mine_div}>
                    <img className="upload_icon" src={upload} />
                  </div>
                  <div className="btn btn-primary" onClick={this.handleLogout}>
                    Logout
                  </div>
                </div>
              </div>
            </div>
            <div className="element_list col-12 my-2">
              <div className="col-12 text-center">
                <h4>All Shared Images</h4>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <SearchPanel
                  clearSearch={this.handleClearSearch}
                  searchKeyword={this.searchKeyword}
                  searchref={this.setRef}
                  setRefValue={this.state.setRefValue}
                />
              </div>
              <div className="col-12 m-2">
                <div className="row col-12 d-flex">{renderElements}</div>
                <div className="col-12 d-flex justify-content-center">
                  {this.state.pageCount > 0 && !this.state.modalIsOpen ? (
                    <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {this.state.modalIsOpen && !this.state.isEditRemark ? (
              <Modal
                ariaHideApp={false}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
              >
                <ImageGallery items={this.state.menu_elements} />
                <div className="col-12 text-center">
                  <button className="btn btn-primary" onClick={this.closeModal}>
                    close
                  </button>
                </div>
              </Modal>
            ) : (
              ""
            )}

            {this.state.isEditRemark ? (
              <Modal
                ariaHideApp={false}
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
              >
                <div className="col-12 text-center">
                  <h4>Upload Images</h4>
                </div>
                <div className="form-group d-flex justify-content-center m-3">
                  <label htmlFor="remark col-3">Remark:</label>
                  <input
                    type="remark"
                    className={classNames("form-control col-9")}
                    name="remark"
                    onChange={this.handleRemarkChange.bind(this)}
                  />
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-primary m-3"
                    onClick={this.handleUpload}
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-primary m-3"
                    onClick={this.closeModal}
                  >
                    close
                  </button>
                </div>
              </Modal>
            ) : (
              ""
            )}
          </div>
        )}
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

const mapDispatchToProps = (dispatch) => ({
  logout: (username, callback) => dispatch(logout(username, callback)),
  uploadMine: (files, remark, api_token, callback) =>
    dispatch(uploadMine(files, remark, api_token, callback)),
  getDesignElement: (data, api_token, callback) =>
    dispatch(getDesignElement(data, api_token, callback)),
  setUserName: (name) => dispatch(setUserName(name)),
  setApiToken: (api_token) => dispatch(setApiToken(api_token)),
});

const connectedControlPanel = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
);
export { connectedControlPanel as ControlPanel };
