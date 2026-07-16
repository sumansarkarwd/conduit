import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes';
import './styles.css';
export default function App(){ return <BrowserRouter><AuthProvider><Header/><AppRoutes/><Footer/></AuthProvider></BrowserRouter>; }
