import FileUpload from '@/components/Form/FileUpload/FileUpload';
import Form from '@/components/Form/Form';
import InputControl from '@/components/Form/Input';
import RichTextEditor from '@/components/Form/RichTextEditor';
import SelectControl from '@/components/Form/Select';
import { RouterPath } from '@/const/routerPath';
import { createProductAsyncThunk } from '@/store/product';
import { RootState, useAppDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

type FormData = {
    title: string;
    description: string;
    price: number;
    productType?: string;
    tags?: string[];
};

const CreateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const formRef = useRef<any>();

    const loading = useSelector((state: RootState) => state.ProductSlice.isLoading);

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

    const onSubmit = (data: FormData) => {
        if (formRef.current.listImage.length === 0) {
            return enqueueSnackbar('Please upload at least 1 media', { variant: 'error' });
        }

        dispatch(
            createProductAsyncThunk({
                ...data,
                media: formRef.current.listImage,
            }),
        )
            .unwrap()
            .then(pro => {
                enqueueSnackbar('Add ' + pro.title + ' successfully ', { variant: 'success' });
                navigate(RouterPath.Products);
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
                <FileUpload ref={formRef} />
                <Button disabled={loading} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Stack>
        </Form>
    );
};

export default CreateProduct;
