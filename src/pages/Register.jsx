import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import heroImg from '../assets/register-hero.jpg';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const errors = {
    name: !form.name.trim() ? 'Please enter your full name' : '',
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? 'Please enter a valid email address' : '',
    password: form.password.length < 6 ? 'Password must be at least 6 characters' : '',
    confirm: form.confirm !== form.password ? 'Passwords do not match' : '',
  };
  const shown = (k) => ((touched[k] || submitted) ? errors[k] : '');
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    // TODO: Firebase createUserWithEmailAndPassword + save the full name
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
          name="confirm" label="Confirm password" icon={FiShield} type="password"
          value={form.confirm} onChange={update} onBlur={blur}
          error={shown('confirm')} status={shown('confirm') ? 'Mismatch' : ''}
        />

        {submitted && hasErrors && (
          <div className="auth-alert" role="alert">
            <FiAlertCircle size={18} /> Please fix the errors above.
          </div>
        )}

        <p className="auth-terms">
          By selecting Create account, you confirm that you agree to CaRent's Terms of Service and Privacy Policy.
        </p>

        <button className="auth-submit">Create account <FiArrowRight size={20} /></button>
      </form>

      <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      <Link to="/" className="auth-continue">Continue browsing</Link>
    </AuthShell>
  );
}