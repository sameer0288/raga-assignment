import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="login-wrapper" style={{ 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass login-card"
        style={{
          width: '400px',
          padding: '3rem',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}
      >
        <div className="login-header" style={{ marginBottom: '2.5rem' }}>
          <div className="logo-icon" style={{
            display: 'inline-flex',
            padding: '1rem',
            background: 'rgba(0, 102, 255, 0.1)',
            borderRadius: '16px',
            marginBottom: '1rem'
          }}>
            <Activity size={32} color="#0066ff" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>HealBase Portal</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Secure B2B Healthcare Access</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-alert" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--error)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              fontSize: '0.85rem'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="input-group" style={{ marginBottom: '1.25rem', position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="input-group" style={{ marginBottom: '2rem', position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="password" 
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Demo credentials: <strong>demo@healbase.com</strong> / <strong>password</strong>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="gradient-btn"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
          >
            {loading ? 'Authenticating...' : (
              <>
                <LogIn size={20} />
                Access Dashboard
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Enterprise Health Systems v4.0 • Federated ID
        </div>
      </motion.div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          border-color: var(--accent-primary);
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
