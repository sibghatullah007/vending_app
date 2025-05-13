'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FaMicrophoneAlt, FaCamera } from "react-icons/fa";

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
    const [isCameraOpen, setIsCameraOpen] = useState(false); // Camera modal state
    const [isMicrophoneModalOpen, setIsMicrophoneModalOpen] = useState(false); // Microphone modal state
    const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element

    const rotateCircle = (index: number) => {
        setActiveIndex(index);
    };

    const openCamera = () => {
        setIsCameraOpen(true);
    };

    const closeCamera = () => {
        setIsCameraOpen(false);
        if (videoRef.current) {
            const stream = videoRef.current.srcObject as MediaStream;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop()); // Stop camera
            }
        }
    };

    const openMicrophoneModal = () => {
        setIsMicrophoneModalOpen(true);
    };

    const closeMicrophoneModal = () => {
        setIsMicrophoneModalOpen(false);
    };

    useEffect(() => {
        if (isCameraOpen) {
            // Get the user's media (camera)
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream; // Set the video source to the stream
                    }
                })
                .catch(error => {
                    console.error("Error accessing the camera: ", error);
                });
        }
    }, [isCameraOpen]);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50" style={{ width: '1920px', height: '1080px' }}>
            <div className="flex items-center justify-between w-full sticky top-0 px-10 py-8 bg-gray-200">
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
                        <div className="absolute inset-0 border border-gray-200 rounded-full pointer-events-none" />
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
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={isActive ? 160 : 80}
                                        height={isActive ? 160 : 80}
                                        className={`mx-auto transition-all duration-500 ${isActive ? 'w-40 h-40 bg-blue-200 rounded-full' : 'w-20 h-20'}`}
                                    />
                                    <p className="font-bold text-black text-xl mt-2">{item.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side: Text and CTA */}
                    <div className="flex flex-col items-center w-1/2 ml-20 gap-8 relative -top-10">
                        <h1
                            className="text-7xl font-extrabold text-black mb-8 text-center leading-tight"
                            style={{ fontFamily: 'Protest Riot, sans-serif' }}
                        >
                            SNACKS SELECTOR AI
                        </h1>
                        <h2
                            className="text-3xl font-medium text-gray-800 mb-6 text-center"
                            style={{ fontFamily: 'Protest Riot, sans-serif' }}
                        >
                            What Snacks fight brain fog like a Ninja?
                        </h2>
                        <p
                            className="text-xl text-gray-600 mb-10 text-center"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            The stealthiest brain boost in the building
                        </p>
                        <div className="text-3xl text-gray-700 text-center mb-10 flex flex-col gap-8">
                            <h3
                                className="font-semibold mb-2 text-6xl"
                                style={{ fontFamily: 'Abyssinica SIL, serif' }}
                            >
                                Come Closer
                            </h3>
                            <p className='text-6xl'>&</p>
                            <p
                                className="font-medium text-4xl"
                                style={{ fontFamily: 'Abyssinica SIL, serif' }}
                            >
                                Tap to Talk Snacks
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button in Bottom-Right Corner */}
            <div className="absolute bottom-10 right-10 flex items-center gap-8">
                {/* Button */}
                <button
                    className="px-8 py-8 bg-gradient-to-b from-sky-500 to-cyan-950 text-white font-bold rounded-lg shadow-lg focus:from-sky-950 focus:to-cyan-500 focus:scale-[1.1] transition duration-300 text-4xl flex gap-4"
                    onClick={openCamera}
                >
                    <FaCamera /> Let's Find Your Feel
                </button>

                {/* Microphone Icon */}
                <button
                    className="flex items-center justify-center w-16 h-16 bg-gradient-to-b from-sky-500 to-cyan-950 focus:from-sky-950 focus:to-cyan-500 focus:scale-[1.1] text-white rounded-full shadow-lg transition duration-300 h-40 w-40"
                    onClick={openMicrophoneModal}
                >
                    <FaMicrophoneAlt className='h-20 w-30' />
                </button>
            </div>

            {/* Microphone Modal */}
            {isMicrophoneModalOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ease-out transform opacity-100 translate-y-0"
                >
                    <div className="relative w-[70%] h-[70%] bg-white p-8 rounded-lg">
                        <button
                            className="absolute top-8 right-8 text-4xl bg-gray-950 opacity-40 rounded-full p-3 px-4 text-white z-60"
                            onClick={closeMicrophoneModal}
                        >
                            ✖
                        </button>
                        <div className='items-center h-full content-center'>
                            <h2 className="text-6xl font-bold text-center mb-6 bg-gradient-to-b from-sky-500 to-cyan-950 bg-clip-text text-transparent"  style={{ fontFamily: 'Abyssinica SIL, serif' }}>TALK TO OUR AI</h2>
                            <p className="text-2xl text-center mb-8 text-gray-600" style={{ fontFamily: 'Poppins, serif' }}>Let me help you find your taste!</p>
                            <button
                                className="flex items-center justify-center m-auto bg-gradient-to-b from-sky-500 to-cyan-950 focus:from-sky-950 focus:to-cyan-500 focus:scale-[1.1] text-white rounded-full shadow-lg transition duration-300 h-60 w-60"
                            >
                                <FaMicrophoneAlt className='h-20 w-30' />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Camera Modal */}
            {isCameraOpen && (
                <div
                    className={`fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ease-out transform ${isCameraOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <div className="relative w-[70%] p-8 rounded-lg">
                        <button
                            className="absolute top-12 right-12 text-4xl bg-gray-950 opacity-40 rounded-full p-3 px-4 text-white z-60"
                            onClick={closeCamera}
                        >
                            ✖
                        </button>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}









// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'
// import { FaMicrophoneAlt, FaCamera } from "react-icons/fa";


// export default function Home() {
//     const items = [
//         {
//             title: 'Energy Fuel',
//             image: '/images/energy_fuel.png',
//         },
//         {
//             title: 'Brain Fuel',
//             image: '/images/brain_fuel.png',
//         },
//         {
//             title: 'Hydration Check',
//             image: '/images/hydration_check.png',
//         },
//         {
//             title: 'Muscle Pick',
//             image: '/images/muscle_pick.png',
//         },
//     ];

//     const [activeIndex, setActiveIndex] = useState(3); // Start with Muscle Pick

//     const rotateCircle = (index: number) => {
//         setActiveIndex(index);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center bg-gray-50" style={{ width: '1920px', height: '1080px' }}>
//             {/* Logo Section */}
//             <div className="flex items-center justify-between w-full sticky top-0 px-10 py-8">
//                 <Image
//                     src="/images/logo.png"
//                     alt="Realtime Nutrition Logo"
//                     width={450}
//                     height={140}
//                 />
//             </div>

//             <div className="flex justify-center bg-gray-50 py-20" style={{ width: '1920px', height: '1080px' }}>
//                 <div className="flex w-full px-10">
//                     {/* Left Side: Circle Options */}
//                     <div className="relative w-[450px] h-[450px] mx-auto">
//                         <div className="absolute inset-0 border border-gray-200 rounded-full pointer-events-none" />
//                         {items.map((item, index) => {
//                             const position = (index - activeIndex + items.length) % items.length;
//                             // Define fixed positions
//                             const positions = [
//                                 { left: '100%', top: '50%' }, // Right
//                                 { left: '50%', top: '102%' }, // Bottom
//                                 { left: '0%', top: '50%' }, // Left
//                                 { left: '50%', top: '05%' }, // Top
//                             ];

//                             const { left, top } = positions[position];
//                             const isActive = position === 0;

//                             return (
//                                 <div
//                                     key={index}
//                                     onClick={() => rotateCircle(index)}
//                                     className="absolute cursor-pointer text-center transition-all duration-500 h-auto w-full"
//                                     style={{
//                                         left,
//                                         top,
//                                         transform: 'translate(-50%, -50%)',
//                                         zIndex: isActive ? 20 : 10,
//                                     }}
//                                 >
//                                     <Image
//                                         src={item.image}
//                                         alt={item.title}
//                                         width={isActive ? 160 : 80}
//                                         height={isActive ? 160 : 80}
//                                         className={`mx-auto transition-all duration-500 ${isActive ? 'w-40 h-40 bg-blue-200 rounded-full' : 'w-20 h-20'}`}
//                                     />
//                                     <p className="font-bold text-black text-xl mt-2">{item.title}</p>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* Right Side: Text and CTA */}
//                     <div className="flex flex-col items-center w-1/2 ml-20 gap-8 relative -top-10">
//                         <h1
//                             className="text-7xl font-extrabold text-black mb-8 text-center leading-tight"
//                             style={{ fontFamily: 'Protest Riot, sans-serif' }}
//                         >
//                             SNACKS SELECTOR AI
//                         </h1>
//                         <h2
//                             className="text-3xl font-medium text-gray-800 mb-6 text-center"
//                             style={{ fontFamily: 'Protest Riot, sans-serif' }}
//                         >
//                             What Snacks fight brain fog like a Ninja?
//                         </h2>
//                         <p
//                             className="text-xl text-gray-600 mb-10 text-center"
//                             style={{ fontFamily: 'Poppins, sans-serif' }}
//                         >
//                             The stealthiest brain boost in the building
//                         </p>
//                         <div className="text-3xl text-gray-700 text-center mb-10 flex flex-col gap-8">
//                             <h3
//                                 className="font-semibold mb-2 text-6xl"
//                                 style={{ fontFamily: 'Abyssinica SIL, serif' }}
//                             >
//                                 Come Closer
//                             </h3>
//                             <p className='text-6xl'>&</p>
//                             <p
//                                 className="font-medium text-4xl"
//                                 style={{ fontFamily: 'Abyssinica SIL, serif' }}
//                             >
//                                 Tap to Talk Snacks
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Button in Bottom-Right Corner */}
//             <div className="absolute bottom-10 right-10 flex items-center gap-8">
//                 {/* Button */}
//                 <button className="px-8 py-8 bg-gradient-to-b from-sky-500 to-cyan-950 text-white font-bold rounded-lg shadow-lg focus:from-sky-950 focus:to-cyan-500 focus:scale-[1.1] transition duration-300 text-4xl flex gap-4">
//                 <FaCamera /> Let's Find Your Feel
//                 </button>

//                 {/* Microphone Icon */}
//                 <button className="flex items-center justify-center w-16 h-16 bg-gradient-to-b from-sky-500 to-cyan-950 focus:from-sky-950 focus:to-cyan-500 focus:scale-[1.1] text-white rounded-full shadow-lg transition duration-300 h-40 w-40">
//                     <FaMicrophoneAlt className='h-20 w-30'/>
//                 </button>
//             </div>
//         </div>
//     );
// }