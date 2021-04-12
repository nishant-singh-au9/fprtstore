import React from "react";

class RenderProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      quantity: "",
      price: "",
      id: "",
      category: "",
      brand: ""
    };
  }

  nameChangeHndler = (e) => {
    this.setState({ name: e.target.value });
  };

  imageChangeHndler = (e) => {
    this.setState({ image: e.target.value });
  };

  quantityChangeHndler = (e) => {
    this.setState({ quantity: e.target.value });
  };

  priceChangeHndler = (e) => {
    this.setState({ price: e.target.value });
  };

  renderLists = () => {
    if (this.props.list) {
      return this.props.list.map((item) => {
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
                  <p className="list__p">Price: </p>₹{item.price}/-
                </div>
                <div className="col-md-2">
                  <p className="list__p">Quantity: </p>
                  {item.quantity}
                </div>
                <div className="col-md-2">
                  <p className="list__p">Status: </p>
                  {item.status}
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={this.editHandler.bind(this, item._id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      });
    } else {
      return (
        <center>
          <h5>No data available</h5>
        </center>
      );
    }
  };
  render() {
    return (
      <>
        {this.renderLists()}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Product
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    id="update_id"
                    name="_id"
                    value={this.state.id}
                    disabled
                  />
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="update_name"
                      placeholder="Enter Product Name"
                      value={this.state.name}
                      onChange={this.nameChangeHndler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Image:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="update_city"
                      placeholder="Enter Image Link"
                      value={this.state.image}
                      onChange={this.imageChangeHndler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Quantity:</label>
                    <input
                      type="phone"
                      className="form-control"
                      id="update_phone"
                      placeholder="Enter Quantity"
                      value={this.state.quantity}
                      onChange={this.quantityChangeHndler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Price:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="update_email"
                      placeholder="Enter Price"
                      value={this.state.price}
                      onChange={this.priceChangeHndler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Category:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="update_email"
                      placeholder="Enter Category"
                      value={this.state.category}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Brand:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="update_email"
                      placeholder="Enter Brand"
                      value={this.state.brand}
                      disabled
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={this.deActivateChangeHandler}
                >
                  DeActivate
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={this.activatesaveChangeHandler}
                >
                  Activate
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={this.saveChangeHandler}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  activatesaveChangeHandler = () => {
    fetch(
      `https://fprtstore.herokuapp.com/api/products/activateProduct/${this.state.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("ltk")
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {});
  };

  deActivateChangeHandler = () => {
    fetch(
      `https://fprtstore.herokuapp.com/api/products/deactivateProduct/${this.state.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("ltk")
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {});
  };

  editHandler = (id) => {
    fetch(`https://fprtstore.herokuapp.com/api/products/getProduct/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          name: data.name,
          image: data.image,
          quantity: data.quantity,
          price: data.price,
          category: data.category,
          brand: data.brand,
          id: data._id
        });
      });
  };

  saveChangeHandler = () => {
    fetch(
      `https://fprtstore.herokuapp.com/api/products/updateProduct/${this.state.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("ltk")
        },
        body: JSON.stringify(this.state)
      }
    )
      .then((res) => res.json())
      .then((data) => {});
  };
}

export default RenderProducts;
