import React from "react";
import Loader from "../../Loader.svg";

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      product: ""
    };
  }

  renderdetails = () => {
    if (this.state.product) {
      return (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img
                  className="product__image"
                  src={this.state.product.image}
                  alt={this.state.product.name}
                  style={{ maxWidth: "500px" }}
                />
              </div>
              <div className="col-md-6">
                <div className="product__details">
                  <center>
                    <h2>Product Details</h2>
                  </center>
                  <br />
                  <p>
                    Item Name:{" "}
                    <span className="item__details">
                      {this.state.product.name}
                    </span>
                  </p>
                  <p>
                    Brand:{" "}
                    <span className="item__details">
                      {this.state.product.brand}
                    </span>
                  </p>
                  <p>
                    Category:{" "}
                    <span className="item__details">
                      {this.state.product.category}
                    </span>
                  </p>
                  <p>
                    Stock:{" "}
                    <span className="item__details">
                      {this.state.product.quantity}
                    </span>
                  </p>
                  <p>
                    Price:{" "}
                    <span className="item__details">
                      ₹{this.state.product.price}/-
                    </span>
                  </p>
                </div>
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

  render() {
    return <>{this.renderdetails()}</>;
  }

  componentDidMount() {
    fetch(
      `https://fprtstore.herokuapp.com/api/products/getProduct/${this.props.match.params.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ product: data });
      });
  }
}

export default Details;
