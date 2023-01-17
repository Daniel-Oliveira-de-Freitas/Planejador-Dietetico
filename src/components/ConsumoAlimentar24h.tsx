import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import Modal from './Modal';
import { getAllTacoFoods } from '../utils/taco/getAllTacoFoods';
import { getAllPinheiroFoods } from '../utils/pinheiro/getAllPinheiroFoods';
import { AlimentoPinheiroComMedidas, AlimentoTACOComMacros, Refeicao } from '../types/types';
import FoodDropdown from './FoodDropdown';
import { addConsumo24h } from '../utils/addConsumo24h';
import { Paciente, TipoDeRefeicao } from '@prisma/client';
import { getPaciente } from '../utils/paciente/getPaciente';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './Button';
import { getTiposDeRefeicao } from '../utils/getTiposDeRefeicao';
import { getRefeicoes24hById } from '../utils/getRefeicoes24hById';

const ConsumoAlimentar24h = () => {
  const MAX_RESULTS = 5;
  const location = useLocation();
  const { idPaciente } = location.state;
  const [paciente, setPaciente] = useState<Paciente>();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tacoFoods, setTacoFoods] = useState<AlimentoTACOComMacros[]>([]);
  const [selectedTacoFood, setSelectedTacoFood] = useState(tacoFoods[0]);
  const [pinheiroFoods, setPinheiroFoods] = useState<AlimentoPinheiroComMedidas[]>([]);
  const [selectedPinheiroFood, setSelectedPinheiroFood] = useState(pinheiroFoods[0]);
  const [pinheiroMeasureValue, setPinheiroMeasureValue] = useState(0);
  const [pinheiroMeasureLabel, setPinheiroMeasureLabel] = useState('');
  const [pinheiroQty, setPinheiroQty] = useState(1);
  const [consumo, setConsumo] = useState<Refeicao[]>([]);
  const [tiposDeRefeicao, setTiposDeRefeicao] = useState<TipoDeRefeicao[]>();
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState<TipoDeRefeicao>();

  useEffect(() => {
    getAllTacoFoods().then(setTacoFoods);
    getAllPinheiroFoods().then(setPinheiroFoods);
    getTiposDeRefeicao().then(setTiposDeRefeicao);
    getPaciente(idPaciente).then(setPaciente);
    getRefeicoes24hById(idPaciente).then(setConsumo);
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

  const addRefeicao = (
    tacoFood: AlimentoTACOComMacros,
    pinheiroFood: AlimentoPinheiroComMedidas,
    medida: string,
    quantidade: number,
    tipoDeRefeicao: TipoDeRefeicao
  ) => {
    const refeicao = {
      alimentoTACO: tacoFood,
      alimentoTACOId: tacoFood.id,
      alimentoPinheiro: pinheiroFood,
      alimentoPinheiroId: pinheiroFood.id,
      tipoDeRefeicaoId: tipoDeRefeicao.id,
      quantidade,
      medida,
    };
    consumo.push(refeicao);
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
      {tiposDeRefeicao && consumo && (
        <FoodDropdown
          foodArray={consumo}
          setIsOpen={setIsOpen}
          tiposDeRefeicao={tiposDeRefeicao}
          setTipoDeRefeicao={setTipoDeRefeicao}
        />
      )}
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
          <select
            className={`rounded-md border p-1 disabled:pointer-events-none disabled:bg-gray-300 hover:disabled:cursor-not-allowed`}
            onChange={handleMeasure}
            disabled={!selectedPinheiroFood}
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
          <div className='col-start-1'>
            <div>
              <div className='font-bold'>Calorias:</div>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertKcal(selectedTacoFood) + ' kcal'
                : ''}
            </div>
            <div>
              <div className='font-bold'>Proteínas:</div>
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertProtein(selectedTacoFood) + selectedTacoFood?.protein[0].unit
                : ''}
            </div>
          </div>
          <div className='col-start-2'>
            <div>
              <div className='font-bold'>Carboidratos:</div>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertCarb(selectedTacoFood) + selectedTacoFood?.carbohydrate[0].unit
                : ''}
            </div>
            <div>
              <div className='font-bold'>Gorduras:</div>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertLipid(selectedTacoFood) + selectedTacoFood?.lipid[0].unit
                : ''}
            </div>
          </div>
        </div>
        <div className='mt-4 flex h-full w-full justify-center'>
          <Button
            onClick={() => {
              addRefeicao(
                selectedTacoFood,
                selectedPinheiroFood,
                pinheiroMeasureLabel,
                pinheiroQty,
                tipoDeRefeicao
              );
              setIsOpen(false);
            }}
          >
            Adicionar refeição
          </Button>
        </div>
      </Modal>
      <div className='mt-4 flex w-full justify-end'>
        <Button
          onClick={() => {
            toast.promise(addConsumo24h(consumo, paciente), {
              error: 'Não foi possível salvar',
              pending: 'Salvando...',
              success: 'Adicionado com sucesso!',
            });
          }}
        >
          Salvar consumo 24h
        </Button>
      </div>
    </>
  );
};

export default ConsumoAlimentar24h;
