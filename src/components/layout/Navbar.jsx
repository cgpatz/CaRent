import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useLoginPrompt } from '../../hooks/useLoginPrompt';
import { ROUTES } from '../../constants/routePaths';
import './Navbar.css';

const NAV_LINKS = [
  { to: ROUTES.BROWSE, label: 'Browse' },
  {
    to: ROUTES.INBOX,
    label: 'Inbox',
    requiresLogin: true,
    message: 'Log in to view your messages.',
  },
  {
    to: ROUTES.CREATE_LISTING,
    label: 'Create listing',
    requiresLogin: true,
    message: 'Log in to list your car.',
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { requireLogin } = useLoginPrompt();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate(ROUTES.BROWSE);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to={ROUTES.BROWSE} className="navbar-brand" onClick={closeMenu}>
          <FaCar size={24} /> CaRent
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`navbar-menu ${open ? 'is-open' : ''}`}>
          <ul className="navbar-links">
            {NAV_LINKS.map(({ to, label, requiresLogin, message }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={(e) => {
                    closeMenu();
                    // Guests: stop the navigation and show the popup instead
                    if (requiresLogin && !requireLogin(message)) e.preventDefault();
                  }}
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? 'is-active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            {user ? (
              <>
                <span className="navbar-user">Hi, {user.name || user.email}</span>
                <button className="navbar-btn navbar-btn-outline" onClick={handleLogout}>
                  <FiLogOut size={16} /> Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="navbar-btn navbar-btn-outline"
                  onClick={closeMenu}
                >
                  Log in
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="navbar-btn navbar-btn-solid"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}