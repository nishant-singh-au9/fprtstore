import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loader from "../../Loader.svg";
import AddProduct from "../Vendor/addproducts";
import AddBrand from "../Vendor/addBrand";
import AddCategory from "../Vendor/addCategory";
import RenderProducts from "../Vendor/renderProducts";
import BrandAction from "./brandAction";
import CategoryAction from "./categoryAction";
import UserAction from "./userAction";

class AdminHome extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }

  renderAdminHome = () => {
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
                <Tabs>
                  <TabList>
                    <Tab>Product Actions</Tab>
                    <Tab>User Actions</Tab>
                    <Tab>Category Actions</Tab>
                    <Tab>Brand Actions</Tab>
                  </TabList>

                  <TabPanel>
                    <center>
                      <h3>All Listings</h3>
                    </center>
                    <hr />
                    <RenderProducts list={this.state.data.product} />
                  </TabPanel>
                  <TabPanel>
                    <UserAction />
                  </TabPanel>
                  <TabPanel>
                    <CategoryAction />
                  </TabPanel>
                  <TabPanel>
                    <BrandAction />
                  </TabPanel>
                </Tabs>
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

  renderAdmin = () => {
    if (!sessionStorage.getItem("ltk")) {
      this.props.history.push("/login");
    } else {
      if (sessionStorage.getItem("user") !== "Admin") {
        return (
          <>
            <center>
              <h2>Your are not authorized to access this page</h2>
            </center>
          </>
        );
      } else {
        return <>{this.renderAdminHome()}</>;
      }
    }
  };

  render() {
    return <>{this.renderAdmin()}</>;
  }

  componentDidMount() {
    fetch("https://fprtstore.herokuapp.com/api/products/allproducts", {
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
    fetch("https://fprtstore.herokuapp.com/api/products/allproducts", {
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

export default AdminHome;
