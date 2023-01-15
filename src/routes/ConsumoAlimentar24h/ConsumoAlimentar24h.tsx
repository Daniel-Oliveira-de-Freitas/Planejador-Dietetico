import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import Modal from '../../components/Modal';
import Layout from '../../components/Layout';
import { getAllTacoFoods } from '../../utils/taco/getAllTacoFoods';
import { getAllPinheiroFoods } from '../../utils/pinheiro/getAllPinheiroFoods';
import { AlimentoPinheiroComMedidas, AlimentoTACOComMacros, Refeicao } from './types';
import FoodDropdown from '../../components/FoodDropdown';
import { addConsumo24h } from '../../utils/addConsumo24h';

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
    desjejum: [] as Refeicao[],
    almoco: [] as Refeicao[],
    lanche: [] as Refeicao[],
    jantar: [] as Refeicao[],
    ceia: [] as Refeicao[],
  });
  const [tacoFoods, setTacoFoods] = useState<AlimentoTACOComMacros[]>([]);
  const [selectedTacoFood, setSelectedTacoFood] = useState(tacoFoods[0]);
  const [pinheiroFoods, setPinheiroFoods] = useState<AlimentoPinheiroComMedidas[]>([]);
  const [selectedPinheiroFood, setSelectedPinheiroFood] = useState(pinheiroFoods[0]);
  const [pinheiroMeasureValue, setPinheiroMeasureValue] = useState(0); // TODO: colocar valor padrão
  const [pinheiroMeasureLabel, setPinheiroMeasureLabel] = useState('');
  const [pinheiroQty, setPinheiroQty] = useState(1);

  useEffect(() => {
    getAllTacoFoods().then(setTacoFoods);
    getAllPinheiroFoods().then(setPinheiroFoods);
  }, []);

  useEffect(() => {
    setPinheiroMeasureValue(selectedPinheiroFood?.measures[0].qty);
    setPinheiroMeasureLabel(selectedPinheiroFood?.measures[0].label);
  }, [selectedPinheiroFood]);

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
      case 'Desjejum':
        consumo24h.desjejum.push(refeicao);
        break;
      case 'Almoço':
        consumo24h.almoco.push(refeicao);
        break;
      case 'Lanche':
        consumo24h.lanche.push(refeicao);
        break;
      case 'Jantar':
        consumo24h.jantar.push(refeicao);
        break;
      case 'Ceia':
        consumo24h.ceia.push(refeicao);
        break;
    }
  };

  const handleHorario = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setHorario(e.target.valueAsDate);
  };

  const handleMeasure = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return setPinheiroMeasureValue(Number(e.target.value));
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setPinheiroQty(e.target.valueAsNumber);
  };

  const convertKcal = (tacoFood: AlimentoTACOComMacros) => {
    const calcKcal =
      (pinheiroMeasureValue * pinheiroQty * tacoFood.energy[0].kcal) / tacoFood.base_qty;

    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcKcal);
    }

    return 0;
  };

  const convertCarb = (tacoFood: AlimentoTACOComMacros) => {
    const calcCarb =
      (pinheiroMeasureValue * pinheiroQty * tacoFood.carbohydrate[0].qty) / tacoFood.base_qty;
    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcCarb);
    }

    return 0;
  };

  const convertProtein = (tacoFood: AlimentoTACOComMacros) => {
    const calcProtein =
      (pinheiroMeasureValue * pinheiroQty * tacoFood.protein[0].qty) / tacoFood.base_qty;

    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcProtein);
    }

    return 0;
  };

  const convertLipid = (tacoFood: AlimentoTACOComMacros) => {
    const calcLipid =
      (pinheiroMeasureValue * pinheiroQty * tacoFood.lipid[0].qty) / tacoFood.base_qty;
    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcLipid);
    }

    return 0;
  };

  return (
    <Layout>
      <h2 className='text-2xl'>Consumo Alimentar em 24h</h2>
      <FoodDropdown
        foodArray={consumo24h.desjejum}
        setIsOpen={setIsOpen}
        timeOnChange={handleHorario}
        setTipoDeRefeicao={setTipoDeRefeicao}
        tipoDeRefeicao={'Desjejum'}
        title='Desjejum'
      />
      <FoodDropdown
        foodArray={consumo24h.colacao}
        setIsOpen={setIsOpen}
        timeOnChange={handleHorario}
        setTipoDeRefeicao={setTipoDeRefeicao}
        tipoDeRefeicao={'Colação'}
        title='Colação'
      />
      <FoodDropdown
        foodArray={consumo24h.almoco}
        setIsOpen={setIsOpen}
        timeOnChange={handleHorario}
        setTipoDeRefeicao={setTipoDeRefeicao}
        tipoDeRefeicao={'Almoço'}
        title='Almoço'
      />
      <FoodDropdown
        foodArray={consumo24h.lanche}
        setIsOpen={setIsOpen}
        timeOnChange={handleHorario}
        setTipoDeRefeicao={setTipoDeRefeicao}
        tipoDeRefeicao={'Lanche'}
        title='Lanche'
      />
      <FoodDropdown
        foodArray={consumo24h.jantar}
        setIsOpen={setIsOpen}
        timeOnChange={handleHorario}
        setTipoDeRefeicao={setTipoDeRefeicao}
        tipoDeRefeicao={'Jantar'}
        title='Jantar'
      />
      <FoodDropdown
        foodArray={consumo24h.ceia}
        setIsOpen={setIsOpen}
        timeOnChange={handleHorario}
        setTipoDeRefeicao={setTipoDeRefeicao}
        tipoDeRefeicao={'Ceia'}
        title='Ceia'
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Adicionar alimento'
      >
        <Combobox
          defaultValue={selectedTacoFood}
          onChange={setSelectedTacoFood}
        >
          <Combobox.Input
            onChange={event => setQuery(event.target.value)}
            className='mt-4 rounded-md border p-1'
            placeholder='Alimento TACO'
            displayValue={food => (food as unknown as AlimentoTACOComMacros)?.description ?? ''}
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
            className='mt-4 rounded-md border p-1'
            placeholder='Alimento Pinheiro'
            displayValue={food =>
              (food as unknown as AlimentoPinheiroComMedidas)?.description ?? ''
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
              value={pinheiroQty}
            />
          </>
        )}
        {selectedPinheiroFood && selectedTacoFood && pinheiroMeasureValue && (
          <div>
            <div>
              Calorias: {selectedTacoFood?.id ? convertKcal(selectedTacoFood) + ' kcal' : ''}
            </div>
            <div>
              Proteínas:{' '}
              {selectedTacoFood?.id
                ? convertProtein(selectedTacoFood) + selectedTacoFood?.protein[0].unit
                : ''}
            </div>
            <div>
              Carboidratos:{' '}
              {selectedTacoFood?.id
                ? convertCarb(selectedTacoFood) + selectedTacoFood?.carbohydrate[0].unit
                : ''}
            </div>
            <div>
              Gorduras:{' '}
              {selectedTacoFood?.id
                ? convertLipid(selectedTacoFood) + selectedTacoFood?.lipid[0].unit
                : ''}
            </div>
          </div>
        )}
        <button
          onClick={() => {
            addRefeicao(consumo24h.periodoSelecionado, {
              alimentoTACOId: selectedTacoFood.id,
              alimentoPinheiroId: selectedPinheiroFood.id,
              alimentoPinheiro: selectedPinheiroFood,
              alimentoTACO: selectedTacoFood,
              medida: pinheiroMeasureLabel,
              quantidade: pinheiroQty,
              tipoDeRefeicaoId: 1,
              horario: undefined,
            });
            // addConsumo24h(consumo24h.colacao, 1);
            setIsOpen(false);
          }}
          className='mt-2 mr-4 rounded-md bg-neutral-500 py-1 px-2 text-lg font-semibold text-white hover:bg-neutral-400'
        >
          Adicionar
        </button>
      </Modal>
    </Layout>
  );
};

export default ConsumoAlimentar24h;
