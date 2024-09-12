import Heading from '@/components/Heading';
import { Container } from '@mui/material';

import BaseForm from './BaseForm';

const ProductForm = () => {
    return (
        <Container maxWidth="md" className="mt-6 mb-6">
            <Heading level="h1">Create product</Heading>
            <BaseForm />
        </Container>
    );
};

export default ProductForm;
