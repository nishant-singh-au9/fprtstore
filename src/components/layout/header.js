import React from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  LogoutHandler = () => {
    sessionStorage.removeItem("ltk");
    sessionStorage.removeItem("user");
    this.props.history.push("/login");
  };

  LogoutButton = () => {
    return (
      <>
        <div className="collapse navbar-collapse justify-content-end homenavright">
          <button className="btn btn-danger" onClick={this.LogoutHandler}>
            Logout
          </button>
        </div>
      </>
    );
  };

  Condition = () => {
    if (!sessionStorage.getItem("ltk")) {
      return <></>;
    } else {
      if (sessionStorage.getItem("user") === "Admin") {
        return (
          <>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/admin"
                  >
                    Admin Section
                  </Link>
                </li>
              </ul>
            </div>
            {this.LogoutButton()}
          </>
        );
      } else if (sessionStorage.getItem("user") === "Vendor") {
        return (
          <>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/vendor"
                  >
                    Vendor Section
                  </Link>
                </li>
              </ul>
            </div>
            {this.LogoutButton()}
          </>
        );
      } else {
        return <>{this.LogoutButton()}</>;
      }
    }
  };

  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          style={{ marginBottom: "50px" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              FPRT STORE
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {this.Condition()}
          </div>
        </nav>
      </>
    );
  }
}

export default withRouter(Header);
