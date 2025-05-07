'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
    const items = [
        {
            title: 'Energy Fuel',
            image: '/images/energy_fuel.png',
        },
        {
            title: 'Brain Fuel',
            image: '/images/brain_fuel.png',
        },
        {
            title: 'Hydration Check',
            image: '/images/hydration_check.png',
        },
        {
            title: 'Muscle Pick',
            image: '/images/muscle_pick.png',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(3); // Start with Muscle Pick
    const radius = 200;

    const rotateCircle = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50" style={{ width: '1920px', height: '1080px' }}>
            {/* Logo Section */}
            <div className="flex items-center justify-between w-full sticky top-0 px-10 py-8">
                <Image
                    src="/images/logo.png"
                    alt="Realtime Nutrition Logo"
                    width={450}
                    height={140}
                />
            </div>

            <div className="flex justify-center bg-gray-50 py-20" style={{ width: '1920px', height: '1080px' }}>
                <div className="flex w-full px-10">
                    {/* Left Side: Circle Options */}
                    <div className="relative w-[450px] h-[450px] mx-auto">
                        <div className="absolute inset-0 border border-gray-300 rounded-full pointer-events-none" />

                        {items.map((item, index) => {
                            const position = (index - activeIndex + items.length) % items.length;

                            // Define fixed positions
                            const positions = [
                                { left: '100%', top: '50%' }, // Right
                                { left: '50%', top: '102%' }, // Bottom
                                { left: '0%', top: '50%' }, // Left
                                { left: '50%', top: '05%' }, // Top
                            ];

                            const { left, top } = positions[position];
                            const isActive = position === 0;

                            return (
                                <div
                                    key={index}
                                    onClick={() => rotateCircle(index)}
                                    className="absolute cursor-pointer text-center transition-all duration-500 h-auto w-full"
                                    style={{
                                        left,
                                        top,
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: isActive ? 20 : 10,
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={`mx-auto transition-all duration-500 ${isActive ? 'w-40 h-40 bg-blue-200 rounded-full' : 'w-20 h-20'}`}
                                    />
                                    <p className="font-bold text-black text-xl mt-2">{item.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side: Text and CTA */}
                    <div className="flex flex-col items-center w-1/2 ml-20">
                        <h1 className="text-7xl font-extrabold text-black mb-8 text-center leading-tight">
                            SNACKS SELECTOR AI
                        </h1>
                        <h2 className="text-3xl font-medium text-gray-800 mb-6 text-center">
                            What Snacks fight brain fog like a Ninja?
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 text-center">
                            The stealthiest brain boost in the building
                        </p>
                        <div className="text-3xl text-gray-700 text-center mb-10">
                            <h3 className="font-semibold mb-2">Come Closer </h3>
                            <p>&</p>
                            <p className="font-medium">Tap to Talk Snacks</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
