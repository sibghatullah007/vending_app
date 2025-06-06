'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaPlus, FaMinus } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import { RxOpenInNewWindow } from "react-icons/rx";
import { Product, fetchProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductsPage() {
  const router = useRouter();
  const { cart, addToCart, updateQuantity, totalItems } = useCart();
  const [movedButtons, setMovedButtons] = useState<{ [key: number]: boolean }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNoProductsModal, setShowNoProductsModal] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError(null);
        const allProducts = await fetchProducts();
        // Filter products by category if category is provided
        const filteredProducts = category 
          ? allProducts.filter(product => product.category === category)
          : allProducts;
        setProducts(filteredProducts);
        
        // Show no products modal if no products found
        if (filteredProducts.length === 0) {
          setShowNoProductsModal(true);
          // Redirect after 3 seconds
          setTimeout(() => {
            router.push('/ai-selector');
          }, 3000);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, router]);

  const handleAddToCart = (product: Product) => {
    setIsButtonDisabled(true);
    setMovedButtons(prev => ({
      ...prev,
      [product.id]: true,
    }));

    setTimeout(() => {
      setSelectedProduct(product);
      setIsPopupVisible(true);
    }, 1500);

    setTimeout(() => {
      setMovedButtons(prev => ({
        ...prev,
        [product.id]: false,
      }));
      setIsButtonDisabled(false);
    }, 1500);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push('/checkout');
    }
  };

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      setIsPopupVisible(false);
    }
  };

  const handleCancelAddToCart = () => {
    setIsPopupVisible(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-sky-200 rounded-full"></div>
            {/* Animated ring */}
            <div className="absolute inset-0 border-4 border-sky-500 rounded-full animate-spin border-t-transparent"></div>
            {/* Inner circle */}
            <div className="absolute inset-4 bg-gradient-to-b from-sky-500 to-cyan-950 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-cyan-950 bg-clip-text text-transparent">
            Loading Products...
          </div>
          <div className="mt-4 text-gray-500">
            Please wait while we fetch your products
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50" style={{ width: '1905px', minHeight: '100vh' }}>
      <div className="flex items-center justify-between w-full sticky z-100 top-0 px-10 py-8 bg-gray-200">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={450}
          height={140}
        />
        <button
          className="relative items-center flex gap-8 px-8 py-8 bg-gradient-to-b from-sky-500 to-cyan-950 text-3xl text-white font-bold rounded-lg shadow-lg"
          onClick={handleCheckout}
        >
          <FaArrowAltCircleRight className='text-5xl' />
          Proceed to Checkout

          {/* Badge */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-3 py-1 text-md font-bold leading-none text-white bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Category Title */}
      {category && (
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-sky-800">
            {category} Products
          </h1>
        </div>
      )}

      {/* Main Product Grid */}
      <div className='flex pe-10'>
        <div className="flex-grow p-10 grid grid-cols-4 gap-8">
          {products.map(product => (
            <div
              key={product.id}
              className="relative bg-gradient-to-l from-sky-600 to-cyan-950 rounded-lg shadow-lg w-[300px] flex flex-col justify-between items-start"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={200}
                height={200}
                className="mx-auto mb-2 w-full h-auto rounded-lg"
              />
              <div className={`${isButtonDisabled ? 'pointer-events-none' : ''}`}>
                <Link href={`/product-detail/${product.id}`} className="font-bold text-2xl mb-2 mx-3 flex gap-1 items-center">
                  {product.name} <RxOpenInNewWindow className='text-4xl' />
                </Link>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={isButtonDisabled}
                className="text-3xl font-black text-white mb-2 mx-3"
              >
                ${product.price}
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className={`absolute bottom-0 ${movedButtons[product.id] ? 'right-[10px]' : 'left-[110px]'} text-white text-5xl transition-all duration-1000 ease-in-out ${movedButtons[product.id] ? 'animation-move-rotate' : ''}`}
                disabled={isButtonDisabled}
              >
                <FaCartPlus className="inline-block mr-2" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="w-[380px] p-6 bg-gray-100 rounded-lg shadow-md sticky top-54 h-fit max-h-[835px] overflow-y-auto flex flex-col">
          <h2 className="font-extrabold text-3xl text-slate-900 mb-1">My Order</h2>
          <p className="font-semibold text-slate-500 mb-4">Take Out</p>
          <div className="space-y-4 flex-grow overflow-auto">
            {cart.length === 0 && <p className="text-red-500">Your cart is empty</p>}
            {cart.map(item => (
              <div key={item.id} className="flex bg-white rounded-lg shadow p-3 gap-3 items-center">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="rounded-lg"
                />
                <div className="flex flex-col flex-grow">
                  <p className="font-semibold text-sky-700">{item.name}</p>
                  <p className="text-slate-700 font-bold text-xl">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 text-slate-700">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-slate-900">
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-slate-900">
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout button */}
          <button
            onClick={handleCheckout}
            className="relative mt-6 py-4 bg-gradient-to-b from-sky-500 to-cyan-950 text-white font-bold rounded-lg flex justify-center items-center gap-2 text-2xl"
          >
            <FaArrowAltCircleRight /> Let&apos;s Checkout

            {/* Red circle badge */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-3 py-1 text-md font-bold leading-none text-white bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </aside>
      </div>

      {/* Popup: Do you want to add this product? */}
      {isPopupVisible && selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-1/3 rounded-lg">
            <h2 className="text-3xl text-black font-semibold mb-4">Do you want to buy the {selectedProduct.name}?</h2>
            <h3 className="text-2xl text-gray-500 font-semibold mb-12">The Price for {selectedProduct.name} is <span className='text-3xl font-black'>${selectedProduct.price}</span></h3>
            <div className="flex justify-center gap-8">
              <button
                onClick={handleConfirmAddToCart}
                className="px-6 py-3 bg-gradient-to-b from-sky-500 text-xl to-cyan-950 text-white font-bold rounded-lg"
              >
                Buy Now
              </button>
              <button
                onClick={handleCancelAddToCart}
                className="px-6 py-3 bg-red-500 text-xl text-white font-bold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Products Found Modal */}
      {showNoProductsModal && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-6">
              {category 
                ? `No products available in the "${category}" category.`
                : 'No products available at the moment.'}
            </p>
            <p className="text-sky-600 mb-8">
              Redirecting to AI Selector in 3 seconds...
            </p>
            <button
              onClick={() => router.push('/ai-selector')}
              className="px-6 py-3 bg-gradient-to-b from-sky-500 to-cyan-950 text-white font-bold rounded-lg shadow-lg hover:from-sky-600 hover:to-cyan-800 transition duration-300"
            >
              Go to AI Selector
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
