import Heading from '@/components/Heading';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Container,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import FilterBar from './FilterBar';
import useProducts from './useProducts';

const Products = () => {
    const {
        tags,
        selectedIds,
        memoProducts,
        handleFilter,
        clearTags,
        deleteProduct,
        navigateProductDetail,
        handleToggleSelectItem,
        confirmBulkDelete,
    } = useProducts();

    console.log('selectedIds', selectedIds);

    return (
        <Container maxWidth="lg" className="mt-6">
            <Heading level="h1">Products</Heading>
            <FilterBar
                status={tags}
                selectedIds={selectedIds}
                onFilter={handleFilter}
                clearFilter={clearTags}
                bulkDeleteProduct={confirmBulkDelete}
            />
            <TableContainer className="relative" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Product Type</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memoProducts.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Checkbox
                                        onChange={() => handleToggleSelectItem(row.id)}
                                        checked={selectedIds[row.id]}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <img
                                        className="w-36 h-16 object-cover"
                                        src={row.media[0].value}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Link onClick={() => navigateProductDetail(row.id)}>
                                        {row.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{row.price}$</TableCell>
                                <TableCell>{row.productType}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {row.tags?.map((tag, index) => (
                                            <Chip
                                                label={tag}
                                                color="primary"
                                                key={`${row.id}-${index}`}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => deleteProduct(row.id)}
                                        type="button"
                                        variant="outlined"
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Products;
