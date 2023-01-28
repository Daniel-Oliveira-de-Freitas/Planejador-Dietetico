import { Dialog } from '@headlessui/react';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  description?: string;
  title?: string;
}

const Modal = (props: ModalProps) => {
  const defaultStyle = 'mx-auto min-h-[50vh] max-w-md rounded-xl bg-white p-8';

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      className='relative z-50'
    >
      <div
        className='fixed inset-0 bg-black/50'
        aria-hidden='true'
      />

      <div className='fixed inset-0 flex items-center justify-center'>
        <Dialog.Panel className={defaultStyle}>
          {props.title && (
            <Dialog.Title className='text-3xl font-semibold tracking-wider text-sky-800'>
              {props.title}
            </Dialog.Title>
          )}
          {props.description ?? <Dialog.Description>{props.description}</Dialog.Description>}
          {props.children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
