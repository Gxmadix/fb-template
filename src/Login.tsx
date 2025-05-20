import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Link } from '@mui/material';

type LoginFormInputs = {
    email: string;
    password: string;
};

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            if (mode === 'login') {
                await signInWithEmailAndPassword(auth, data.email, data.password);
            } else if (mode === 'register') {
                await createUserWithEmailAndPassword(auth, data.email, data.password);
            } else if (mode === 'reset') {
                await sendPasswordResetEmail(auth, data.email);
                setError('Password reset email sent. Check your inbox.');
                return;
            }
            navigate('/');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            setError('Failed to login with Google');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        {mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Reset Password'}
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            {...register('email', { required: 'Email is required' })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        {mode !== 'reset' && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password', { required: 'Password is required' })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Register' : 'Send Reset Email'}
                        </Button>
                    </form>
                    {mode === 'login' && process.env.REACT_APP_ENABLE_GOOGLE_LOGIN === 'true' && (
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={handleGoogleLogin}
                            sx={{ mt: 2 }}
                        >
                            Login with Google
                        </Button>
                    )}
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link href="#" onClick={() => setMode('login')} sx={{ mr: 2 }}>Login</Link>
                        <Link href="#" onClick={() => setMode('register')} sx={{ mr: 2 }}>Register</Link>
                        <Link href="#" onClick={() => setMode('reset')}>Reset Password</Link>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login; 