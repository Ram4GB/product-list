import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { name as ProductSliceName, reducer as ProductSliceReducer } from './product';

const store = configureStore({
    reducer: {
        [ProductSliceName]: ProductSliceReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
