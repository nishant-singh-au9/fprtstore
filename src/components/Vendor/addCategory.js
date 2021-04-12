import React from "react";

class AddCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      image: "",
      err: "",
      succ: ""
    };
  }

  nameChangeHandler = (e) => {
    this.setState({ err: "", name: e.target.value, succ: "" });
  };

  imageChangeHandler = (e) => {
    this.setState({ err: "", image: e.target.value, succ: "" });
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
            placeholder="Samsung"
          />

          <p className="add__p">Image Url:</p>
          <input
            type="email"
            onChange={this.imageChangeHandler}
            value={this.state.image}
            className="add__input"
            placeholder="https://m.media-amazon.com/images/I/71umuN8XVeL._SL1500_.jpg"
          />
        </div>
        <button
          className="btn btn-dark add__button"
          onClick={this.addBrandHandler}
        >
          Add Category
        </button>
      </>
    );
  }

  addBrandHandler = () => {
    let { name, image } = this.state;
    if (!name || !image) {
      this.setState({ err: "all feilds are required" });
    } else {
      fetch("https://fprtstore.herokuapp.com/api/categories/addcategory", {
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
}

export default AddCategory;
