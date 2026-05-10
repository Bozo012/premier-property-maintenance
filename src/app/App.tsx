import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root';
import Home from './pages/Home';
import Services from './pages/Services';
import RentalProperties from './pages/RentalProperties';
import RequestService from './pages/RequestService';
import HowItWorks from './pages/HowItWorks';
import CustomerPortal from './pages/CustomerPortal';
import NotFound from './pages/NotFound';
import { WebsiteContentProvider } from './content/website-content-provider';

export default function App() {
  return (
    <WebsiteContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="rental-properties" element={<RentalProperties />} />
            <Route path="request-service" element={<RequestService />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="customer-portal" element={<CustomerPortal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WebsiteContentProvider>
  );
}
