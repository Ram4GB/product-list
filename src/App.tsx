import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import ErrorBoundary from './components/ErrorBoundary';
import './mockApi/api';
import AppRouter from './routers';
import store from './store/store';

const App = () => {
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <ErrorBoundary>
                    <AppRouter />
                </ErrorBoundary>
            </SnackbarProvider>
        </Provider>
    );
};

export default App;
