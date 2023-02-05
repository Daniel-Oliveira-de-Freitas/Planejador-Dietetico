import { useState } from 'react';
import dicionario from '../data/dicionario.json';
import { Button } from './Button';
import { Dialog } from '@headlessui/react';

const MeasuresInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className='rounded-full border-slate-500 p-2 text-slate-500 hover:bg-slate-200'
        onClick={() => setIsOpen(true)}
        title='Ajuda'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-question-circle-fill'
          viewBox='0 0 16 16'
        >
          <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z' />
        </svg>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <div
          className='fixed inset-0 bg-black/50'
          aria-hidden='true'
        />

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center p-4'>
            <Dialog.Panel className='mx-auto min-h-[50vh] max-w-3xl rounded-xl bg-white p-8'>
              <Dialog.Title className='text-3xl font-semibold tracking-wider text-sky-800'>
                🥗 Dicionário das medidas caseiras
              </Dialog.Title>
              <div className='mt-2 grid grid-cols-2 gap-2 '>
                {dicionario.map(item => {
                  return (
                    <div
                      className='relative'
                      key={item.Siglas}
                    >
                      <label className='w-1/4 p-4'>
                        {item.Siglas}: {item.Descrição}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className='flex flex-col items-center justify-center'>
                <Button
                  className='mt-2'
                  onClick={() => setIsOpen(false)}
                >
                  Fechar
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MeasuresInformation;
