import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Modal from './Modal';
import myData from '../data/dicionario.json';
import { Button } from './Button';

const MeasuresInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setIsOpen(true)}>Ajuda?</button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='🥗 Dicionario das Medidas Caseiras'
        
      >
        <div className='table-wrp block max-h-96'>
          <table className='w-full'>
            <thead className='w-full bg-sky-600 text-white'>
              <tr className={''}>
                <th className='w-1/4 p-4 border border-black'>Sigla</th>
                <th className='w-1/4 p-4 border border-black'>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {myData.slice(0, 30).map(a => {
                return (
                  <tr key={a.Siglas}>
                    <td className='w-1/4 p-4 border border-black'>{a.Siglas}</td>
                    <td className='w-1/4 p-4 border border-black'>{a.Descrição}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
    </section>
  );
};

export default MeasuresInformation;
