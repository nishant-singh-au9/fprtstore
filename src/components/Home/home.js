import React from "react";
import Loader from "../../Loader.svg";
import "./home.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();

    this.state = { data: "", search: "", mapdata: "" };
  }

  serchChangeHandler = (e) => {
    this.setState({ search: e.target.value });
  };

  renderCards = () => {
    if (this.state.mapdata) {
      return this.state.mapdata.map((item) => {
        return (
          <>
            <div className="col-md-3 product__container">
              <div>
                <Link to={`details/${item._id}`}>
                  <img
                    className="product__image"
                    src={item.image}
                    alt={item.name}
                  />
                </Link>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6 product__name">{item.name}</div>
                <div className="col-sm-6 product__price">₹{item.price}/-</div>
              </div>
            </div>
          </>
        );
      });
    }
  };

  renderHome = () => {
    if (sessionStorage.getItem("ltk")) {
      if (this.state.data) {
        return (
          <>
            <div className="container">
              <div className="row">{this.renderCards()}</div>
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
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <>
        <div className="home__search">
          <center>
            <input
              placeholder="iphone"
              onChange={this.serchChangeHandler}
              value={this.state.search}
            />
            <button
              className="btn btn-primary home__search__button"
              onClick={this.searchHandler}
            >
              Search
            </button>
          </center>
        </div>
        <div>{this.renderHome()}</div>
      </>
    );
  }

  searchHandler = () => {
    if (this.state.search === "") {
      this.setState({ mapdata: this.state.data.product });
    } else {
      fetch(
        `https://fprtstore.herokuapp.com/api/products/search/${this.state.search}`,
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
          console.log(data);
          this.setState({ mapdata: data });
        });
    }
  };
  componentDidMount() {
    fetch("https://fprtstore.herokuapp.com/api/products/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data, mapdata: data.product });
      });
  }
}

export default Home;
