import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
	const localStorage = window.localStorage

	localStorage.products = (localStorage.products ? localStorage.products : JSON.stringify([]))
	localStorage.amount = (localStorage.amount ? localStorage.amount : '0')

	return (
		<div>
			<Navbar />
			<Routes />
		</div>
	);
};

export default App;
