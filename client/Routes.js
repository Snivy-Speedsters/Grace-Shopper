import React, { useEffect } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { me } from './store/auth';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Cart from './components/CartView';
import Admin from './components/Admin/Admin';
import SingleProductEdit from './components/Admin/SingleProductEdit';
import OrderHistory from './components/OrderHistory';
import SingleProductAdd from './components/Admin/SingleProductAdd';
import Profile from "./components/User/Profile";

import { fetchCart } from './store/cart';
import { makePayment } from './components/Checkout/makePayment';

function Routes() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(me());
		dispatch(fetchCart());
	}, []);

	return (
		<div>
			{!auth.id ? (
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
				</Switch>
			) : (
				<Switch>
					<Route path="/home" component={Home} />
					<Route path="/products" exact component={AllProducts} />
					<Route path="/products/:productId" component={SingleProduct} />
					<Route path="/cart" component={Cart} />
					<Route path="/payment" component={makePayment} />
					<Route path="/orderHistory" component={OrderHistory} />
					<Route path="/profile" component={Profile} />
					{auth.administrator ?
						(<Route path="/admin/products/add" exact component={SingleProductAdd} />):
						( <></> )
					}
					{auth.administrator ?
						(<Route path="/admin/products/:productId" component={SingleProductEdit} />):
						( <></> )
					}
					{auth.administrator ? (
						<Route path="/admin" exact component={Admin} />):
						( <></> )
					}
					<Redirect to="/home" />
				</Switch>
			)}
		</div>
	);
}

export default withRouter(Routes);
