import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import FullPageLoading from './components/FullPageLoading';
import './mockApi/api';
import AppRouter from './routers';
import store from './store/store';

const App = () => {
    return (
        <SnackbarProvider maxSnack={5}>
            <Provider store={store}>
                <AppRouter />
                <FullPageLoading />
            </Provider>
        </SnackbarProvider>
    );
};

export default App;
