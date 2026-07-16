import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ErrorList } from '../components/ErrorList';
export function LoginPage(){ const {signIn}=useAuth(); const nav=useNavigate(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [errors,setErrors]=useState<any>(); async function submit(e:FormEvent){ e.preventDefault(); try{ await signIn(email,password); nav('/'); }catch(err){ setErrors(err); } } return <main><h1>Sign in</h1><Link to="/register">Need an account?</Link><ErrorList errors={errors}/><form onSubmit={submit}><input aria-label="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input aria-label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><button>Sign in</button></form></main>; }
