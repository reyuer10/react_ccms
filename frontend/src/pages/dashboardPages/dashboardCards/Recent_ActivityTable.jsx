import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, color, capacity, fuel, price) {
	return { name, color, capacity, fuel, price };
}

const rows = [
	createData('TATA HARRIER', 'BLACK', 6, 'DIESEL', '14 LACS'),
	createData('MAHINDRA THAR', 'RED', 4, 'DIESEL', '16 LACS'),
	createData('MARUTI SWIFT', 'WHITE', 5, 'PETROL', '9 LACS'),
	createData('MG HECTOR', 'BLACK', 5, 'PETROL', '18 LACS'),
	createData('MERCEDES GLS', 'WHITE', 5, 'DIESEL', '52 LACS'),
];


 // hell world
export default function Recent_ActivityTable() {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>
							NAME
						</TableCell>
						<TableCell align="center">
							COLOR
						</TableCell>
						<TableCell align="center">
							CAPACITY
						</TableCell>
						<TableCell align="center">
							FUEL
						</TableCell>
						<TableCell align="center">
							PRICE(Rs)
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th':
								{ border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="center">
								{row.color}
							</TableCell>
							<TableCell align="center">
								{row.capacity}
							</TableCell>
							<TableCell align="center">
								{row.fuel}
							</TableCell>
							<TableCell align="center">
								{row.price}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
