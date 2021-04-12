import React from "react";

class addProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      image: "",
      quantity: "",
      brand: "",
      category: "",
      price: "",
      err: "",
      optcat: "",
      succ: "",
      optbrand: ""
    };
  }

  nameChangeHandler = (e) => {
    this.setState({ err: "", name: e.target.value, succ: "" });
  };

  imageChangeHandler = (e) => {
    this.setState({ err: "", image: e.target.value, succ: "" });
  };

  quantityChangeHandler = (e) => {
    this.setState({ err: "", quantity: e.target.value, succ: "" });
  };

  brandChangeHandler = (e) => {
    this.setState({ err: "", brand: e.target.value, succ: "" });
  };

  categoryChangeHandler = (e) => {
    this.setState({ err: "", category: e.target.value, succ: "" });
  };

  priceChangeHandler = (e) => {
    this.setState({ err: "", price: e.target.value, succ: "" });
  };

  renderCategories = () => {
    if (this.state.optcat) {
      return this.state.optcat.map((item) => {
        return (
          <option value={item.name} key={item._id}>
            {item.name}
          </option>
        );
      });
    }
  };

  renderBrands = () => {
    if (this.state.optbrand) {
      return this.state.optbrand.map((item) => {
        return (
          <option value={item.name} key={item._id}>
            {item.name}
          </option>
        );
      });
    }
  };

  render() {
    return (
      <>
        <div>
          <center>
            <p className="add__err">{this.state.err}</p>
            <p className="add__succ">{this.state.succ}</p>
          </center>
          <p className="add__p">Name:</p>
          <input
            type="email"
            onChange={this.nameChangeHandler}
            value={this.state.name}
            className="add__input"
            placeholder="Galaxy S20 Ultra"
          />

          <p className="add__p">Image Url:</p>
          <input
            type="email"
            onChange={this.imageChangeHandler}
            value={this.state.image}
            className="add__input"
            placeholder="https://m.media-amazon.com/images/I/71umuN8XVeL._SL1500_.jpg"
          />

          <p className="add__p">Quantity:</p>
          <input
            type="email"
            onChange={this.quantityChangeHandler}
            value={this.state.quantity}
            className="add__input"
            placeholder="10"
          />

          <p className="add__p">Brand:</p>
          <select className="add__input" onChange={this.brandChangeHandler}>
            <option value="">Select Brand</option>
            {this.renderBrands()}
          </select>

          <p className="add__p">Category:</p>
          <select className="add__input" onChange={this.categoryChangeHandler}>
            <option value="">Select Category</option>
            {this.renderCategories()}
          </select>

          <p className="add__p">Price:</p>
          <input
            type="text"
            onChange={this.priceChangeHandler}
            value={this.state.price}
            className="add__input"
            placeholder="106999"
          />
        </div>
        <button
          className="btn btn-dark add__button"
          onClick={this.addProductHandler}
        >
          Add Product
        </button>
      </>
    );
  }

  addProductHandler = () => {
    let { name, image, quantity, brand, category, price } = this.state;
    if (!name || !image || !quantity || !brand || !category || !price) {
      this.setState({ err: "All feilds are required" });
    } else {
      fetch("https://fprtstore.herokuapp.com/api/products/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("ltk")
        },
        body: JSON.stringify(this.state)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.setState({ err: data.error });
          } else {
            this.setState({ succ: data.message });
          }
        });
    }
  };

  componentDidMount() {
    fetch("https://fprtstore.herokuapp.com/api/categories/activeCategory", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ optcat: data });
      });

    fetch("https://fprtstore.herokuapp.com/api/brands/activeBrand", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ optbrand: data });
      });
  }
}

export default addProduct;
