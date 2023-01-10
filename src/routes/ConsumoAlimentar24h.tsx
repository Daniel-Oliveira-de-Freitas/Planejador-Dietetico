import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import Modal from '../components/Modal';
import Layout from '../components/Layout';
import { getAllTacoFoods } from '../utils/taco/getAllTacoFoods';
import {
  AlimentoPinheiro,
  AlimentoTACO,
  Carbohydrate,
  Energy,
  Lipid,
  MeasurePinheiro,
  Protein,
  RefeicaoConsumo24h,
} from '@prisma/client';
import { getAllPinheiroFoods } from '../utils/pinheiro/getAllPinheiroFoods';

interface AlimentoTACOComMacros extends AlimentoTACO {
  energy: Energy[];
  carbohydrate: Carbohydrate[];
  protein: Protein[];
  lipid: Lipid[];
}

interface AlimentoPinheiroComMedidas extends AlimentoPinheiro {
  measures: MeasurePinheiro[];
}

interface Refeicao {
  alimentoTACO: AlimentoTACOComMacros;
  alimentoPinheiro: AlimentoPinheiroComMedidas;
  horario: Date;
  tipoDeRefeicaoId: number;
}

const ConsumoAlimentar24h = () => {
  const MAX_RESULTS = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [horario, setHorario] = useState<Date>();
  const [consumo24h, setConsumo24h] = useState({
    periodoSelecionado: 'Colação' as
      | 'Colação'
      | 'Desjejum'
      | 'Almoço'
      | 'Lanche'
      | 'Jantar'
      | 'Ceia',
    colacao: [] as Refeicao[],
    desjejum: [],
    almoco: [],
    lanche: [],
    jantar: [],
    ceia: [],
  });
  const [tacoFoods, setTacoFoods] = useState<AlimentoTACOComMacros[]>([]);
  const [selectedTacoFood, setSelectedTacoFood] = useState(tacoFoods[0]);
  const [pinheiroFoods, setPinheiroFoods] = useState<
    AlimentoPinheiroComMedidas[]
  >([]);
  const [selectedPinheiroFood, setSelectedPinheiroFood] = useState(
    pinheiroFoods[0]
  );
  const [pinheiroMeasure, setPinheiroMeasure] = useState(0); // TODO: colocar valor padrão
  const [pinheiroQty, setPinheiroQty] = useState(1);

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

  const setTipoDeRefeicao = (
    periodo: 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia'
  ) => {
    setConsumo24h(prev => {
      return { ...prev, periodoSelecionado: periodo };
    });
  };

  const addRefeicao = (
    periodo: 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia',
    refeicao: Refeicao
  ) => {
    switch (periodo) {
      case 'Colação':
        consumo24h.colacao.push(refeicao);
        break;
    }
  };

  const handleHorario = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setHorario(e.target.valueAsDate);
  };

  const handleMeasure = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return setPinheiroMeasure(Number(e.target.value));
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setPinheiroQty(e.target.valueAsNumber);
  };

  const convertKcal = (tacoFood: AlimentoTACOComMacros) => {
    const calcKcal =
      (pinheiroMeasure * pinheiroQty * tacoFood.energy[0].kcal) /
      tacoFood.base_qty;
    // const calcCarb =
    //   (pinheiroMeasure * pinheiroQty * tacoFood.carbohydrate[0].qty) /
    //   tacoFood.base_qty;
    // const calcProtein =
    //   (pinheiroMeasure * pinheiroQty * tacoFood.protein[0].qty) /
    //   tacoFood.base_qty;
    // const calcLipid =
    //   (pinheiroMeasure * pinheiroQty * tacoFood.lipid[0].qty) /
    //   tacoFood.base_qty;

    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcKcal);
    }

    return 0;
  };

  const convertCarb = (tacoFood: AlimentoTACOComMacros) => {
    const calcCarb =
      (pinheiroMeasure * pinheiroQty * tacoFood.carbohydrate[0].qty) /
      tacoFood.base_qty;
    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcCarb);
    }

    return 0;
  };

  return (
    <Layout>
      <h2 className='text-2xl'>Consumo Alimentar em 24h</h2>
      <div>
        <details>
          <summary className='flex items-center gap-2 bg-neutral-100 hover:cursor-pointer'>
            <button
              onClick={() => {
                setTipoDeRefeicao('Colação');
                setIsOpen(true);
              }}
              className='self-center bg-neutral-500 p-2 text-lg font-semibold text-white hover:bg-neutral-400'
            >
              +
            </button>
            <input
              type='time'
              className='rounded-md border p-1 text-center'
              defaultValue={'00:00'}
              onChange={handleHorario}
            />
            <div>Colação</div>
          </summary>
          <table>
            {consumo24h.colacao.length > 0 && (
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
            )}
            <tbody>
              {consumo24h.colacao.map(alimento => (
                <tr key={alimento.alimentoPinheiro.id}>
                  <td>{alimento.alimentoTACO.description}</td>
                  <td>{alimento.alimentoPinheiro.measures[0].label}</td>
                  <td>{Math.ceil(alimento.alimentoTACO.energy[0].kcal)}</td>
                  <td>
                    {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                      alimento.alimentoTACO.carbohydrate[0].unit}
                  </td>
                  <td>
                    {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                      alimento.alimentoTACO.protein[0].unit}
                  </td>
                  <td>
                    {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                      alimento.alimentoTACO.lipid[0].unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <Combobox
            defaultValue={selectedTacoFood}
            onChange={setSelectedTacoFood}
          >
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              className='rounded-md border p-1'
              placeholder='Alimento TACO'
              displayValue={food =>
                (food as unknown as AlimentoTACOComMacros)?.description ?? ''
              }
            />
            <Combobox.Options>
              {filteredTacoFoods.map(food => (
                <Combobox.Option
                  key={food.id}
                  value={food}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {food.description}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <Combobox
            defaultValue={selectedPinheiroFood}
            onChange={setSelectedPinheiroFood}
          >
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              className='rounded-md border p-1'
              placeholder='Alimento Pinheiro'
              displayValue={food =>
                (food as unknown as AlimentoPinheiroComMedidas)?.description ??
                ''
              }
            />
            <Combobox.Options>
              {filteredPinheiroFoods.map(food => (
                <Combobox.Option
                  key={food.id}
                  value={food}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {food.description}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <div>
            Calorias:{' '}
            {selectedTacoFood?.id
              ? Math.ceil(selectedTacoFood?.energy[0].kcal)
              : ''}
          </div>
          <div>
            Proteínas:{' '}
            {selectedTacoFood?.id
              ? Math.ceil(selectedTacoFood?.protein[0].qty) +
                selectedTacoFood?.protein[0].unit
              : ''}
          </div>
          <div>
            Carboidratos:{' '}
            {selectedTacoFood?.id
              ? Math.ceil(selectedTacoFood?.carbohydrate[0].qty) +
                selectedTacoFood?.carbohydrate[0].unit
              : ''}
          </div>
          <div>
            Gorduras:{' '}
            {selectedTacoFood?.id
              ? Math.ceil(selectedTacoFood?.lipid[0].qty) +
                selectedTacoFood?.lipid[0].unit
              : ''}
          </div>
          {selectedPinheiroFood && (
            <>
              <select
                className='rounded-md border p-1'
                onChange={handleMeasure}
              >
                {selectedPinheiroFood?.measures.map(measure => (
                  <option
                    key={measure.id}
                    value={measure.qty}
                  >
                    {measure.label}
                  </option>
                ))}
              </select>
              <input
                type='number'
                className='rounded-md border p-1'
                onChange={handleQty}
              />
            </>
          )}
          {selectedPinheiroFood && selectedTacoFood && pinheiroMeasure && (
            <div>
              valor convertido:
              {convertKcal(selectedTacoFood)} kcal
            </div>
          )}
          <button
            onClick={() => {
              addRefeicao(consumo24h.periodoSelecionado, {
                alimentoTACO: selectedTacoFood,
                alimentoPinheiro: selectedPinheiroFood,
                horario: horario,
                tipoDeRefeicaoId: 1, // TODO: setar id de acordo com período selecionado
              });
              setIsOpen(false);

              console.log(consumo24h);
            }}
            className='mt-2 mr-4 rounded-md bg-neutral-500 py-1 px-2 text-lg font-semibold text-white hover:bg-neutral-400'
          >
            Adicionar
          </button>
        </Modal>
      </div>
    </Layout>
  );
};

export default ConsumoAlimentar24h;
