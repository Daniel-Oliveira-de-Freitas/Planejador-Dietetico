import { Dialog } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
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
        <Dialog.Panel className='mx-auto max-w-md rounded bg-white p-4'>
          <Dialog.Title className='text-2xl'>Adicionar alimento</Dialog.Title>
          <Dialog.Description>descrição</Dialog.Description>
          {props.children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
