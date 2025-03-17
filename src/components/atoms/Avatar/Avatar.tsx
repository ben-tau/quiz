import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded';
export type AvatarStatus = 'online' | 'away' | 'offline' | 'busy';

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
};

const statusStyles: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
};

const statusSizeStyles: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const showInitials = !src || imageError;

  // Génère une couleur de fond cohérente basée sur les initiales
  const getBackgroundColor = (initials: string) => {
    const colors = [
      'bg-primary',
      'bg-secondary',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-blue-500',
      'bg-green-500',
    ];
    const index = initials
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const containerStyles = twMerge(
    'relative inline-flex items-center justify-center overflow-hidden',
    sizeStyles[size],
    shapeStyles[shape],
    showInitials && initials ? getBackgroundColor(initials) : 'bg-gray-200',
    className
  );

  return (
    <div className={containerStyles} {...props}>
      {showInitials && initials ? (
        <span className="font-medium text-white uppercase">
          {initials.slice(0, 2)}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      )}
      {status && (
        <span
          className={twMerge(
            'absolute block rounded-full ring-2 ring-dark-bg',
            statusStyles[status],
            statusSizeStyles[size],
            shape === 'circle' ? 'right-0 bottom-0' : 'right-1 bottom-1'
          )}
        />
      )}
    </div>
  );
};

export default Avatar; 