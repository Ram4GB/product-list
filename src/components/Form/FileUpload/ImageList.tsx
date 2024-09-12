import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';

export interface Image {
    id: string;
    value: string;
}

interface Props {
    list: Image[];
    onRemove: (id: string) => void;
}

const ImageList: FC<Props> = ({ list, onRemove }) => {
    return (
        <Stack flexDirection="row" flexWrap="wrap" gap={3}>
            {list.map(item => (
                <Box
                    key={item.id}
                    sx={{
                        position: 'relative',

                        '&:hover .overplay': {
                            display: 'flex',
                        },
                    }}
                >
                    <img
                        className="w-32 h-14 object-cover border-solid border-red-500 border-2"
                        src={item.value}
                    />
                    <Box
                        className="overplay"
                        sx={{
                            top: 0,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            display: 'none',
                            cursor: 'pointer',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={() => onRemove(item.id)}
                    >
                        <DeleteIcon className="text-white" />
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};

export default ImageList;
