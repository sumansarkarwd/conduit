import { AppShell, Button, Container, Group } from '@mantine/core';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Header(){
  const {user,signOut}=useAuth();
  const navLink=(to:string,label:string)=><Button key={to} component={NavLink} to={to} variant="subtle" color="gray" size="sm">{label}</Button>;
  return <AppShell.Header><Container size="lg" h="100%"><Group h="100%" justify="space-between" wrap="wrap" gap="xs"><Link className="brand" to="/">conduit</Link><Group component="nav" gap="xs" wrap="wrap">{user? <>{navLink('/editor','New Article')}{navLink('/settings','Settings')}{navLink(`/profile/${user.username}`,user.username)}<Button variant="light" color="green" size="sm" onClick={signOut}>Sign out</Button></> : <>{navLink('/','Home')}{navLink('/login','Sign in')}{navLink('/register','Sign up')}</>}</Group></Group></Container></AppShell.Header>;
}
