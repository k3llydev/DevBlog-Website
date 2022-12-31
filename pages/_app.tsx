import type { AppProps } from 'next/app';
import { store } from '../lib/redux/store';
import { Provider } from 'react-redux';

import AppHeader from '../components/common/AppHeader';

import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <AppHeader {...pageProps.header} ></AppHeader>
        <Component {...pageProps} />
    </Provider>
);

export default App;
