import Form from '@/components/Form/Form';
import InputControl from '@/components/Form/Input';
import RichTextEditor from '@/components/Form/RichTextEditor';
import SelectControl from '@/components/Form/Select';
import { Product } from '@/mockApi/api';
import { createProductAsyncThunk } from '@/store/product';
import { RootState, useAppDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const schema = yup
    .object({
        title: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required().min(1),
        productType: yup.string().optional(),
        tags: yup.array().of(yup.string().required()).optional(),
    })
    .required();

type FormData = Omit<Product, 'id'>;

const CreateProduct = () => {
    const { enqueueSnackbar } = useSnackbar();

    const loading = useSelector((state: RootState) => state.ProductSlice.isLoadingItem);

    const form = useForm<FormData>({
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            productType: '',
            tags: [],
        },
        resolver: yupResolver(schema),
    });

    const dispatch = useAppDispatch();

    const onSubmit = (data: FormData) => {
        dispatch(createProductAsyncThunk(data))
            .unwrap()
            .then(pro => {
                enqueueSnackbar('Add ' + pro.title + ' successfully ', { variant: 'success' });
            });
    };

    return (
        <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack gap={2}>
                <InputControl name="title" control={form.control} label="Title" />
                <RichTextEditor name="description" control={form.control} />
                <InputControl name="price" control={form.control} label="Price" />
                <SelectControl
                    name="productType"
                    control={form.control}
                    label="Product Type"
                    menus={[
                        {
                            label: 'Pillow',
                            value: 'pillow',
                        },
                        {
                            label: 'Handbook',
                            value: 'handbook',
                        },
                    ]}
                />
                <SelectControl
                    multiple
                    name="tags"
                    control={form.control}
                    label="Tags"
                    menus={[
                        {
                            label: 'Tag1',
                            value: 'tag1',
                        },
                        {
                            label: 'Tag2',
                            value: 'tag2',
                        },
                        {
                            label: 'Tag3',
                            value: 'tag3',
                        },
                        {
                            label: 'Tag4',
                            value: 'tag4',
                        },
                    ]}
                />
                <Button disabled={loading} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Stack>
        </Form>
    );
};

export default CreateProduct;
