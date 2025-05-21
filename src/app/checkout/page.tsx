'use client'

import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { cart, removeFromCart, totalPrice } = useCart();
    const discount = 0;
    const coupons = 0;

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="flex items-center justify-between w-full sticky top-0 px-10 py-8 bg-gray-200 mb-8">
                <Image
                    src="/images/logo.png"
                    alt="Realtime Nutrition Logo"
                    width={410}
                    height={110}
                />
            </div>
            <div className="flex max-w-[1900px] w-full px-12 pb-12 gap-10">
                {/* Left side - Selected Products */}
                <div className="flex flex-col gap-4 flex-1">
                    <h2 className="text-5xl font-bold text-sky-800 mb-2">Selected Products</h2>
                    <p className="mb-6 text-3xl text-slate-600">Please proceed to checkout.</p>

                    {cart.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center bg-gradient-to-r from-sky-900 to-cyan-600 rounded-md p-3 gap-3 shadow-md"
                        >
                            <div className="w-[100px] h-[100px] rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1 text-white">
                                <div className="font-semibold mb-3 text-xl">{product.name}</div>
                                <div className="text-lg mb-3">${product.price}</div>
                                <div className="font-bold mt-1 text-xl">Quantity: {product.quantity.toString().padStart(2, '0')}</div>
                            </div>
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-white hover:text-red-300 text-xl p-2"
                                aria-label={`Delete ${product.name}`}
                            >
                                <FaTrashAlt size={30} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right side - How to get Products & Summary */}
                <div className="flex flex-col w-[920px] gap-6 sticky top-50 h-fit">
                    {/* Instructions and QR Code */}
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <h3 className="font-semibold text-3xl text-slate-900 mb-2">How to get Products?</h3>
                            <ol className="list-decimal list-inside text-slate-700 text-2xl leading-10">
                                <li>Open the Banking App.</li>
                                <li>Scan the QR code & Pay for it.</li>
                                <li>Get the Products.</li>
                            </ol>
                        </div>
                        <div className="w-[320px] h-[320px]">
                            <Image
                                src="/qr.webp"
                                alt="QR Code"
                                width={320}
                                height={320}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-slate-300" />

                    {/* Summary */}
                    <div className="flex flex-col gap-2 text-slate-900 font-semibold text-2xl">
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Coupons</span>
                            <span>${coupons.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button
                        disabled={cart.length === 0}
                        className="mt-4 bg-red-700 text-white py-5 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-800 transition disabled:bg-gray-400"
                    >
                        <span className="inline-block w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span> Waiting For the Payment
                    </button>
                </div>
            </div>
        </div>
    );
}
