import React from 'react';
import { twMerge } from 'tailwind-merge';
import * as HeroIcons from '@heroicons/react/24/outline';

interface IconProps {
  name: keyof typeof HeroIcons;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  className,
  size = 20 
}) => {
  const IconComponent = HeroIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      className={twMerge(`w-${size} h-${size}`, className)} 
      aria-hidden="true"
    />
  );
}; 