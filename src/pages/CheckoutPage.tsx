import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCartStore } from '../store/cartStore';
import { CreditCard, User, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { ordersApi } from '../services/api';

type Step = 'contact' | 'payment';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactData, setContactData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-24">
        <div className="max-w-md mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart before checking out.
          </p>
          <Button variant="primary" onClick={() => navigate('/store')}>
            Browse Store
          </Button>
        </div>
      </section>
    );
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const orderItems = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      await ordersApi.submitCheckout({
        email: contactData.email,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        items: orderItems,
      });

      clearCart();
      navigate('/order-success', {
        state: { email: contactData.email },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                step === 'contact' ? 'text-[#F73AFF]' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'contact'
                    ? 'bg-[#F73AFF] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <User size={16} />
              </div>
              <span className="font-medium">Contact</span>
            </div>
            <div className="w-12 h-px bg-gray-300" />
            <div
              className={`flex items-center gap-2 ${
                step === 'payment' ? 'text-[#F73AFF]' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'payment'
                    ? 'bg-[#F73AFF] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <CreditCard size={16} />
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {step === 'contact' ? (
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-6"
                  aria-busy={isSubmitting}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>

                    <Input
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="john@example.com"
                      required
                      autoComplete="email"
                      value={contactData.email}
                      onChange={(e) =>
                        setContactData({ ...contactData, email: e.target.value })
                      }
                    />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="John"
                      required
                      autoComplete="given-name"
                      value={contactData.firstName}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          firstName: e.target.value,
                        })
                      }
                    />
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Doe"
                      required
                      autoComplete="family-name"
                      value={contactData.lastName}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ArrowRight size={18} />
                  </Button>
                </form>
              ) : (
                <form
                  onSubmit={handlePaymentSubmit}
                  className="space-y-6"
                  aria-busy={isSubmitting}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Details
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep('contact')}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#F73AFF] transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  </div>

                  <Input
                    id="cardName"
                    label="Name on Card"
                    placeholder="John Doe"
                    required
                    autoComplete="cc-name"
                    value={paymentData.name}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, name: e.target.value })
                    }
                  />

                  <Input
                    id="cardNumber"
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    required
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={paymentData.cardNumber}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cardNumber: e.target.value,
                      })
                    }
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      id="expiry"
                      label="Expiry Date"
                      placeholder="MM/YY"
                      required
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={paymentData.expiry}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          expiry: e.target.value,
                        })
                      }
                    />
                    <Input
                      id="cvc"
                      label="CVC"
                      placeholder="123"
                      required
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      value={paymentData.cvc}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, cvc: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                    <Lock size={16} />
                    Your payment information is encrypted and secure.
                  </div>

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
                    {isSubmitting ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h3>

              <ul className="space-y-4 mb-6">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <hr className="border-gray-100 mb-6" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$0.00</span>
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
