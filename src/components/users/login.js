import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      err: ""
    };
  }

  emailChangeHandler = (e) => {
    this.setState({ err: "", email: e.target.value });
  };

  passwordChangeHandler = (e) => {
    this.setState({ err: "", password: e.target.value });
  };

  loginHandler = () => {
    let { email, password } = this.state;
    fetch("https://fprtstore.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({ err: data.error });
        } else {
          sessionStorage.setItem("ltk", data.token);
          fetch("https://fprtstore.herokuapp.com/api/users/userInfo", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-access-token": data.token
            }
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                this.setState({ err: data.error });
              } else {
                sessionStorage.setItem("user", data.type);
                this.props.history.push("/");
              }
            });
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
              <h2>Login</h2>
              <p className="login__err">{this.state.err}</p>
            </center>
            <div>
              <p className="login__p">Email:</p>
              <input
                type="email"
                onChange={this.emailChangeHandler}
                value={this.state.email}
                className="login__input"
                placeholder="yourname@example.com"
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
            <button className="btn btn-dark" onClick={this.loginHandler}>
              Login
            </button>
            <div>
              Not a user yet?
              <Link to="/register"> Register Here</Link>
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    return <>{this.renderLogin()}</>;
  }

  componentDidMount() {
    fetch("https://fprtstore.herokuapp.com//", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}

export default Login;
