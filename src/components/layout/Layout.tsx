import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';

export function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
