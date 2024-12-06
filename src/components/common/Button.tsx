import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  primary?: boolean;
}
export default function Button({
  children,
  primary = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'w-full text-base rounded-full py-2 px-7',
        primary
          ? 'text-white bg-primary hover:bg-hover'
          : 'text-primary bg-white border-primary border hover:bg-secondary'
      )}
      {...props}>
      {children}
    </button>
  );
}
