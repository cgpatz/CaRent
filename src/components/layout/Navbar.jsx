import { Link, NavLink } from 'react-router-dom';
import { Search, Plus, Car } from 'lucide-react';
import { ROUTES } from '../../constants/routePaths';
import '../../styles/layout.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to={ROUTES.BROWSE} className="navbar__brand">
        <Car size={26} /> CaRent
      </Link>

      <div className="navbar__search">
        <Search size={18} />
        <input placeholder="Search car models, locations..." />
      </div>

      <nav className="navbar__links">
        <NavLink to={ROUTES.BROWSE}>Browse</NavLink>
        <NavLink to="/saved">Saved</NavLink>
        <NavLink to={ROUTES.INBOX}>
          Inbox <span className="navbar__badge">3</span>
        </NavLink>
        <NavLink to="/my-listings">My Listings</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <Link to={ROUTES.CREATE_LISTING} className="navbar__cta">
        <Plus size={16} /> List your car
      </Link>
      <div className="navbar__avatar" />
    </header>
  );
}