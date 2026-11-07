
import Footer from '../layout/Footer';
import '../../styles/auth.css';

export default function AuthShell({ variant, image, heroTop, heroBottom, children }) {
  return (
    <>
      <main className="auth-page">
        <section className={`auth-card auth-card--${variant}`}>
          <aside className="auth-hero">
            <img src={image} alt="" />
            {heroBottom && <div className="auth-hero__shade" />}
            {heroTop && <div className="auth-hero__top">{heroTop}</div>}
            {heroBottom && <div className="auth-hero__bottom">{heroBottom}</div>}
          </aside>
          <div className="auth-panel">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}