import React from 'react';
import { SILA_LIST } from '@/lib/constants';

interface SilaBadgeProps {
  sila: number;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SilaBadge({ sila, showText = true, size = 'md' }: SilaBadgeProps) {
  const info = SILA_LIST[sila] || SILA_LIST[1];

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-xs sm:text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-sm sm:text-base gap-2 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold border shadow-xs transition-all ${info.badgeBg} ${sizeClasses[size]}`}
      title={info.title}
    >
      <span className="font-extrabold text-[11px] px-1.5 py-0.2 rounded-full bg-white/70 text-gray-900">
        {info.roman}
      </span>
      <span>Sila {info.number}</span>
      {showText && <span className="hidden md:inline font-normal opacity-90">• {info.title}</span>}
    </span>
  );
}
