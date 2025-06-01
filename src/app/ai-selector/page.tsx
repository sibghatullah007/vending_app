'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaMicrophoneAlt, FaCamera } from 'react-icons/fa';
import { ImCross } from "react-icons/im";

interface ApiResponse {
  success: boolean;
  filename: string;
  file_size_bytes: number;
  analysis: {
    description: string;
    recommended_category: string;
    products: Array<{
      name: string;
      price: number;
    }>;
    total_products: number;
  };
  message: string;
}

export default function Page() {
  const router = useRouter();
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
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMicrophoneModalOpen, setIsMicrophoneModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openCamera = () => {
    setIsCameraOpen(true);
    setCapturedImage(null);
    setApiResponse(null);
    setIsLoading(false);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    setCapturedImage(null);
    setApiResponse(null);
    setIsLoading(false);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
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

  const handleItemClick = (index: number) => {
    console.log("Active index:", index);
    setActiveIndex(index);
    
    setTimeout(() => {
      router.push('/products');
      if ((index - activeIndex + items.length) % items.length === 0) {
      }
    }, 300);
  };

  const handleTryAgain = async () => {
    setCapturedImage(null);
    setApiResponse(null);
    
    // Stop existing stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    // Start new stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };

  const handleViewProducts = () => {
    router.push('/products');
  };

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
                  onClick={() => handleItemClick(index)} // Call handleItemClick on click
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
          <FaCamera /> Let&apos;s Find Your Feel
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
              <ImCross />
            </button>
            <div className='items-center h-full content-center'>
              <h2 className="text-6xl font-bold text-center mb-6 bg-gradient-to-b from-sky-500 to-cyan-950 bg-clip-text text-transparent"  style={{ fontFamily: 'Abyssinica SIL, serif' }}>TALK TO OUR AI</h2>
              <p className="text-2xl text-center mb-8 text-gray-600">Let me help you to Find Your Taste!</p>
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
              <ImCross />
            </button>
            {capturedImage ? (
              <Image
                src={capturedImage}
                alt="Captured"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg"
                unoptimized
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto rounded-lg"
              />
            )}
            {!capturedImage && (
              <button
                onClick={async () => {
                  if (videoRef.current) {
                    const canvas = document.createElement('canvas');
                    canvas.width = videoRef.current.videoWidth;
                    canvas.height = videoRef.current.videoHeight;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      ctx.drawImage(videoRef.current, 0, 0);
                      const imageUrl = canvas.toDataURL('image/jpeg');
                      setCapturedImage(imageUrl);
                      setIsLoading(true);
                      
                      canvas.toBlob(async (blob) => {
                        if (blob) {
                          const formData = new FormData();
                          formData.append('file', blob, 'capture.jpg');
                          
                          try {
                            const response = await fetch('https://shark-supreme-readily.ngrok-free.app/analyze-image', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                              },
                              body: formData,
                            });
                            if (!response.ok) {
                              throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            const data = await response.json();
                            console.log('API Response:', data);
                            setApiResponse(data);
                          } catch (error) {
                            console.error('Error uploading image:', error);
                          } finally {
                            setIsLoading(false);
                          }
                        }
                      }, 'image/jpeg', 0.8);
                    }
                  }
                }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-100"
              >
                <div className="w-16 h-16 border-4 border-gray-800 rounded-full"></div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Image</h2>
            <p className="text-gray-600">Please wait while we process your image...</p>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {apiResponse && !isLoading && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-b from-sky-500 to-cyan-950 bg-clip-text text-transparent">
              Analysis Complete!
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-xl text-gray-700">{apiResponse.analysis.description}</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-2xl font-semibold text-sky-800">
                  Recommended Category: {apiResponse.analysis.recommended_category}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleViewProducts}
                className="px-6 py-3 bg-gradient-to-b from-sky-500 to-cyan-950 text-white font-bold rounded-lg shadow-lg hover:from-sky-600 hover:to-cyan-800 transition duration-300"
              >
                View Products
              </button>
              <button
                onClick={handleTryAgain}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg shadow-lg hover:bg-gray-300 transition duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}