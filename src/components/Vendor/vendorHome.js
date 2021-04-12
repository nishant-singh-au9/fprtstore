import React from "react";
import Loader from "../../Loader.svg";
import "./vendor.css";
import RenderProducts from "./renderProducts";
import AddProduct from "./addproducts";
import AddBrand from "./addBrand";
import AddCategory from "./addCategory";

class VendorHome extends React.Component {
  constructor() {
    super();
    this.state = {
      data: "",
      updatedata: {
        name: "",
        image: "",
        quantity: "",
        price: ""
      }
    };
  }

  renderVendorHome = () => {
    if (this.state.data) {
      return (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="vendor__action">
                  <center>
                    <h3>Add Products</h3>
                  </center>
                  <hr />
                  <AddProduct />
                </div>

                <div className="vendor__action">
                  <center>
                    <h3>Add Brand</h3>
                  </center>
                  <hr />
                  <AddBrand />
                </div>

                <div className="vendor__action">
                  <center>
                    <h3>Add Category</h3>
                  </center>
                  <hr />
                  <AddCategory />
                </div>
              </div>
              <div className="col-md-8 vendor__listing">
                <center>
                  <h3>Your Listings</h3>
                </center>
                <hr />
                <RenderProducts list={this.state.data} />
              </div>
            </div>
          </div>
        </>
      );
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

  renderVendor = () => {
    if (!sessionStorage.getItem("ltk")) {
      this.props.history.push("/login");
    } else {
      if (sessionStorage.getItem("user") !== "Vendor") {
        return (
          <>
            <center>
              <h2>Your are not authorized to access this page</h2>
            </center>
          </>
        );
      } else {
        return <>{this.renderVendorHome()}</>;
      }
    }
  };

  render() {
    return <>{this.renderVendor()}</>;
  }
  componentDidMount() {
    fetch("https://fprtstore.herokuapp.com/api/products/vendorProduct", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("ltk")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      });
  }

  componentDidUpdate() {
    fetch("https://fprtstore.herokuapp.com/api/products/vendorProduct", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("ltk")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      });
  }
}

export default VendorHome;
