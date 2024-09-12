import FileUpload from '@/components/Form/FileUpload/FileUpload';
import Form from '@/components/Form/Form';
import InputControl from '@/components/Form/Input';
import RichTextEditor from '@/components/Form/RichTextEditor';
import SelectControl from '@/components/Form/SelectControl';
import { RouterPath } from '@/const/routerPath';
import { productType, tags } from '@/mockApi/data';
import {
    createProductAsyncThunk,
    getProductAsyncThunk,
    updateProductAsyncThunk,
} from '@/store/product';
import { RootState, useAppDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FC, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { MODE } from './types';

const schema = yup
    .object({
        title: yup.string().required().max(255),
        description: yup.string().required().max(255),
        price: yup.number().required().min(1).typeError('Please enter number'),
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

interface Props {
    mode: MODE;
    id?: string;
}

const defaultValues = {
    title: '',
    description: '',
    price: 0,
    productType: '',
    tags: [],
};

const BaseForm: FC<Props> = ({ mode, id }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const fileUploadRef = useRef<any>();

    const loading = useSelector((state: RootState) => state.ProductSlice.isLoading);

    const form = useForm<FormData>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        if (fileUploadRef.current.listImage.length === 0) {
            return enqueueSnackbar('Please upload at least 1 media', { variant: 'error' });
        }

        if (mode === MODE.NEW) {
            dispatch(
                createProductAsyncThunk({
                    ...data,
                    media: fileUploadRef.current.listImage,
                }),
            )
                .unwrap()
                .then(pro => {
                    enqueueSnackbar('Add ' + pro.title + ' successfully ', { variant: 'success' });
                    navigate(RouterPath.Products);
                });
        }

        // Mode === Edit

        if (!id) return;

        dispatch(
            updateProductAsyncThunk({
                id: id,
                media: fileUploadRef.current.listImage,
                description: data.description,
                price: data.price,
                title: data.title,
                tags: data.tags,
                productType: data.productType,
            }),
        )
            .unwrap()
            .then(pro => {
                enqueueSnackbar('Update ' + pro.title + ' successfully ', { variant: 'success' });
                navigate(RouterPath.Products);
            });
    };

    useEffect(() => {
        if (!id) {
            form.reset(defaultValues);
            fileUploadRef.current.setListImage([]);
            return;
        }

        dispatch(getProductAsyncThunk(id))
            .unwrap()
            .then(data => {
                form.reset({
                    ...data,
                });
                fileUploadRef.current.setListImage(data?.media);
            });
    }, [form, mode, id, dispatch]);

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
                    menus={productType}
                />
                <SelectControl
                    multiple
                    name="tags"
                    control={form.control}
                    label="Tags"
                    menus={tags}
                />
                <FileUpload ref={fileUploadRef} />
                <Button disabled={loading} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Stack>
        </Form>
    );
};

export default BaseForm;
