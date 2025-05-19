import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

type FormData = {
    email: string;
    password: string;
};

function Login() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError('');
        try {
            if (mode === 'login') {
                const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            } else if (mode === 'register') {
                const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            } else if (mode === 'reset') {
                await sendPasswordResetEmail(auth, data.email);
            }
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                {mode !== 'reset' && (
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password', { required: 'Password is required' })}
                    />
                )}
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                <button type="submit" disabled={loading}>
                    {mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Send Reset Email'}
                </button>
                {mode === 'login' && (
                    <button type="button" onClick={handleGoogleLogin} disabled={loading}>
                        Login with Google
                    </button>
                )}
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login; 