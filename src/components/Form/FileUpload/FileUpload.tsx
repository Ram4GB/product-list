import convertFileToDataUrl from '@/utils/convert-file-to-data-url';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, styled } from '@mui/material';
import {
    ChangeEvent,
    Dispatch,
    ForwardRefRenderFunction,
    SetStateAction,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import * as uuid from 'uuid';

import ImageList, { Image } from './ImageList';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export interface FileUploadExpose {
    listImage?: Image[];
    setListImage: Dispatch<SetStateAction<Image[]>>;
}

interface Props {}

const FileUpload: ForwardRefRenderFunction<Props> = (_props, ref) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const [listImage, setListImage] = useState<Image[]>([]);

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const listImage: Array<Promise<string>> = [];
        for (let i = 0; i < e.target.files.length; i++) {
            listImage.push(convertFileToDataUrl(e.target.files[i]));
        }

        const result = await Promise.all(listImage);

        setListImage(prev => [...prev, ...result.map(it => ({ id: uuid.v4(), value: it }))]);

        if (!fileRef.current) return;
        fileRef.current.value = '';
    };

    const handleRemoveImage = (id: string) => {
        setListImage(prev => prev.filter(it => it.id !== id));
    };

    useImperativeHandle(ref, () => {
        return {
            listImage,
            setListImage,
        };
    });

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                color="secondary"
                className="h-24"
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleUploadImage}
                    multiple
                    accept=".jpg, .jpeg, .png"
                    ref={fileRef}
                />
            </Button>
            <ImageList onRemove={handleRemoveImage} list={listImage} />
        </>
    );
};

export default forwardRef(FileUpload);
