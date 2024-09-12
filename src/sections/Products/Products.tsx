import Heading from '@/components/Heading';
import useProductApi from '@/hooks/useProductApi';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useEffect } from 'react';

const HomePage = () => {
    const { isLoadingList, products, fetchProducts } = useProductApi();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxWidth="md" className="mt-6">
            <Heading level="h1">Products</Heading>
            {isLoadingList ? 'loading' : 'dasd'}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Product Type</TableCell>
                            <TableCell align="right">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {/* {row.name} */}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.productType}</TableCell>
                                <TableCell align="right">{row.productType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default HomePage;
