import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const headingStyles = {
  1: 'text-4xl md:text-5xl font-bold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-bold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg md:text-xl font-semibold',
  6: 'text-base md:text-lg font-semibold',
} as const;

const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className,
  ...props
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const styles = twMerge(
    'text-white',
    headingStyles[level],
    className
  );

  return (
    <Tag className={styles} {...props}>
      {children}
    </Tag>
  );
};

export default Heading; 