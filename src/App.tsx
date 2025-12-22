import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  HomePage,
  StorePage,
  PortfolioPage,
  ServicesPage,
  AboutPage,
  ContactPage,
  CheckoutPage,
  OrderSuccessPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
