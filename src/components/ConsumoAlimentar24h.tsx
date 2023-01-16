import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import Modal from './Modal';
import { getAllTacoFoods } from '../utils/taco/getAllTacoFoods';
import { getAllPinheiroFoods } from '../utils/pinheiro/getAllPinheiroFoods';
import {
  AlimentoPinheiroComMedidas,
  AlimentoTACOComMacros,
  Consumo,
  Periodo,
  Refeicao,
} from '../types/types';
import FoodDropdown from './FoodDropdown';
import { addConsumo24h } from '../utils/addConsumo24h';
import { Paciente } from '@prisma/client';
import { getPaciente } from '../utils/paciente/getPaciente';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getConsumo24h } from '../utils/getConsumo24h';

const ConsumoAlimentar24h = () => {
  const MAX_RESULTS = 5;
  const location = useLocation();
  const { idPaciente } = location.state;
  const [paciente, setPaciente] = useState<Paciente>();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [horario, setHorario] = useState<Date>();
  const [periodo, setPeriodo] = useState<Periodo>('Colação');
  const [consumo, setConsumo] = useState<Consumo[]>([
    { periodo: 'Colação' as Periodo, refeicoes: [] as Refeicao[] },
    { periodo: 'Desjejum' as Periodo, refeicoes: [] as Refeicao[] },
    { periodo: 'Almoço' as Periodo, refeicoes: [] as Refeicao[] },
    { periodo: 'Lanche' as Periodo, refeicoes: [] as Refeicao[] },
    { periodo: 'Jantar' as Periodo, refeicoes: [] as Refeicao[] },
    { periodo: 'Ceia' as Periodo, refeicoes: [] as Refeicao[] },
  ]);
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
    getPaciente(idPaciente).then(setPaciente);
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
    // setConsumo24h(prev => {
    //   return { ...prev, periodoSelecionado: periodo };
    // });
    return setPeriodo(periodo);
  };

  const addRefeicao = (
    periodo: 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia',
    refeicao: Refeicao
  ) => {
    switch (periodo) {
      case 'Colação':
        consumo[0].refeicoes.push(refeicao);
        break;
      case 'Desjejum':
        consumo[1].refeicoes.push(refeicao);
        break;
      case 'Almoço':
        consumo[2].refeicoes.push(refeicao);
        break;
      case 'Lanche':
        consumo[3].refeicoes.push(refeicao);
        break;
      case 'Jantar':
        consumo[4].refeicoes.push(refeicao);
        break;
      case 'Ceia':
        consumo[5].refeicoes.push(refeicao);
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
    <>
      {consumo.map(c => (
        <FoodDropdown
          key={c.periodo}
          foodArray={c.refeicoes}
          setIsOpen={setIsOpen}
          timeOnChange={handleHorario}
          setTipoDeRefeicao={setTipoDeRefeicao}
          tipoDeRefeicao={c.periodo}
          title={c.periodo}
        />
      ))}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='🍕 Adicionar alimento'
      >
        <div className='mt-8 grid grid-cols-2 gap-2'>
          <div>
            <label className='text-sm font-medium text-gray-900'>Alimento TACO</label>
            <Combobox
              defaultValue={selectedTacoFood}
              onChange={setSelectedTacoFood}
            >
              <Combobox.Input
                onChange={event => setQuery(event.target.value)}
                className='w-full rounded-md border p-1'
                placeholder='Alimento TACO'
                displayValue={food => (food as unknown as AlimentoTACOComMacros)?.description ?? ''}
              />
              <Combobox.Options>
                {filteredTacoFoods.map(food => (
                  <Combobox.Option
                    key={food.id}
                    value={food}
                    className={({ active }) =>
                      `relative mt-1 cursor-default select-none rounded-md py-2 pl-10 pr-4 ${
                        active ? 'bg-sky-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {food.description}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-900'>Alimento Pinheiro</label>
            <Combobox
              defaultValue={selectedPinheiroFood}
              onChange={setSelectedPinheiroFood}
            >
              <Combobox.Input
                onChange={event => setQuery(event.target.value)}
                className='w-full rounded-md border p-1'
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
                      `relative mt-1 cursor-default select-none rounded-md py-2 pl-10 pr-4 ${
                        active ? 'bg-sky-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {food.description}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
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
        </div>
        <button
          onClick={() => {
            addRefeicao(periodo, {
              alimentoTACOId: selectedTacoFood.id,
              alimentoPinheiroId: selectedPinheiroFood.id,
              alimentoTACO: selectedTacoFood,
              alimentoPinheiro: selectedPinheiroFood,
              medida: pinheiroMeasureLabel,
              quantidade: pinheiroQty,
              tipoDeRefeicaoId: 1, // TODO: colocar de acordo com período
            });
            setIsOpen(false);
          }}
          className='float-right rounded-md bg-sky-600 py-2 px-4 text-lg font-semibold text-white hover:bg-sky-700'
        >
          Adicionar refeição
        </button>
      </Modal>
      <button
        className='mt-2 mr-4 rounded-md bg-neutral-500 py-1 px-2 text-lg font-semibold text-white hover:bg-neutral-400'
        onClick={() => {
          toast.promise(addConsumo24h(consumo, paciente), {
            error: 'Não foi possível salvar',
            pending: 'Salvando...',
            success: 'Adicionado com sucesso!',
          });
        }}
      >
        Salvar consumo 24h
      </button>
    </>
  );
};

export default ConsumoAlimentar24h;
