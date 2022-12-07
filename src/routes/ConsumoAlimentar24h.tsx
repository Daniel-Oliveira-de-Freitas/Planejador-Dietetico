import { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import Modal from '../components/Modal';
import Layout from '../components/Layout';
import { getAllFoods } from '../utils/taco/getAllFoods';
import { AlimentoTACO } from '@prisma/client';

const ConsumoAlimentar24h = () => {
  const MAX_RESULTS = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tacoFoods, setTacoFoods] = useState<AlimentoTACO[]>([]);
  const [selectedFood, setSelectedFood] = useState(tacoFoods[0]);

  useEffect(() => {
    getAllFoods().then(setTacoFoods);
  });

  const filteredFoods =
    query === ''
      ? tacoFoods.slice(0, MAX_RESULTS)
      : tacoFoods
          .filter(food => {
            return food.description.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, MAX_RESULTS);

  return (
    <Layout>
      <h2 className='text-2xl'>Consumo Alimentar em 24h</h2>
      <div>
        <details>
          <summary>Desjejum</summary>
          <table>
            <thead>
              <tr>
                <th className='text-left text-sm font-thin uppercase tracking-wider'>
                  nome
                </th>
                <th className='text-left text-sm font-thin uppercase tracking-wider'>
                  qtd
                </th>
                <th className='text-sm font-thin uppercase tracking-wider'>
                  kcal
                </th>
                <th className='text-sm font-thin uppercase tracking-wider'>
                  carb.
                </th>
                <th className='text-sm font-thin uppercase tracking-wider'>
                  prot.
                </th>
                <th className='text-sm font-thin uppercase tracking-wider'>
                  gord.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>arroz, cozido, integral</td>
                <td>3 colheres de arroz</td>
                <td>250</td>
                <td>85g</td>
                <td>9,7g</td>
                <td>5,4g</td>
              </tr>
            </tbody>
          </table>
        </details>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <Combobox
            value={selectedFood}
            onChange={setSelectedFood}
          >
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              className='rounded-md border p-1'
              placeholder='Alimento TACO'
            />
            <Combobox.Options>
              {filteredFoods.map(food => (
                <Combobox.Option
                  key={food.id}
                  value={food.description}
                >
                  {food.description}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </Modal>
        <button
          onClick={() => setIsOpen(true)}
          className='float-right mt-2 mr-4 rounded-md bg-neutral-500 py-1 px-2 text-lg font-semibold text-white hover:bg-neutral-400'
        >
          Adicionar
        </button>
      </div>
    </Layout>
  );
};

export default ConsumoAlimentar24h;
