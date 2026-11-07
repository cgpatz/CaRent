import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import '../../styles/layout.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand"><FaCar size={18} /> CaRent Peer-to-Peer Auto Marketplace</div>
      <nav className="footer__links">
        <Link to="/">Browse Cars</Link>
        <Link to="/saved">Saved</Link>
        <Link to="/guidelines">Host Guidelines</Link>
        <Link to="/support">Support</Link>
      </nav>
      <div className="footer__copy">© 2024 CaRent Inc. All rights reserved.</div>
    </footer>
  );
}