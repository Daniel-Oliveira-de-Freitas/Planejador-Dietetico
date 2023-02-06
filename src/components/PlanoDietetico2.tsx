import React, { useContext, useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import Modal from './Modal';
import { getAllTacoFoods } from '../utils/taco/getAllTacoFoods';
import { getAllPinheiroFoods } from '../utils/pinheiro/getAllPinheiroFoods';
import {
  AlimentoPinheiroComMedidas,
  AlimentoTACOComMacros,
  Refeicao,
  RefeicaoDietaComAlimentos,
} from '../types/types';
import { TipoDeRefeicao } from '@prisma/client';
import { getPaciente } from '../utils/paciente/getPaciente';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './Button';
import { getTiposDeRefeicao } from '../utils/getTiposDeRefeicao';
import { convertMacros } from '../utils/convertMacros';
import { PacienteContext } from '../context/PacienteContext';
import { addDietaPaciente } from '../utils/addDietaPaciente';
import FoodDropdownDieta from './FoodDropdownDieta';
import { getRefeicaoDietaById } from '../utils/getRefeicaoDietaById';
import { getAllRefeicaoDieta } from '../utils/getAllRefeicaoDieta';
import { removeRefeicaoDieta } from '../utils/removeRefeicaoDieta';
import MeasuresInformation from './MeasuresInformation';

const PlanoDietetico2 = () => {
  const MAX_RESULTS = 5;
  const location = useLocation();
  const { idPaciente } = location.state;
  const { paciente, setPaciente } = useContext(PacienteContext);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tacoFoods, setTacoFoods] = useState<AlimentoTACOComMacros[]>([]);
  const [selectedTacoFood, setSelectedTacoFood] = useState(tacoFoods[0]);
  const [pinheiroFoods, setPinheiroFoods] = useState<AlimentoPinheiroComMedidas[]>([]);
  const [selectedPinheiroFood, setSelectedPinheiroFood] = useState(pinheiroFoods[0]);
  const [pinheiroMeasureValue, setPinheiroMeasureValue] = useState(0);
  const [pinheiroMeasureLabel, setPinheiroMeasureLabel] = useState('');
  const [pinheiroMeasureId, setPinheiroMeasureId] = useState(0);
  const [pinheiroQty, setPinheiroQty] = useState(1);
  const [refeicao, setRefeicao] = useState<Refeicao[]>([]);
  const [refeicaoData, setRefeicaoData] = useState<RefeicaoDietaComAlimentos[]>();
  const [tiposDeRefeicao, setTiposDeRefeicao] = useState<TipoDeRefeicao[]>();
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState<TipoDeRefeicao>();

  useEffect(() => {
    getAllRefeicaoDieta(idPaciente).then(setRefeicaoData);
  }, []);

  useEffect(() => {
    getAllTacoFoods().then(setTacoFoods);
    getAllPinheiroFoods().then(setPinheiroFoods);
    getTiposDeRefeicao().then(setTiposDeRefeicao);
    getPaciente(idPaciente).then(setPaciente);
    getRefeicaoDietaById(idPaciente).then(setRefeicao);
  }, []);

  useEffect(() => {
    setPinheiroMeasureValue(selectedPinheiroFood?.measures[pinheiroMeasureId].qty);
    setPinheiroMeasureLabel(selectedPinheiroFood?.measures[pinheiroMeasureId].label);
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
    setRefeicao(prev => [
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
    setPinheiroMeasureId(e.target.selectedIndex);
    setPinheiroMeasureLabel(selectedPinheiroFood?.measures[e.target.selectedIndex].label);
    setPinheiroMeasureValue(selectedPinheiroFood?.measures[e.target.selectedIndex].qty);
    return setPinheiroMeasureValue(Number(e.target.value));
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(e.target.valueAsNumber)) {
      return setPinheiroQty(0);
    }
    return setPinheiroQty(Number(e.target.valueAsNumber)); // OBS.: castando para remover o 0 da esquerda
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addRefeicao(
      selectedTacoFood,
      selectedPinheiroFood,
      pinheiroMeasureLabel,
      pinheiroQty,
      tipoDeRefeicao
    );
    setIsOpen(false);
    void toast.promise(
      addDietaPaciente(
        {
          alimentoTACO: selectedTacoFood,
          alimentoPinheiro: selectedPinheiroFood,
          tipoDeRefeicaoId: tipoDeRefeicao.id,
          quantidade: pinheiroQty,
          medida: pinheiroMeasureLabel,
        },
        paciente
      ).then(res => {
        setRefeicaoData(prev => [...prev, res]);
        setSelectedPinheiroFood(null);
        setSelectedTacoFood(null);
        getPaciente(paciente.id).then(setPaciente);
      }),
      {
        error: 'Não foi possível salvar',
        pending: 'Salvando...',
        success: 'Salvo com sucesso!',
      }
    );
  };

  return (
    <>
      {tiposDeRefeicao && refeicao && (
        <div>
          <FoodDropdownDieta
            foodArray={refeicaoData}
            setIsOpen={setIsOpen}
            tiposDeRefeicao={tiposDeRefeicao}
            setTipoDeRefeicao={setTipoDeRefeicao}
            setConsumo={setRefeicaoData}
            removeFn={removeRefeicaoDieta}
          />
        </div>
      )}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='🥗 Adicionar alimento'
      >
        <MeasuresInformation />
        <form
          className='mt-8 grid grid-cols-2 gap-2 text-sky-900'
          onSubmit={handleSubmit}
        >
          <div>
            <label className='font-light'>Alimento TACO</label>
            <div className={'relative inline-flex'}>
              <Combobox
                defaultValue={selectedTacoFood}
                onChange={setSelectedTacoFood}
              >
                <div className='relative mt-1'>
                  <div className={'relative rounded-lg bg-white'}>
                    <Combobox.Input
                      onChange={event => setQuery(event.target.value)}
                      className='w-full rounded-md border p-1'
                      displayValue={food =>
                        (food as unknown as AlimentoTACOComMacros)?.description ?? ''
                      }
                    />
                    <Combobox.Options
                      className={'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white'}
                    >
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
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {food.description}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                ></span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </div>
              </Combobox>
            </div>
          </div>
          <div>
            <label className='font-light'>Alimento Pinheiro</label>
            <div className={'fixed'}>
              <Combobox
                defaultValue={selectedPinheiroFood}
                onChange={setSelectedPinheiroFood}
              >
                <div className='relative mt-1'>
                  <div className={'relative rounded-lg bg-white'}>
                    <Combobox.Input
                      onChange={event => setQuery(event.target.value)}
                      className='w-full rounded-md border p-1'
                      displayValue={food =>
                        (food as unknown as AlimentoPinheiroComMedidas)?.description ?? ''
                      }
                    />
                    <Combobox.Options
                      className={'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white'}
                    >
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
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {food.description}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                ></span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </div>
              </Combobox>
            </div>
          </div>
          <div className={'flex flex-col'}>
            <label className={'font-light'}>Medida</label>
            <select
              className={`z-1 rounded-md border p-1 disabled:bg-gray-300 hover:disabled:cursor-not-allowed`}
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
          </div>
          {/*<div className={''}>*/}
          {/*  <label className={'font-light'}>Quantidade</label>*/}
          {/*  <input*/}
          {/*    type='number'*/}
          {/*    className='rounded-md border p-1'*/}
          {/*    onChange={handleQty}*/}
          {/*    value={pinheiroQty}*/}
          {/*    min={0}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className={''}>
            <label className={'font-light'}>Quantidade em gramas</label>
            <input
              type='number'
              className='rounded-md border p-1'
              // onChange={handleMeasureInput}
              // value={pinheiroMeasureValue || 0}
              onChange={handleQty}
              value={pinheiroQty || 0}
              min={0}
            />
          </div>
          <div className='col-span-2 mt-5'>
            <div className='text-sm'>
              <span className={'font-semibold'}>Calorias:</span>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue, 'dieta').kcal +
                  ' kcal'
                : ''}
            </div>
            <div className='text-sm'>
              <span className={'font-semibold'}>Carboidratos:</span>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue, 'dieta').carb +
                  selectedTacoFood?.carbohydrate[0].unit
                : ''}
            </div>
            <div className='text-sm'>
              <span className={'font-semibold'}>Proteínas:</span>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue, 'dieta')
                    .protein + selectedTacoFood?.protein[0].unit
                : ''}
            </div>
            <div className='text-sm'>
              <span className={'font-semibold'}>Gorduras:</span>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue, 'dieta')
                    .lipid + selectedTacoFood?.lipid[0].unit
                : ''}
            </div>
            <div className='text-sm'>
              <span className={'font-semibold'}>Medidas caseiras:</span>{' '}
              {selectedTacoFood?.id && selectedPinheiroFood?.id
                ? convertMacros(selectedTacoFood, pinheiroQty, pinheiroMeasureValue).measure
                : ''}
            </div>
          </div>
          <Button
            className={'col-start-2'}
            type={'submit'}
          >
            Adicionar
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default PlanoDietetico2;
