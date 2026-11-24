import React from 'react';
import { Award } from 'lucide-react';

interface IssuerLogoProps {
  issuer: string;
  className?: string;
}

export const IssuerLogo: React.FC<IssuerLogoProps> = ({ issuer, className = "w-7 h-7" }) => {
  const key = issuer.trim().toLowerCase();

  if (key === 'oracle') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
        <rect
          x="3"
          y="9.5"
          width="26"
          height="13"
          rx="6.5"
          stroke="#F80000"
          strokeWidth="3.6"
        />
      </svg>
    );
  }

  if (key === 'ibm') {
    return (
      <svg viewBox="0 0 36 20" className={className} aria-hidden="true" fill="none">
        <defs>
          <pattern id="ibm-stripes" width="36" height="3" patternUnits="userSpaceOnUse">
            <rect width="36" height="1.7" fill="#60A5FA" />
          </pattern>
        </defs>
        <text
          x="18"
          y="16"
          textAnchor="middle"
          fontFamily="Arial Black, Impact, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="0.5"
          fill="url(#ibm-stripes)"
        >
          IBM
        </text>
      </svg>
    );
  }

  if (key === 'coursera') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
        <circle cx="16" cy="16" r="13" fill="#0056D2" />
        <path
          d="M21.2 19.6a6.4 6.4 0 1 1 0-7.2"
          stroke="#FFFFFF"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key === 'dicoding') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
        <rect x="3" y="3" width="26" height="26" rx="7" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.6" />
        <path
          d="M12.5 11.5L8.5 16l4 4.5M19.5 11.5l4 4.5-4 4.5M17.2 10.5l-2.4 11"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <Award className="w-6 h-6 text-primary" aria-hidden="true" />;
};
