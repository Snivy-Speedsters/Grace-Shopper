import React from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
	const firstName = useSelector((state) => state.auth.firstName);

	return (
		<div>
			<h3>Welcome, {firstName}</h3>
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

export default Home;
