import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCar, FaStar } from 'react-icons/fa';
import {
  FiUser,
  FiMail,
  FiLock,
  FiShield,
  FiArrowRight,
  FiAlertCircle,
} from 'react-icons/fi';
import AuthShell from '../components/auth/AuthShell';
import AuthField from '../components/auth/AuthField';
import { ROUTES } from '../constants/routePaths';
import { validateRegisterForm } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import heroImg from '../assets/register-hero.jpg';

export default function Register() {
  const location = useLocation();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  // Only fields with a problem appear in this object
  const errors = validateRegisterForm(form);
  const shown = (k) => ((touched[k] || submitted) ? errors[k] || '' : '');
  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError('');
    if (hasErrors) return;

    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      variant="register"
      image={heroImg}
      heroBottom={
        <>
          <div className="auth-eyebrow"><FaCar size={16} /> Peer-to-peer mobility</div>
          <h2>Turn your driveway into effortless income, or find your perfect trip.</h2>
          <div className="auth-rating">
            <FaStar size={16} color="#EEB01E" />
            <strong>4.9/5</strong> <span>(18k+ trips)</span> • <span>Zero hidden subscriptions</span>
          </div>
        </>
      }
    >
      <div className="auth-brand"><FaCar size={22} /> CaRent</div>
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-sub">It takes less than a minute.</p>

      <form onSubmit={handleSubmit} noValidate>
        <AuthField
          name="name" label="Full name" icon={FiUser} placeholder="Maria Santos"
          value={form.name} onChange={update} onBlur={blur} error={shown('name')}
        />
        <AuthField
          name="email" label="Email" icon={FiMail} type="email" placeholder="maria@example.com"
          value={form.email} onChange={update} onBlur={blur}
          error={shown('email')} status={shown('email') ? 'Invalid format' : ''}
        />
        <AuthField
          name="password" label="Password" icon={FiLock} type="password"
          value={form.password} onChange={update} onBlur={blur}
          hint="At least 6 characters"
          error={shown('password')} status={shown('password') ? 'Invalid' : ''}
        />
        <AuthField
          name="confirmPassword" label="Confirm password" icon={FiShield} type="password"
          value={form.confirmPassword} onChange={update} onBlur={blur}
          error={shown('confirmPassword')} status={shown('confirmPassword') ? 'Mismatch' : ''}
        />

        {submitted && hasErrors && (
          <div className="auth-alert" role="alert">
            <FiAlertCircle size={18} /> Please fix the errors above.
          </div>
        )}

        {serverError && (
          <div className="auth-alert" role="alert">
            <FiAlertCircle size={18} /> {serverError}
          </div>
        )}

        <p className="auth-terms">
          By selecting Create account, you confirm that you agree to CaRent's Terms of Service and Privacy Policy.
        </p>

        <button className="auth-submit" disabled={loading}>
          {loading ? 'Creating account…' : <>Create account <FiArrowRight size={20} /></>}
        </button>
      </form>

      <p className="auth-switch">Already have an account? <Link to={ROUTES.LOGIN} state={location.state}>Log in</Link></p>
      <Link to={ROUTES.BROWSE} className="auth-continue">Continue browsing</Link>
    </AuthShell>
  );
}