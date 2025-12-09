"use client";

import { usePathname } from 'next/navigation';
import LeadCapturePopup from './index';

export default function LeadCapturePopupWrapper() {
  const pathname = usePathname();
  
  // Don't show popup on these pages
  const excludedPaths = [
    '/partnerships/login',
    '/partnerships/dashboard',
    '/partnerships',
    '/signin',
    '/signup',
  ];
  
  // Check if current path should be excluded
  const shouldExclude = excludedPaths.some(path => pathname?.startsWith(path));
  
  if (shouldExclude) return null;
  
  return <LeadCapturePopup />;
}

