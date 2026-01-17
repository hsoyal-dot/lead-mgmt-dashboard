import { useState } from 'react';
import { API } from '../api';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const response = await API.post(endpoint, payload);

            // Store token and user info
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to dashboard
            window.location.href = '/leads';
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Circles */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 6s ease-in-out infinite',
                zIndex: 0
            }}></div>

            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite reverse',
                zIndex: 0
            }}></div>

            {/* Login/Register Card */}
            <div className="fade-in" style={{
                width: '100%',
                maxWidth: '440px',
                padding: '3rem 2.5rem',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Title */}
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    fontSize: '1.875rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)'
                }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    marginBottom: '2.5rem',
                    fontSize: '0.95rem'
                }}>
                    {isLogin ? 'Sign in to access your dashboard' : 'Sign up to get started'}
                </p>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: '0.75rem 1rem',
                        marginBottom: '1.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                color: 'var(--text-secondary)'
                            }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required={!isLogin}
                                placeholder="John Doe"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.95rem',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            color: 'var(--text-secondary)'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '0.95rem',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            color: 'var(--text-secondary)'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            minLength={6}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '0.95rem',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)'
                            }}
                        />
                        {!isLogin && (
                            <p style={{
                                marginTop: '0.5rem',
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)'
                            }}>
                                Must be at least 6 characters
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.05rem',
                            fontWeight: '600',
                            borderRadius: '8px',
                            background: loading ? 'var(--bg-hover)' : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                            border: 'none',
                            color: 'white',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                {/* Toggle Login/Register */}
                <div style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setFormData({ email: '', password: '', name: '' });
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary-light)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '0.9rem'
                        }}
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </div>
            </div>

            {/* CSS Animation */}
            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
        </div>
    );
}