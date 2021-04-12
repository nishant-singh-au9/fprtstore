import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Header from "./components/layout/header";
import Login from "./components/users/login";
import Register from "./components/users/register";
import VendorHome from "./components/Vendor/vendorHome";
import AdminHome from "./components/Admin/adminHome";
import Details from "./components/Home/details";

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/vendor" component={VendorHome} />
      <Route path="/admin" component={AdminHome} />
      <Route path="/register" component={Register} />
      <Route path="/details/:id" component={Details} />
    </BrowserRouter>
  );
};

export default Routing;
