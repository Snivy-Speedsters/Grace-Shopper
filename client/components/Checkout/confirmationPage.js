import React from 'react';
import { useHistory } from 'react-router-dom';

import { Typography, Button } from '@mui/material';

export const confirmationPage = () => {
	const history = useHistory();

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Typography variant="h2" textAlign="center">
				Your order has been successful!
			</Typography>
			<Button
				size="large"
				variant="contained"
				sx={{ marginTop: '2rem' }}
				onClick={() => {
					history.push('/orderHistory');
				}}
			>
				Past Orders
			</Button>
		</div>
	);
};

export default confirmationPage;
