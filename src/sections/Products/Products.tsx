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

const Products = () => {
    const { products, fetchProducts } = useProductApi();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxWidth="md" className="mt-6">
            <Heading level="h1">Products</Heading>
            <TableContainer className="relative" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Product Type</TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img
                                        className="w-36 h-16 object-cover"
                                        src={row.media[0].value}
                                    />
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.productType}</TableCell>
                                <TableCell>{row.productType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Products;
