import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, me } from '../store/auth';
import { useHistory } from 'react-router-dom';

const Login = () => {
	const name = 'login';
	const displayName = 'Login';
	const error = useSelector((state) => state.auth.error);

	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const user = {
			method: evt.target.name,
			email: evt.target.email.value,
			password: evt.target.password.value,
		};
		dispatch(login(user))
			.then(() => {
				dispatch(me());
			})
			.then(() => {
				history.push('/home');
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit} name={name}>
				<div>
					<label htmlFor="email">
						<small>email</small>
					</label>
					<input name="email" type="text" />
				</div>
				<div>
					<label htmlFor="password">
						<small>Password</small>
					</label>
					<input name="password" type="password" />
				</div>
				<div>
					<button type="submit">{displayName}</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
			<p>
				At Rent-a-Buddy™ we take the capitalistic approach to having friends.
				Have your buddy spend time with you for as little as one day or up to a
				week! Your buddy can accompany you to a wedding, vacation to the
				Bahamas, or just a walk in the park. As one customer notes, “I have real
				friends, this is just more convenient.”
			</p>
		</div>
	);
};

export default Login;
