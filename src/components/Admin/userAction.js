import React from "react";
import Loader from "../../Loader.svg";

class UserAction extends React.Component {
  constructor() {
    super();
    this.users = [
      { label: "User", value: "User" },
      { label: "Admin", value: "Admin" },
      { label: "Vendor", value: "Vendor" }
    ];
    this.state = {
      data: "",
      name: "",
      email: "",
      image: "",
      bio: "",
      type: "",
      lastLogin: "",
      id: ""
    };
  }

  nameChangeHndler = (e) => {
    this.setState({ name: e.target.value });
  };
  emailChangeHndler = (e) => {
    this.setState({ email: e.target.value });
  };
  imageChangeHndler = (e) => {
    this.setState({ image: e.target.value });
  };
  bioChangeHndler = (e) => {
    this.setState({ bio: e.target.value });
  };
  typeChangeHndler = (e) => {
    this.setState({ type: e.target.value });
  };

  renderUsers = () => {
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
                <div className="col-md-2" style={{ wordWrap: " break-word" }}>
                  <p className="list__p">Email: </p>
                  {item.email}
                </div>
                <div className="col-md-2 list__price">
                  <p className="list__p">Status: </p>
                  {item.status}
                </div>
                <div className="col-md-2">
                  <p className="list__p">Type: </p>
                  {item.type}
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
        <>
          <center>
            <img src={Loader} alt="loader" />
          </center>
        </>
      );
    }
  };

  editHandler = (id) => {
    fetch(`https://fprtstore.herokuapp.com/api/users/getUser/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          name: data.user[0].name,
          image: data.user[0].image,
          email: data.user[0].email,
          bio: data.user[0].bio,
          type: data.user[0].type,
          id: data.user[0]._id,
          lastLogin: data.user[0].lastLogin
        });
      });
  };

  render() {
    return (
      <>
        {this.renderUsers()}
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
                      placeholder="Enter User Name"
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
                    <label htmlFor="phone">Email:</label>
                    <input
                      type="phone"
                      className="form-control"
                      id="update_phone"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.emailChangeHndler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Bio:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="update_email"
                      placeholder="Enter Bio"
                      value={this.state.bio}
                      onChange={this.bioChangeHndler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Type:</label>
                    <select
                      className="form-control"
                      onChange={this.typeChangeHndler}
                      value={this.state.type}
                    >
                      {this.users.map((item) => {
                        return <option value={item.value}>{item.label}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Last Login:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="update_email"
                      placeholder="Enter Brand"
                      value={this.state.lastLogin}
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

  saveChangeHandler = () => {
    fetch(
      `https://fprtstore.herokuapp.com/api/users/updateUser/${this.state.id}`,
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

  activatesaveChangeHandler = () => {
    fetch(
      `https://fprtstore.herokuapp.com/api/users/activateUser/${this.state.id}`,
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
      `https://fprtstore.herokuapp.com/api/users/deactivateUser/${this.state.id}`,
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
      .then((data) => {
        console.log(data);
      });
  };

  componentDidMount() {
    fetch("https://fprtstore.herokuapp.com/api/users/allUsers", {
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
    fetch("https://fprtstore.herokuapp.com/api/users/allUsers", {
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

export default UserAction;
