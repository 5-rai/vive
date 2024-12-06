import React from 'react';

export type InputProps = React.ComponentPropsWithoutRef<'input'>;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full py-2 px-6 w-full placeholder:text-gray-30 focus:border-primary text-gray-80 text-sm bg-white rounded-full border-gray-30 border"
      {...props}
    />
  );
}
