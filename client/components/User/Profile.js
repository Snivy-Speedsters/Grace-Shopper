import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditUser from './EditUser';
import { useHistory } from 'react-router-dom';
import { TextField, Typography, Box, Button } from '@mui/material';

const Profile = () => {
	const user = useSelector((state) => state.auth);

	const [view, setView] = useState('');
	const history = useHistory();

	const currentView = (view) => {
		switch (view) {
			case 'edit':
				return <EditUser />;
			default:
				return <></>;
		}
	};

	const handleView = (newView) => {
		if (newView === view) {
			setView('');
		} else {
			setView(newView);
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h3>
				Hello, {user.firstName} {user.lastName}!
			</h3>
			<h4>Email: {user.email}</h4>
			<h4>Address: {user.shippingAddress}</h4>

			<Button
				size="large"
				variant="contained"
				style={{ marginBottom: '2rem' }}
				onClick={() => {
					history.push('/orderHistory');
				}}
			>
				Past Orders
			</Button>
			<Button
				size="large"
				variant="contained"
				style={{ marginBottom: '2rem' }}
				onClick={() => {
					handleView('edit');
				}}
			>
				Edit User
			</Button>
			<div>{currentView(view)}</div>
		</div>
	);
};

export default Profile;
