import React from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
	const firstName = useSelector((state) => state.auth.firstName);

	return (
		<div>
			<h3>Welcome, {firstName}</h3>
			<p>At Plain Grey T's, we sell T-shirts.</p>
			<p> All Grey.</p>
			<p> All Plain.</p>
			<p> Subtly Different.</p>
		</div>
	);
};

export default Home;
