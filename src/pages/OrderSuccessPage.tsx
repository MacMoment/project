import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-24 bg-gray-50">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Successful!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase! A confirmation email has been sent to{' '}
          <span className="font-medium text-gray-900">{email}</span>.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What's Next?
          </h2>
          <ul className="text-left space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F73AFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#F73AFF]">1</span>
              </div>
              <p className="text-gray-600">
                Check your email for the order confirmation and download links.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F73AFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#F73AFF]">2</span>
              </div>
              <p className="text-gray-600">
                Download your digital assets using the provided links.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F73AFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#F73AFF]">3</span>
              </div>
              <p className="text-gray-600">
                Follow the included instructions to import the assets into your project.
              </p>
            </li>
          </ul>

          <Button
            variant="outline"
            className="w-full mt-6 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download Assets
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" asChild>
            <Link to="/store" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
