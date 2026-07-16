import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SettingsPage } from './pages/SettingsPage';
import { EditorPage } from './pages/EditorPage';
import { ArticlePage } from './pages/ArticlePage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
export function AppRoutes(){ return <Routes><Route path="/" element={<HomePage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/settings" element={<RequireAuth><SettingsPage/></RequireAuth>}/><Route path="/editor" element={<RequireAuth><EditorPage/></RequireAuth>}/><Route path="/editor/:slug" element={<RequireAuth><EditorPage/></RequireAuth>}/><Route path="/article/:slug" element={<ArticlePage/>}/><Route path="/profile/:username" element={<ProfilePage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes>; }
