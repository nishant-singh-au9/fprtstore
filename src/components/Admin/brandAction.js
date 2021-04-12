import React from "react";
import Loader from "../../Loader.svg";

class BrandAction extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }

  renderBrands = () => {
    if (this.state.data) {
      return this.state.data.map((item) => {
        return (
          <>
            <div className="list__tile" key={item._id}>
              <div className="row">
                <div className="col-md-2">
                  <img src={item.image} alt="product" className="list__image" />
                </div>
                <div className="col-md-2">
                  <p className="list__p">Name: </p>
                  {item.name}
                </div>
                <div className="col-md-2 list__price">
                  <p className="list__p">Status: </p>
                  {item.status}
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-success"
                    onClick={this.activatesaveChangeHandler.bind(
                      this,
                      item._id
                    )}
                  >
                    Activate
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-warning"
                    onClick={this.deActivateChangeHandler.bind(this, item._id)}
                  >
                    DeActivate
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-danger"
                    // onClick={this.editHandler.bind(this, item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      });
    } else {
      return (
        <>
          <center>
            <img src={Loader} alt="loader" />
          </center>
        </>
      );
    }
  };

  render() {
    return <>{this.renderBrands()}</>;
  }

  activatesaveChangeHandler = (id) => {
    fetch(`https://fprtstore.herokuapp.com/api/brands/activateBrand/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("ltk")
      }
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  deActivateChangeHandler = (id) => {
    fetch(`https://fprtstore.herokuapp.com/api/brands/deactivateBrand/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("ltk")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  componentDidMount() {
    fetch("https://fprtstore.herokuapp.com/api/brands/allBrand", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      });
  }

  componentDidUpdate() {
    fetch("https://fprtstore.herokuapp.com/brands/allBrand", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      });
  }
}

export default BrandAction;
