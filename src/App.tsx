import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import './mockApi/api';
import AppRouter from './routers';
import store from './store/store';

const App = () => {
    return (
        <SnackbarProvider maxSnack={5}>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </SnackbarProvider>
    );
};

export default App;
