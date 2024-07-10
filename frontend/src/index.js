import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(await init());
