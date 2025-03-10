import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={`form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out ${className}`}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
