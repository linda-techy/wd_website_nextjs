"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  
  const whatsappNumber = "+919074954874";
  const defaultMessage = "Hi! I'm interested in building my dream home with Walldot Builders. Can you help me?";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Hide on brochure page
  if (pathname === '/brochure') return null;
  
  if (!isVisible) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-[9997] group transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold">Chat with us!</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">We typically reply within minutes</p>
          </div>
          {/* Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white dark:border-l-gray-800"></div>
        </div>

        {/* Button */}
        <div className="relative">
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          
          {/* Main Button */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer">
            {/* WhatsApp Icon */}
            <Icon 
              icon="ph:whatsapp-logo-fill" 
              width={36} 
              height={36} 
              className="text-white"
            />
            
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 animate-bounce">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Mobile Bottom Spacing (to ensure button doesn't overlap with bottom nav if any) */}
      <style jsx global>{`
        @media (max-width: 640px) {
          /* Adjust if you have bottom navigation */
          .whatsapp-button-spacing {
            padding-bottom: 80px;
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.75;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

