import { StrictMode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { store } from './store';
import './stylesheets/all.scss';
import Loading from './components/Loading';
import App from './App';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL as string;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<Loading isLoading={true} />}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </HashRouter>
  </StrictMode>
);

reportWebVitals();
