import { RootState } from '@/store/store';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const FullPageLoading = () => {
    const loading = useSelector((state: RootState) => state.ProductSlice.isLoading);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.2)',
                width: '100vw',
                height: '100vh',
                display: loading ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default FullPageLoading;
