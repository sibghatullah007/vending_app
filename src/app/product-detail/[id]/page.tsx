'use client'

import { useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar, FaCheckCircle, FaMinus, FaPlus, FaArrowAltCircleRight } from "react-icons/fa";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(resolvedParams.id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition">("description");
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const incrementQty = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleProceedToCheckout = () => {
    setIsPopupVisible(true);
  };

  const handleConfirmCheckout = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleCancelCheckout = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="w-full min-h-[1080px] flex flex-col gap-4 font-sans bg-white">
      <div className="flex items-center justify-between w-full sticky top-0 px-10 py-8 bg-gray-200">
        <Image
          src="/images/logo.png"
          alt="Realtime Nutrition Logo"
          width={410}
          height={110}
        />
      </div>
      <div className="flex justify-center gap-30 w-full">
        {/* Left Image Gallery */}
        <div className="flex flex-col gap-3">
          <div className="w-[757px] h-[757px] rounded-lg overflow-hidden shadow-lg">
            <Image src={mainImage} alt={product.name} width={757} height={757} className="object-contain" />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-[140px] h-[140px] rounded-lg shadow-lg cursor-pointer overflow-hidden border-4 ${mainImage === img ? "border-sky-600" : "border-transparent"
                  }`}
              >
                <Image src={img} alt={`${product.name} thumbnail`} width={200} height={200} className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Product Details */}
        <div className="flex-1 max-w-xl">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < product.rating ? "text-sky-800" : "text-gray-300"}
                size={30}
              />
            ))}
          </div>

          {/* Title */}
          <h1 className="font-extrabold text-sky-800 text-6xl mb-4">{product.name}</h1>

          {/* Description */}
          <p className="text-gray-700 text-2xl mb-6">{product.description}</p>

          {/* Flavor */}
          <div className="mb-6">
            <h2 className="font-bold text-4xl text-sky-800 mb-1">Flavor</h2>
            <div className="flex items-center gap-3">
              {product.flavor.map((f, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className={`w-5 h-5 rounded-full text-2xl ${f.color}`}></span>
                  <span className="text-gray-700 text-2xl">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={decrementQty}
              className="bg-sky-700 text-white rounded-lg w-10 h-10 flex justify-center items-center text-xl font-bold"
            >
              <FaMinus />
            </button>
            <span className="bg-sky-700 text-white rounded-lg w-36 text-center text-xl font-bold py-2">
              {quantity}
            </span>
            <button
              onClick={incrementQty}
              className="bg-sky-700 text-white rounded-lg w-10 h-10 flex justify-center items-center text-xl font-bold"
            >
              <FaPlus />
            </button>
            <span className="text-gray-700 font-semibold">{(product.stock)}</span>
          </div>

          {/* Price & Buy Buttons */}
          <div className="mb-4 flex flex-col gap-3">
            <button 
              onClick={handleProceedToCheckout}
              className="border border-sky-700 text-sky-700 font-bold rounded-lg py-3 px-6 text-xl">
              Grab Your Snacks for <span className="font-extrabold">${(product.price * quantity).toFixed(2)}</span>
            </button>
            <button 
              onClick={handleProceedToCheckout}
              className="bg-red-700 text-white font-bold rounded-lg py-3 px-6 flex items-center gap-2 justify-center text-xl"
            >
              <FaArrowAltCircleRight /> Proceed to Checkout - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-4 flex gap-4 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-2 rounded-t-lg font-semibold text-2xl ${activeTab === "description"
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-100 text-gray-500"
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`px-4 py-2 rounded-t-lg font-semibold text-2xl ${activeTab === "nutrition"
                ? "bg-gray-200 text-gray-900"
                : "bg-gray-100 text-gray-500"
                }`}
            >
              Nutrition
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white p-4 rounded-b-lg border border-t-0 border-gray-300 min-h-[200px]">
            {activeTab === "description" && (
              <ul className="list-disc pl-5 space-y-2 text-gray-700 text-xl">
                <li>Tasty & Healthy Option: Enjoy crispy, salty potato chips made with high-quality oil and real cheese flavor.</li>
                <li>User-Friendly Interface: Simple quantity selector, flavor indicators, and clear pricing for a smooth shopping experience.</li>
                <li>Attractive Product Display: Eye-catching product image and rating system to build trust and appeal to customers.</li>
                <li>Quick Checkout Options: Clear, standout buttons for immediate purchase or easy checkout, improving conversion rates.</li>
              </ul>
            )}
            {activeTab === "nutrition" && (
              <ul className="space-y-2 text-gray-700">
                {product.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-2 border-b border-gray-300 py-1 text-xl">
                    <FaCheckCircle className="text-green-600" size={28} />
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Popup: Confirm Checkout */}
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-1/3 rounded-lg">
            <h2 className="text-3xl text-black font-semibold mb-4">Do you want to proceed to checkout?</h2>
            <h3 className="text-2xl text-gray-500 font-semibold mb-12">
              Total Amount: <span className='text-3xl font-black'>${(product.price * quantity).toFixed(2)}</span>
            </h3>
            <div className="flex justify-center gap-8">
              <button
                onClick={handleConfirmCheckout}
                className="px-6 py-3 bg-gradient-to-b from-sky-500 text-xl to-cyan-950 text-white font-bold rounded-lg"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleCancelCheckout}
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
