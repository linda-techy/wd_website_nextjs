"use client";

import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { STATE_LIST, DEFAULT_STATE, DEFAULT_DISTRICT, getDistrictsByState, PROJECT_TYPES } from '@/lib/constants'
import { BASE_API_URL } from '@/lib/config'
import Breadcrumb from '@/components/shared/Breadcrumb'
import RelatedLinks, { toolsRelatedLinks } from '@/components/shared/RelatedLinks'

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    state: DEFAULT_STATE,
    district: DEFAULT_DISTRICT,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: value,
      };
      
      // If state changes, reset district to default for that state
      if (name === 'state') {
        const districtsForState = getDistrictsByState(value);
        updated.district = districtsForState.length > 0 ? districtsForState[0].value : "";
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Prepare contact form data for public API
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        state: formData.state,
        district: formData.district,
        message: formData.message,
      };

      // Submit to public contact form API endpoint (no authentication required)
      const response = await fetch(`${BASE_API_URL}/leads/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
      } else {
        throw new Error(result.message || 'Failed to submit inquiry');
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        state: DEFAULT_STATE,
        district: DEFAULT_DISTRICT,
        message: '',
      });
      
      // Show success message
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitStatus('error');
      const err = error as Error;
      setErrorMessage(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0 pt-24 sm:pt-32 md:pt-44 pb-8 sm:pb-12 md:pb-16 lg:pb-20'>
        <Breadcrumb items={[{ label: "Contact Us" }]} />
        <div className='mb-8 sm:mb-12 md:mb-16 mt-6 sm:mt-8'>
          <div className='flex gap-2.5 items-center justify-center mb-3 sm:mb-4'>
            <span>
              <Icon
                icon={'ph:house-simple-fill'}
                width={20}
                height={20}
                className='text-primary md:w-6 md:h-6'
              />
            </span>
            <p className='text-sm md:text-base lg:text-lg font-semibold text-badge dark:text-white/90'>
              Contact us
            </p>
          </div>
          <div className='text-center max-w-4xl mx-auto px-4'>
            <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-52 font-bold tracking-tight text-black dark:text-white mb-3 sm:mb-4 leading-tight'>
              Have questions? Ready to help!
            </h3>
            <p className='text-sm sm:text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed mb-3 sm:mb-4'>
              Looking to build your dream home? Walldot Builders offers expert guidance, market insights, and a personalized journey—designed just for you.
            </p>
            <p className='text-sm sm:text-base md:text-lg font-normal text-black/70 dark:text-white/70 leading-relaxed'>
              Or explore our <Link href="/tools/home-cost-calculator" className="text-primary hover:underline font-semibold">free cost calculator</Link>, <Link href="/tools/ai-interior-designer-360" className="text-primary hover:underline font-semibold">AI interior designer</Link>, and <Link href="/brochure" className="text-primary hover:underline font-semibold">company brochure</Link>.
            </p>
          </div>
        </div>
      
      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <Icon icon="ph:check-circle-fill" width={24} height={24} className="text-green-600" />
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Thank you! Your inquiry has been submitted successfully. We&apos;ll contact you soon.
            </p>
          </div>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3">
            <Icon icon="ph:warning-fill" width={24} height={24} className="text-red-600" />
            <p className="text-red-600 dark:text-red-400 font-semibold">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* form */}
      <div className='border border-black/10 dark:border-white/10 rounded-2xl p-3 sm:p-4 md:p-5 shadow-xl dark:shadow-white/10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12'>
          <div className='relative w-full lg:w-fit'>
            <Image
              src={'/images/contactUs/contactUs.jpg'}
              alt='wall'
              width={497}
              height={535}
              className='rounded-2xl brightness-50 h-full w-full lg:w-auto object-cover min-h-[400px] sm:min-h-[450px] lg:min-h-[535px]'
              unoptimized={true}
            />
            <div className='absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-12 lg:left-12 flex flex-col gap-1.5 sm:gap-2'>
              <h5 className='text-lg sm:text-xl mobile:text-2xl lg:text-3xl font-semibold tracking-tight text-white leading-snug'>
                Contact information
              </h5>
              <p className='text-sm sm:text-base mobile:text-lg font-normal text-white/90 leading-relaxed'>
                Ready to build your dream home? We&apos;re here to help!
              </p>
            </div>
            <div className='absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-12 lg:left-12 flex flex-col gap-3 sm:gap-4 text-white'>
              <Link href={'tel:+919074954874'} className='w-fit'>
                <div className='flex items-center gap-2.5 sm:gap-3 md:gap-4 group w-fit cursor-pointer'>
                  <Icon icon={'ph:phone'} width={24} height={24} className='sm:w-7 sm:h-7 md:w-8 md:h-8' />
                  <p className='text-sm sm:text-base mobile:text-lg font-normal group-hover:text-primary'>
                    +91-9074-9548-74
                  </p>
                </div>
              </Link>
              <Link href={'mailto:info@walldotbuilders.com'} className='w-fit'>
                <div className='flex items-center gap-2.5 sm:gap-3 md:gap-4 group w-fit cursor-pointer'>
                  <Icon icon={'ph:envelope-simple'} width={24} height={24} className='sm:w-7 sm:h-7 md:w-8 md:h-8' />
                  <p className='text-sm sm:text-base mobile:text-lg font-normal group-hover:text-primary'>
                    info@walldotbuilders.com
                  </p>
                </div>
              </Link>
              <div className='flex items-center gap-2.5 sm:gap-3 md:gap-4'>
                <Icon icon={'ph:map-pin'} width={24} height={24} className='sm:w-7 sm:h-7 md:w-8 md:h-8' />
                <p className='text-sm sm:text-base mobile:text-lg font-normal'>
                  West fort, Thrissur, Kerala
                </p>
              </div>
            </div>
          </div>
          <div className='flex-1/2 w-full'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-4 sm:gap-5 md:gap-6'>
                <div className='flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    placeholder='Name*'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className='px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white'
                  />
                  <input
                    type='tel'
                    name='phone'
                    id='phone'
                    autoComplete='tel'
                    placeholder='Phone number*'
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className='px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white'
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  placeholder='Email address*'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white'
                />
                <div className='flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6'>
                  <select
                    name='projectType'
                    id='projectType'
                    value={formData.projectType}
                    onChange={handleChange}
                    className='px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white'
                  >
                    <option value="">Select Project Type</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.displayText}
                      </option>
                    ))}
                  </select>
                  <select
                    name='state'
                    id='state'
                    value={formData.state}
                    onChange={handleChange}
                    className='px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full bg-transparent text-black dark:text-white'
                  >
                    {STATE_LIST.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.displayText}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  name='district'
                  id='district'
                  value={formData.district}
                  onChange={handleChange}
                  className='px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline bg-transparent text-black dark:text-white'
                >
                  {getDistrictsByState(formData.state).map((district) => (
                    <option key={district.value} value={district.value}>
                      {district.displayText}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={8}
                  cols={50}
                  name='message'
                  id='message'
                  placeholder='Write here your message'
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className='px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline bg-transparent text-black dark:text-white'
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full bg-primary text-white text-sm sm:text-base font-semibold w-full mobile:w-fit hover:bg-dark duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="ph:spinner" width={20} height={20} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Icon icon="ph:paper-plane-right-fill" width={20} height={20} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <RelatedLinks 
      title="Explore More Resources" 
      links={toolsRelatedLinks} 
    />
  </>
  );
}

export default ContactUs;
