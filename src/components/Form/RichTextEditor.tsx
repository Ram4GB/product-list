import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, FormHelperText } from '@mui/material';
import {
    Bold,
    ClassicEditor,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { FC, useRef } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
    control: Control<any>;
    name: string;
}

const RichTextEditor: FC<Props> = ({ control, name }) => {
    const richTextRef = useRef<any>();
    const { field, fieldState } = useController({
        name,
        control,
    });

    // useEffect(() => {
    //     console.log('richTextRef', richTextRef.current);
    // }, []);

    return (
        <Box
            sx={{
                '.ck-editor__editable': {
                    minHeight: 200,
                },
                '.ck.ck-reset': {
                    border: fieldState.error?.message ? '1px solid red' : '',
                },
            }}
        >
            <CKEditor
                ref={richTextRef}
                editor={ClassicEditor}
                config={{
                    toolbar: [
                        'undo',
                        'redo',
                        '|',
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        '|',
                        'link',
                        'insertTable',
                        'mediaEmbed',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'indent',
                        'outdent',
                    ],
                    plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo,
                    ],
                    initialData: '',
                }}
                onChange={(_event, editorInfo) => {
                    field.onChange(editorInfo.getData());
                }}
            />
            <FormHelperText error={!!fieldState.error}>{fieldState.error?.message}</FormHelperText>
        </Box>
    );
};

export default RichTextEditor;
