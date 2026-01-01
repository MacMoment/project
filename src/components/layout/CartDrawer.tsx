import { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScrollLock';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    lockBodyScroll();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockBodyScroll();
    };
  }, [closeCart, isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingBag size={28} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Discover our amazing digital assets
                </p>
                <Button variant="primary" onClick={closeCart} asChild>
                  <Link to="/store">Browse Store</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex gap-4 p-4 rounded-xl bg-gray-50"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-[#F73AFF] font-semibold mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-5 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-gray-700">Subtotal</span>
                <span className="font-bold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={closeCart}
                asChild
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
