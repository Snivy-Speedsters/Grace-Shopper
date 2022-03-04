
// import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
// import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login } from "./components/AuthForm";
// import { Signup } from "./components/SignUp";
// import Home from "./components/Home";
// // import { me } from "./store";
// import AllProducts from "./components/AllProducts";
// import SingleProduct from "./components/SingleProduct";
// import Cart from "./components/CartView";
// import Admin from "./components/Admin/Admin";
// import SingleProductEdit from "./components/Admin/SingleProductEdit";
// import OrderHistory from "./components/OrderHistory";
// import SingleProductAdd from './components/Admin/SingleProductAdd';


// class Routes extends Component {
//   componentDidMount() {
//     // this.props.loadInitialData();
//   }

//   render() {
//     // const { isLoggedIn, isAdmin } = this.props;



		// return (
		// 	<div>
				{/* {isLoggedIn ? (
					<Switch>
						<Route path="/home" component={Home} />
						<Route path="/products" exact component={AllProducts} />
						<Route path="/products/:productId" component={SingleProduct} />
						<Route path="/cart" component={Cart} />
              <Route path="/orderHistory" component={OrderHistory} />
						{isAdmin ? (<Route path="/admin/products/add" exact component={SingleProductAdd} />):(<></>)}
						{isAdmin ? (<Route path="/admin/products/:productId" component={SingleProductEdit} />):(<></>)}
						{isAdmin ? (<Route path="/admin" exact component={Admin} />) : (<></>)}
            <Route path="/admin" component={Admin} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
          </Switch>
        )} */}
      {/* </div>
    );
  }
} */}


// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id,
//     isAdmin: state.auth.administrator,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));

import React, { useEffect } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { me } from "./store/auth";
import Home from "./components/Home"
import Login  from "./components/Login";
import Signup from "./components/SignUp";

const Routes = props => {
  const isLoggedIn = !!(useSelector((state) => state.auth.id))
  const dispatch = useDispatch()

  useEffect( ()=>{
    dispatch(me())
  })

  return(
    <div>
      {isLoggedIn ? (
					<Switch>
						<Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
    </div>
  )
}

export default withRouter(Routes)




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTY0NjM1NTg2OX0.P6pJP3a_v1M1zKAdKTCsN1u1mw4eiIoxI0tLivGlhNc
