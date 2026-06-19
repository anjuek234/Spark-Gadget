import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import './Login.css';

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()

    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', login: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate using Zod
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const newErrors = { email: '', password: '', login: '' };
      result.error.errors.forEach((error) => {
        if (error.path[0] === 'email') {
          newErrors.email = error.message;
        } else if (error.path[0] === 'password') {
          newErrors.password = error.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setErrors({ email: '', password: '', login: '' });
    setLoading(true);

    try {
      const response = await axios.post(
        "https://sample-e-1.onrender.com/login",
        {
          email,
          password,
        },
        {
          timeout: 60000, // 60 seconds timeout (Render free tier needs time to wake up)
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login response:', response.data);
      
      // Check if login was successful
      if (response.status === 200 || response.data?.success || response.data?.token) {
        if (response.data?.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        window.location.href = "/home";
      } else {
        setErrors({ email: '', password: '', login: response.data?.message || 'Login failed' });
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Server is taking too long. Please try again in a moment.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || 'Invalid input. Please check your credentials.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message?.includes('Network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (!error.response) {
        errorMessage = 'Unable to connect to server. Please check your connection and try again.';
      }
      
      setErrors({ email: '', password: '', login: errorMessage });
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.login && <div className="error-message">{errors.login}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              disabled={loading}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              disabled={loading}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
        </div>
      </div>

      <div className="login-decorative"></div>
    </div>
  );
}