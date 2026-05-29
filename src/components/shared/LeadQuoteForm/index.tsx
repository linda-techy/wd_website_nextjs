"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

interface LeadQuoteFormProps {
  leadSource: string;
  title?: string;
  submitLabel?: string;
  compact?: boolean;
  showMessage?: boolean;
  showArea?: boolean;
  projectType?: string;
  onSuccess?: () => void;
}

export default function LeadQuoteForm({
  leadSource,
  title = "Get a Free Quote",
  submitLabel = "Submit Enquiry",
  compact = false,
  showMessage = true,
  showArea = false,
  projectType,
  onSuccess,
}: LeadQuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    area: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateField = (name: string, value: string): boolean => {
    let error = "";

    switch (name) {
      case "name":
        if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "phone": {
        const phoneRegex = /^(\+?\d{1,4}[-\s]?)?\d{7,14}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ""))) {
          error = "Enter a valid phone number";
        }
        break;
      }
      case "email":
        if (value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = "Enter a valid email address";
          }
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value.trim()) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateField("name", formData.name);
    const isPhoneValid = validateField("phone", formData.phone);
    const isEmailValid = validateField("email", formData.email);

    if (!isNameValid || !isPhoneValid || !isEmailValid) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const leadData: Record<string, string> = {
        name: formData.name.trim(),
        phone: formData.phone.replace(/\s/g, ""),
        leadSource,
      };

      if (formData.email.trim()) leadData.email = formData.email.trim();
      if (formData.message.trim()) leadData.message = formData.message.trim();
      if (formData.area.trim()) leadData.area = formData.area.trim();
      if (projectType) leadData.projectType = projectType;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/leads/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "", area: "" });
        onSuccess?.();
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Error submitting lead:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = compact
    ? "w-full pl-10 pr-3 py-2.5 text-sm border-2 rounded-xl outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
    : "w-full pl-12 pr-4 py-3 md:py-3.5 text-sm sm:text-base border-2 rounded-xl outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400";

  const inputValid = "border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10";
  const inputError = "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30";

  const labelClass = compact
    ? "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
    : "block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2";

  const iconSize = compact ? 16 : 18;
  const iconWrapClass = compact
    ? "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    : "absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400";

  // Success state
  if (submitStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 sm:py-12">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <Icon icon="ph:check-circle-fill" width={40} height={40} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Thank you!
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      {title && (
        <h2 className={`font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>
          {title}
        </h2>
      )}

      {/* Error banner */}
      {submitStatus === "error" && (
        <div className="mb-4 p-3 sm:p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-start gap-2 sm:gap-3">
            <Icon icon="ph:warning-fill" width={20} height={20} className="text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-600 dark:text-red-400 font-semibold text-xs sm:text-sm mb-0.5">
                Something went wrong
              </p>
              <p className="text-red-500 text-xs">
                Please try again or call us at +91-9074-9548-74
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`${compact ? "space-y-3" : "space-y-4 sm:space-y-5"}`}>
        {/* Name */}
        <div>
          <label htmlFor={`lqf-name-${leadSource}`} className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className={iconWrapClass}>
              <Icon icon="ph:user-fill" width={iconSize} height={iconSize} />
            </div>
            <input
              type="text"
              id={`lqf-name-${leadSource}`}
              name="name"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.name ? inputError : inputValid}`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <Icon icon="ph:warning-circle-fill" width={12} height={12} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={`lqf-phone-${leadSource}`} className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className={iconWrapClass}>
              <Icon icon="ph:phone-fill" width={iconSize} height={iconSize} />
            </div>
            <input
              type="tel"
              id={`lqf-phone-${leadSource}`}
              name="phone"
              placeholder="Your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.phone ? inputError : inputValid}`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <Icon icon="ph:warning-circle-fill" width={12} height={12} />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email (optional) */}
        <div>
          <label htmlFor={`lqf-email-${leadSource}`} className={labelClass}>
            Email Address <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className={iconWrapClass}>
              <Icon icon="ph:envelope-fill" width={iconSize} height={iconSize} />
            </div>
            <input
              type="email"
              id={`lqf-email-${leadSource}`}
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.email ? inputError : inputValid}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <Icon icon="ph:warning-circle-fill" width={12} height={12} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Area (optional field) */}
        {showArea && (
          <div>
            <label htmlFor={`lqf-area-${leadSource}`} className={labelClass}>
              Approximate Area (sqft) <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className={iconWrapClass}>
                <Icon icon="ph:ruler" width={iconSize} height={iconSize} />
              </div>
              <input
                type="text"
                id={`lqf-area-${leadSource}`}
                name="area"
                placeholder="e.g. 1500"
                value={formData.area}
                onChange={handleChange}
                className={`${inputBase} ${inputValid}`}
              />
            </div>
          </div>
        )}

        {/* Message (optional textarea) */}
        {showMessage && (
          <div>
            <label htmlFor={`lqf-message-${leadSource}`} className={labelClass}>
              Message <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <textarea
              id={`lqf-message-${leadSource}`}
              name="message"
              rows={compact ? 3 : 4}
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2.5 sm:py-3 ${compact ? "text-sm" : "text-sm sm:text-base"} border-2 rounded-xl outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 resize-none ${inputValid}`}
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-xl bg-gradient-to-r from-primary to-green-500 text-white font-bold hover:from-primary/90 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-primary/20 ${
            compact ? "py-2.5 px-4 text-sm" : "py-3 sm:py-3.5 md:py-4 px-5 md:px-6 text-sm sm:text-base"
          } ${
            isSubmitting
              ? "opacity-75 cursor-not-allowed"
              : "cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl hover:shadow-primary/30"
          }`}
          aria-label="Submit enquiry"
        >
          {isSubmitting ? (
            <>
              <Icon icon="ph:spinner" width={18} height={18} className="animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>{submitLabel}</span>
              <Icon icon="ph:arrow-right-bold" width={18} height={18} />
            </>
          )}
        </button>

        <p className="text-[10px] sm:text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
          By submitting, you agree to our{" "}
          <a href="/privacy" className="text-primary hover:underline">
            privacy policy
          </a>
          . We respect your privacy.
        </p>
      </form>
    </div>
  );
}
