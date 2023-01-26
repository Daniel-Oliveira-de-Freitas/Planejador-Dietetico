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
import FoodInformationTotal from './FoodInformationTotal';
import { convertMacros } from '../utils/convertMacros';
import { removeConsumo24h } from '../utils/removeConsumo24h';

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
    setConsumo(prev => [
      ...prev,
      {
        alimentoTACO: tacoFood,
        alimentoTACOId: tacoFood.id,
        alimentoPinheiro: pinheiroFood,
        alimentoPinheiroId: pinheiroFood.id,
        tipoDeRefeicaoId: tipoDeRefeicao.id,
        quantidade,
        medida,
      },
    ]);
  };

  const handleMeasure = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return setPinheiroMeasureValue(Number(e.target.value));
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(e.target.valueAsNumber)) {
      return setPinheiroQty(0);
    }
    return setPinheiroQty(Number(e.target.valueAsNumber)); // OBS.: castando para remover o 0 da esquerda
  };

  return (
    <>
      {tiposDeRefeicao && consumo && (
        <div>
          <FoodDropdown
            foodArray={consumo}
            setIsOpen={setIsOpen}
            tiposDeRefeicao={tiposDeRefeicao}
            setTipoDeRefeicao={setTipoDeRefeicao}
            setConsumo={setConsumo}
          />
          <FoodInformationTotal
            foodArray={consumo}
            tiposDeRefeicao={tiposDeRefeicao}
            setTipoDeRefeicao={setTipoDeRefeicao}
          />
        </div>
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
            min={0}
          />
          <div className='col-start-1'>
            <div>
              <div className='font-bold'>Calorias:</div>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue).kcal + ' kcal'
                : ''}
            </div>
            <div>
              <div className='font-bold'>Proteínas:</div>
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue).protein +
                  selectedTacoFood?.protein[0].unit
                : ''}
            </div>
          </div>
          <div className='col-start-2'>
            <div>
              <div className='font-bold'>Carboidratos:</div>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue).carb +
                  selectedTacoFood?.carbohydrate[0].unit
                : ''}
            </div>
            <div>
              <div className='font-bold'>Gorduras:</div>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue).lipid +
                  selectedTacoFood?.lipid[0].unit
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
            void toast.promise(addConsumo24h(consumo, paciente), {
              error: 'Não foi possível salvar',
              pending: 'Salvando...',
              success: 'Salvo com sucesso!',
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
