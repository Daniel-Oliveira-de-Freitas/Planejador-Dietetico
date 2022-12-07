import { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import Modal from '../components/Modal';
import Layout from '../components/Layout';
import { getAllTacoFoods } from '../utils/taco/getAllTacoFoods';
import { AlimentoPinheiro, AlimentoTACO } from '@prisma/client';
import { getAllPinheiroFoods } from '../utils/pinheiro/getAllPinheiroFoods';

const ConsumoAlimentar24h = () => {
  const MAX_RESULTS = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tacoFoods, setTacoFoods] = useState<AlimentoTACO[]>([]);
  const [selectedTacoFood, setSelectedTacoFood] = useState(tacoFoods[0]);
  const [pinheiroFoods, setPinheiroFoods] = useState<AlimentoPinheiro[]>([]);
  const [selectedPinheiroFood, setSelectedPinheiroFood] = useState(
    pinheiroFoods[0]
  );

  useEffect(() => {
    getAllTacoFoods().then(setTacoFoods);
    getAllPinheiroFoods().then(setPinheiroFoods);
  }, []);

  const filteredTacoFoods =
    query === ''
      ? tacoFoods.slice(0, MAX_RESULTS)
      : tacoFoods
          .filter(food => {
            return food.description.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, MAX_RESULTS);

  const filteredPinheiroFoods =
    query === ''
      ? pinheiroFoods.slice(0, MAX_RESULTS)
      : pinheiroFoods
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
            value={selectedTacoFood}
            onChange={setSelectedTacoFood}
          >
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              className='rounded-md border p-1'
              placeholder='Alimento TACO'
            />
            <Combobox.Options>
              {filteredTacoFoods.map(food => (
                <Combobox.Option
                  key={food.id}
                  value={food.description}
                >
                  {food.description}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <Combobox
            value={selectedPinheiroFood}
            onChange={setSelectedPinheiroFood}
          >
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              className='rounded-md border p-1'
              placeholder='Alimento Pinheiro'
            />
            <Combobox.Options>
              {filteredPinheiroFoods.map(food => (
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
