import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
export function Header(){ const {user,signOut}=useAuth(); return <header className="top"><Link className="brand" to="/">conduit</Link><nav>{user? <><NavLink to="/editor">New Article</NavLink><NavLink to="/settings">Settings</NavLink><NavLink to={`/profile/${user.username}`}>{user.username}</NavLink><button onClick={signOut}>Sign out</button></> : <><NavLink to="/">Home</NavLink><NavLink to="/login">Sign in</NavLink><NavLink to="/register">Sign up</NavLink></>}</nav></header>; }
