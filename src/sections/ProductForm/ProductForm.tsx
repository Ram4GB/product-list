import Heading from '@/components/Heading';
import { Container } from '@mui/material';

import CreateProduct from './CreateProduct';

const ProductForm = () => {
    return (
        <Container maxWidth="md" className="mt-6 mb-6">
            <Heading level="h1">Create product</Heading>
            <CreateProduct />
        </Container>
    );
};

export default ProductForm;
