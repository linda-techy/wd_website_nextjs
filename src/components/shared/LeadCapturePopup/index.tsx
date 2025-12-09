"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { BASE_API_URL } from "@/lib/config";

interface LeadCapturePopupProps {
  heading?: string;
  subheading?: string;
}

export default function LeadCapturePopup({ 
  heading = "Transform Your Dream Home Into Reality",
  subheading = "Get a free consultation with Kerala's trusted construction experts"
}: LeadCapturePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('leadPopupShown');
    const dismissedUntil = localStorage.getItem('leadPopupDismissedUntil');
    
    if (dismissedUntil) {
      const dismissTime = parseInt(dismissedUntil);
      if (Date.now() < dismissTime) {
        return;
      } else {
        localStorage.removeItem('leadPopupDismissedUntil');
      }
    }
    
    if (hasSeenPopup) return;

    let timeOnPage = 0;
    let scrollDepth = 0;
    let hasScrolled = false;
    let mouseMoveCount = 0;
    let isExitIntent = false;

    const timeInterval = setInterval(() => {
      timeOnPage += 1;
    }, 1000);

    const handleScroll = () => {
      hasScrolled = true;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      scrollDepth = ((scrollTop + windowHeight) / documentHeight) * 100;
    };

    const handleMouseMove = () => {
      mouseMoveCount++;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isExitIntent) {
        isExitIntent = true;
        checkAndShowPopup();
      }
    };

    const checkAndShowPopup = () => {
      const shouldShow = 
        (timeOnPage >= 20 && scrollDepth >= 30 && hasScrolled && mouseMoveCount > 10) ||
        isExitIntent;

      if (shouldShow && !hasSeenPopup) {
        setIsVisible(true);
        sessionStorage.setItem('leadPopupShown', 'true');
        clearInterval(checkInterval);
      }
    };

    const checkInterval = setInterval(() => {
      if (timeOnPage >= 15) {
        checkAndShowPopup();
      }
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(timeInterval);
      clearInterval(checkInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleDismiss = () => {
    const dismissUntil = Date.now() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('leadPopupDismissedUntil', dismissUntil.toString());
    handleClose();
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "phone":
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          error = "Enter a valid 10-digit mobile number";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Enter a valid email address";
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim()) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField("name", formData.name);
    const isPhoneValid = validateField("phone", formData.phone);
    const isEmailValid = validateField("email", formData.email);
    
    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const leadData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\s/g, ''),
        projectType: "turnkey_project",
        state: "Kerala",
        district: "Thrissur",
        message: "Interested via popup inquiry",
      };

      const response = await fetch(`${BASE_API_URL}/leads/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: "", phone: "", email: "" });
        setTimeout(() => {
          handleDismiss();
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[9998] transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup Container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-none overflow-y-auto">
        <div 
          className={`relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full pointer-events-auto transform transition-all duration-300 my-6 sm:my-8 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          {/* Close Button - Always visible and accessible */}
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-5 md:-right-5 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer z-10 ring-2 sm:ring-4 ring-white dark:ring-gray-900"
            aria-label="Close popup"
          >
            <Icon icon="ph:x-bold" width={20} height={20} className="sm:w-[22px] sm:h-[22px] md:w-6 md:h-6" />
          </button>

          {/* Split Layout: Image + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] max-h-[90vh] overflow-y-auto">
            
            {/* Left Side - Visual/Value Proposition */}
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-green-600 p-4 sm:p-5 md:p-6 lg:p-8 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none flex flex-col justify-between overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/hero/heroBanner.png')] bg-cover bg-center"></div>
              </div>
              
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6">
                  <Icon icon="ph:star-fill" width={16} height={16} className="text-yellow-300 sm:w-[18px] sm:h-[18px]" />
                  <span className="text-white text-xs sm:text-sm font-semibold">Trusted Construction Partner</span>
                </div>

                {/* Heading */}
                <h2 id="popup-title" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {heading}
                </h2>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                  {subheading}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon icon="ph:check-bold" width={12} height={12} className="text-white sm:w-[14px] sm:h-[14px]" />
                    </div>
                    <span className="text-white/90 text-xs sm:text-sm md:text-base">Free site visit & consultation</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon icon="ph:check-bold" width={12} height={12} className="text-white sm:w-[14px] sm:h-[14px]" />
                    </div>
                    <span className="text-white/90 text-xs sm:text-sm md:text-base">Detailed cost estimation</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon icon="ph:check-bold" width={12} height={12} className="text-white sm:w-[14px] sm:h-[14px]" />
                    </div>
                    <span className="text-white/90 text-xs sm:text-sm md:text-base">Expert architectural guidance</span>
                  </div>
                </div>
              </div>

              {/* Bottom Icon */}
              <div className="relative z-10 mt-6 sm:mt-8">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white/60 text-xs">
                  <Icon icon="ph:shield-check-fill" width={14} height={14} className="sm:w-4 sm:h-4" />
                  <span>Your information is 100% secure</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col">
              {/* Dismiss Link */}
              <div className="flex justify-end mb-3 sm:mb-4">
                <button
                  onClick={handleDismiss}
                  className="text-xs sm:text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline cursor-pointer transition-colors"
                >
                  Don&apos;t show this again
                </button>
              </div>

              {/* Success State */}
              {submitStatus === 'success' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6 sm:py-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce">
                    <Icon icon="ph:check-circle-fill" width={40} height={40} className="text-green-600 dark:text-green-400 sm:w-12 sm:h-12" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Thank You! 🎉
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1.5 sm:mb-2">
                    We&apos;ve received your inquiry successfully.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                    Our team will contact you within 24 hours.
                  </p>
                </div>
              )}

              {/* Error State */}
              {submitStatus === 'error' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 animate-shake">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Icon icon="ph:warning-fill" width={20} height={20} className="text-red-600 dark:text-red-400 flex-shrink-0 sm:w-6 sm:h-6" />
                    <div>
                      <p className="text-red-600 dark:text-red-400 font-semibold text-xs sm:text-sm mb-1">
                        Oops! Something went wrong
                      </p>
                      <p className="text-red-500 dark:text-red-500 text-xs">
                        Please try again or call us at +91-9074-9548-74
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              {submitStatus !== 'success' && (
                <>
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                      Get Started Today
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Fill in your details and we&apos;ll get back to you shortly
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 md:space-y-5 flex-1">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Icon icon="ph:user-fill" width={18} height={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border-2 rounded-xl outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 ${
                            errors.name 
                              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30' 
                              : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 sm:mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <Icon icon="ph:warning-circle-fill" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Icon icon="ph:phone-fill" width={18} height={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="10-digit mobile number"
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border-2 rounded-xl outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 ${
                            errors.phone 
                              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30' 
                              : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 sm:mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <Icon icon="ph:warning-circle-fill" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Icon icon="ph:envelope-fill" width={18} height={18} className="sm:w-5 sm:h-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="your.email@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border-2 rounded-xl outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 ${
                            errors.email 
                              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30' 
                              : 'border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 sm:mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <Icon icon="ph:warning-circle-fill" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 sm:py-3.5 md:py-4 px-4 sm:px-5 md:px-6 rounded-xl bg-gradient-to-r from-primary to-green-500 text-white font-bold text-sm sm:text-base hover:from-primary/90 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-primary/20 ${
                        isSubmitting 
                          ? 'opacity-75 cursor-not-allowed' 
                          : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl hover:shadow-primary/30'
                      }`}
                      aria-label="Submit consultation request"
                    >
                      {isSubmitting ? (
                        <>
                          <Icon icon="ph:spinner" width={18} height={18} className="animate-spin sm:w-[22px] sm:h-[22px]" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Free Consultation</span>
                          <Icon icon="ph:arrow-right-bold" width={18} height={18} className="sm:w-5 sm:h-5" />
                        </>
                      )}
                    </button>

                    {/* Privacy Note */}
                    <p className="text-[10px] sm:text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
                      By submitting this form, you agree to our{' '}
                      <a href="/privacy" className="text-primary hover:underline">privacy policy</a>.
                      We respect your privacy and never share your information.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
