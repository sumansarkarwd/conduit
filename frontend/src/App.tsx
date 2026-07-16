import '@mantine/core/styles.css';
import { AppShell, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes';
import './styles.css';

export default function App(){
  return <MantineProvider defaultColorScheme="light" theme={{primaryColor:'green'}}><BrowserRouter><AuthProvider><AppShell header={{height:64}} footer={{height:56}} padding="md"><Header/><AppShell.Main><AppRoutes/></AppShell.Main><Footer/></AppShell></AuthProvider></BrowserRouter></MantineProvider>;
}
