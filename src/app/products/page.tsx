'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import { RxOpenInNewWindow } from "react-icons/rx";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (1).png" },
  { id: 2, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (2).png" },
  { id: 3, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (3).png" },
  { id: 4, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (4).png" },
  { id: 5, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (5).png" },
  { id: 6, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (6).png" },
  { id: 7, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (7).png" },
  { id: 8, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (8).png" },
  { id: 9, name: "Cheese & Chips", price: 4.99, image: "/images/products/Lays (9).png" },
];

export default function Page() {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);
  const [movedButtons, setMovedButtons] = useState<{ [key: number]: boolean }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track if buttons are disabled
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Show the pop-up
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Track selected product

  const addToCart = (product: Product) => {
    // Disable all buttons and trigger animation for the clicked product
    setIsButtonDisabled(true);
    setMovedButtons(prev => ({
      ...prev,
      [product.id]: true,
    }));

    // Set the selected product and show the confirmation pop-up after animation (1.5 seconds)
    setTimeout(() => {
      setSelectedProduct(product); // Store the selected product
      setIsPopupVisible(true);
    }, 1500); // Show popup after animation duration

    // Reset the position of the button after the animation completes (1.5 seconds)
    setTimeout(() => {
      setMovedButtons(prev => ({
        ...prev,
        [product.id]: false,
      }));
      setIsButtonDisabled(false); // Enable the buttons after animation
    }, 1500); // Reset after 1.5 seconds for smooth animation
  };

  const handleCheckout = () => {
    alert("Proceeding to Checkout...");
  };

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      setCart([...cart, selectedProduct]); // Add selected product to the cart
      setIsPopupVisible(false); // Close the pop-up
      router.push('/product-details');
    }
  };

  const handleCancelAddToCart = () => {
    setIsPopupVisible(false); // Close the pop-up without adding the product
  };

  return (
    <div className="flex flex-col items-start justify-center bg-gray-50" style={{ width: '1905px', height: 'auto' }}>
      {/* Header Section */}
      <div className="flex items-center justify-between w-full sticky z-100 top-0 px-10 py-8 bg-gray-200">
        <Image
          src="/images/logo.png"
          alt="Realtime Nutrition Logo"
          width={450}
          height={140}
        />
        <button
          className="items-center flex gap-8 px-8 py-8 bg-gradient-to-b from-sky-500 to-cyan-950 text-3xl text-white font-bold rounded-lg shadow-lg"
          onClick={handleCheckout}
        >
          <FaArrowAltCircleRight className='text-5xl' /> Proceed to Checkout
        </button>
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-4 gap-8 p-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-gradient-to-l from-sky-600 to-cyan-950 rounded-lg shadow-lg w-[300px]"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="mx-auto mb-2 w-full h-auto rounded-lg"
            />
            <div className={`${isButtonDisabled ? 'pointer-events-none' : ''}`}>
              <Link href={"/product-detail"} className="font-bold text-2xl mb-2 mx-3 flex gap-1 items-center">{product.name} <RxOpenInNewWindow className='text-4xl' /></Link>
            </div>
            <button onClick={() => addToCart(product)} disabled={isButtonDisabled} className="text-3xl font-black text-white mb-4 mx-3">${product.price}</button>
            <button
              onClick={() => addToCart(product)}
              className={`absolute bottom-0 ${movedButtons[product.id] ? 'right-[10px]' : 'left-[110px]'} text-white text-5xl transition-all duration-1000 ease-in-out ${movedButtons[product.id] ? 'animation-move-rotate' : ''}`}
              disabled={isButtonDisabled} // Disable the button when animation is running
            >
              <FaCartPlus className="inline-block mr-2" />
            </button>
          </div>
        ))}
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
    </div>
  );
}
