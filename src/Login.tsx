import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login - User:', userCredential.user);
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Register - User:', userCredential.user);
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 300, margin: '0 auto', padding: 20 }}>
            <div style={{ marginBottom: 10 }}>
                <button onClick={() => setMode('login')}>Login</button>
                <button onClick={() => setMode('register')}>Register</button>
                <button onClick={() => setMode('reset')}>Reset Password</button>
            </div>
            {mode === 'login' && (
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>Login</button>
                    <button type="button" onClick={handleGoogleLogin} disabled={loading}>
                        Login with Google
                    </button>
                </form>
            )}
            {mode === 'register' && (
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>Register</button>
                </form>
            )}
            {mode === 'reset' && (
                <form onSubmit={handleReset}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>Send Reset Email</button>
                </form>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login; 