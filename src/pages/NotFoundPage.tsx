import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-16">
      <div className="max-w-xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-purple-500 font-semibold mb-3">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page not found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn’t exist or has been moved. Let’s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="primary">
            <Link to="/">Return home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/store">Browse the store</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
