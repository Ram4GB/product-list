import Heading from '@/components/Heading';
import { Container } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import BaseForm from './BaseForm';
import { MODE } from './types';

const ProductForm: FC = () => {
    const params = useParams<{ id: string }>();

    const mode = params.id ? MODE.EDIT : MODE.NEW;

    return (
        <Container maxWidth="md" className="mt-6 mb-6">
            <Heading level="h1">{mode === MODE.EDIT ? 'Update' : 'Create'} product</Heading>
            <BaseForm mode={mode} id={params.id} />
        </Container>
    );
};

export default ProductForm;
