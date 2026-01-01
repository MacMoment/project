import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Mail, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import { contactApi } from '../services/api';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await contactApi.submit(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center py-24">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Message Sent!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for reaching out! We'll get back to you as soon as possible.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
              });
            }}
          >
            Send Another Message
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600">
                  Feel free to reach out through any of these channels.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F73AFF]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#F73AFF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:hello@academystudios.com"
                      className="text-gray-600 hover:text-[#F73AFF] transition-colors"
                    >
                      hello@academystudios.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F73AFF]/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={20} className="text-[#F73AFF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Discord</h3>
                    <a
                      href="https://discord.gg/academystudios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#F73AFF] transition-colors"
                    >
                      Join our community
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F73AFF]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#F73AFF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">Virtual Studio, Internet</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Response Time
                </h3>
                <p className="text-gray-600 text-sm">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Send a Message
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-busy={isSubmitting}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="name"
                      label="Your Name"
                      placeholder="John Doe"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <Input
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="john@example.com"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <Input
                    id="subject"
                    label="Subject"
                    placeholder="How can we help?"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />

                  <Textarea
                    id="message"
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />

                  {error && (
                    <div
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
