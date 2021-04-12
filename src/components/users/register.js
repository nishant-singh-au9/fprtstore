import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      image: "",
      bio: "",
      err: "",
      succ: ""
    };
  }

  nameChangeHandler = (e) => {
    this.setState({ err: "", name: e.target.value });
  };

  emailChangeHandler = (e) => {
    this.setState({ err: "", email: e.target.value });
  };

  passwordChangeHandler = (e) => {
    this.setState({ err: "", password: e.target.value });
  };

  imageChangeHandler = (e) => {
    this.setState({ err: "", image: e.target.value });
  };

  bioChangeHandler = (e) => {
    this.setState({ err: "", bio: e.target.value });
  };

  RegisterHandler = () => {
    let { email, password, name, image, bio } = this.state;
    fetch("https://fprtstore.herokuapp.com/api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, name, image, bio })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({ err: data.error });
        } else {
          this.setState({ succ: data.message });
          sessionStorage.setItem("ltk", data.token);
        }
      });
  };

  renderLogin = () => {
    if (sessionStorage.getItem("ltk")) {
      this.props.history.push("/");
    } else {
      return (
        <>
          <div className="form__container">
            <center>
              <h2>Register</h2>
              <p className="login__err">{this.state.err}</p>
              <p className="register__succ">{this.state.succ}</p>
            </center>
            <div>
              <p className="login__p">Name:</p>
              <input
                type="text"
                onChange={this.nameChangeHandler}
                value={this.state.name}
                className="login__input"
                placeholder="Enter your name"
              />

              <p className="login__p">Email:</p>
              <input
                type="email"
                onChange={this.emailChangeHandler}
                value={this.state.email}
                className="login__input"
                placeholder="yourname@example.com"
              />

              <p className="login__p">Image Link:</p>
              <input
                type="text"
                onChange={this.imageChangeHandler}
                value={this.state.image}
                className="login__input"
                placeholder="Enter avatar link"
              />

              <p className="login__p">Bio:</p>
              <input
                type="text"
                onChange={this.bioChangeHandler}
                value={this.state.bio}
                className="login__input"
                placeholder="something about yourself"
              />

              <p className="login__p">Password:</p>
              <input
                type="password"
                onChange={this.passwordChangeHandler}
                value={this.state.password}
                className="login__input"
                placeholder="your password here"
              />
            </div>
            <button className="btn btn-dark" onClick={this.RegisterHandler}>
              Login
            </button>
            <div>
              Already Registered?
              <Link to="/login"> Login Here</Link>
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    return <>{this.renderLogin()}</>;
  }
}

export default Register;
