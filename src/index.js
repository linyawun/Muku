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
axios.defaults.baseURL = process.env.REACT_APP_API_URL; //設定axios baseURL，請求時預設會使用此URL

const root = ReactDOM.createRoot(document.getElementById('root'));
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
