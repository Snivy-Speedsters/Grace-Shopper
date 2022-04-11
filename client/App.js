import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';
import { CssBaseline } from '@mui/material';

import './index.css';

const App = () => {
	const localStorage = window.localStorage;

	localStorage.products = localStorage.products
		? localStorage.products
		: JSON.stringify([]);
	localStorage.amount = localStorage.amount ? localStorage.amount : '0';

	return (
		<div>
			<CssBaseline />
			<Navbar />
			<Routes />
		</div>
	);
};

export default App;
