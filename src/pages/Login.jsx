import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import {
  FiArrowRight,
  FiMessageSquare,
  FiAlertCircle,
  FiShield,
} from 'react-icons/fi';
import AuthShell from '../components/auth/AuthShell';
import AuthField from '../components/auth/AuthField';
import { ROUTES } from '../constants/routePaths';
import { validateLoginForm } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import heroImg from '../assets/login-hero.jpg';

export default function Login() {
  const location = useLocation();
  const { login } = useAuth();
  const notice = location.state?.message; // e.g. "Log in to message this owner."
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validateLoginForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      variant="login"
      image={heroImg}
      heroTop={<span className="auth-pill">Peer-to-peer mobility</span>}
    >
      <div className="auth-brand"><FaCar size={36} /> CaRent</div>
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-sub">Log in to message owners and post your car.</p>

      {notice && (
        <div className="auth-notice"><FiMessageSquare size={18} /> {notice}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <AuthField
          name="email" label="Email" type="email" status="Required"
          placeholder="e.g. maria@example.com"
          value={form.email} onChange={update}
          error={fieldErrors.email}
        />
        <AuthField
          name="password" label="Password" type="password"
          value={form.password} onChange={update}
          error={fieldErrors.password}
        />
        {/* TODO: replace with a ROUTES constant once the team adds forgot-password */}
        <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>

        {error && (
          <div className="auth-alert" role="alert"><FiAlertCircle size={18} /> {error}</div>
        )}

        <button className="auth-submit" disabled={loading}>
          {loading ? 'Logging in…' : <>Log in <FiArrowRight size={20} /></>}
        </button>
      </form>

      <p className="auth-switch">
        New to CaRent? <Link to={ROUTES.REGISTER} state={location.state}>Create account</Link>
      </p>
      <Link to={ROUTES.BROWSE} className="auth-continue">Continue browsing</Link>

      <div className="auth-trust">
        <span><FiShield size={16} /> Insurance Included</span>
        <span><FiShield size={16} /> Host Protected</span>
      </div>
    </AuthShell>
  );
}