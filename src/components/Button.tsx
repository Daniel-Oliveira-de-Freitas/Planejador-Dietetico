import React from 'react';

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit';
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  form?: string;
}

export const Button = ({
  type,
  className,
  children,
  form,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  const defaultStyles =
    'rounded-md bg-sky-600 py-2 px-4 text-lg font-semibold text-white hover:bg-sky-700';

  return (
    <button
      type={type}
      className={className ? `${defaultStyles} ${className}` : defaultStyles}
      disabled={disabled}
      onClick={onClick}
      form={form}
      {...rest}
    >
      {children}
    </button>
  );
};
