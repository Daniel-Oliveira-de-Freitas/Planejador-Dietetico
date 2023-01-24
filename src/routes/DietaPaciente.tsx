import Layout from '../components/Layout';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { Paciente, TipoDeRefeicao } from '.prisma/client';
import { getPaciente } from '../utils/paciente/getPaciente';
import { addDietaPaciente } from '../utils/addDietaPaciente';
import { toast } from 'react-toastify';
import { Combobox } from '@headlessui/react';
import { getAllTacoFoods } from '../utils/taco/getAllTacoFoods';
import {
  AlimentoPinheiro,
  AlimentoTACO,
  Carbohydrate,
  Energy,
  Lipid,
  MeasurePinheiro,
  Protein,
} from '@prisma/client';
import { getAllPinheiroFoods } from '../utils/pinheiro/getAllPinheiroFoods';
import ConsumoAlimentarHabitual from '../components/ConsumoAlimentarHabitual';
import ConsumoAlimentar24h from '../components/ConsumoAlimentar24h';
import { Refeicao } from '../types/types';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { getTiposDeRefeicao } from '../utils/getTiposDeRefeicao';
import FoodDropdown from '../components/FoodDropdown';
import { getRefeicaoDietasById } from '../utils/getRefeicaosDieta';
import FoodInformationTotal from '../components/FoodInformationTotal';
import { getAge } from '../utils/getAge';

Modal.setAppElement('#root');

interface AlimentoTACOComMacros extends AlimentoTACO {
  energy: Energy[];
  carbohydrate: Carbohydrate[];
  protein: Protein[];
  lipid: Lipid[];
}

interface AlimentoPinheiroComMedidas extends AlimentoPinheiro {
  measures: MeasurePinheiro[];
}

const DietaPaciente = () => {
  const location = useLocation();
  const { idPaciente } = location.state;
  const MAX_RESULTS = 5;
  const [query, setQuery] = useState('');
  const [tacoFoods, setTacoFoods] = useState<AlimentoTACOComMacros[]>([]);
  const [selectedTacoFood, setSelectedTacoFood] = useState(tacoFoods[0]);
  const [pinheiroFoods, setPinheiroFoods] = useState<AlimentoPinheiroComMedidas[]>([]);
  const [selectedPinheiroFood, setSelectedPinheiroFood] = useState(pinheiroFoods[0]);
  const [pinheiroMeasureValue, setPinheiroMeasureValue] = useState(0);
  const [pinheiroMeasureLabel, setPinheiroMeasureLabel] = useState('');
  const [pinheiroQty, setPinheiroQty] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dietaPaciente, setdietaPaciente] = useState<Refeicao[]>([]);
  const [tiposDeRefeicao, setTiposDeRefeicao] = useState<TipoDeRefeicao[]>();
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState<TipoDeRefeicao>();
  const [paciente, setPaciente] = useState<Paciente>();

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getAllTacoFoods().then(setTacoFoods);
    getAllPinheiroFoods().then(setPinheiroFoods);
    getTiposDeRefeicao().then(setTiposDeRefeicao);
    getPaciente(idPaciente).then(setPaciente);
    getRefeicaoDietasById(idPaciente).then(setdietaPaciente);
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
    dietaPaciente.push(refeicao);
  };

  const handleMeasure = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return setPinheiroMeasureValue(Number(e.target.value));
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setPinheiroQty(e.target.valueAsNumber);
  };

  const convertMedida = (tacoFood: AlimentoTACOComMacros) => {
    const calcMedida = pinheiroQty / pinheiroMeasureValue;

    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcMedida);
    }

    return 0;
  };

  const convertKcal = (tacoFood: AlimentoTACOComMacros) => {
    const calcKcal = (pinheiroQty * tacoFood.energy[0].kcal) / tacoFood.base_qty;

    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcKcal);
    }

    return 0;
  };

  const convertCarb = (tacoFood: AlimentoTACOComMacros) => {
    const calcCarb = (pinheiroQty * tacoFood.carbohydrate[0].qty) / tacoFood.base_qty;
    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcCarb);
    }

    return 0;
  };

  const convertProtein = (tacoFood: AlimentoTACOComMacros) => {
    const calcProtein = (pinheiroQty * tacoFood.protein[0].qty) / tacoFood.base_qty;

    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcProtein);
    }

    return 0;
  };

  const convertLipid = (tacoFood: AlimentoTACOComMacros) => {
    const calcLipid = (pinheiroQty * tacoFood.lipid[0].qty) / tacoFood.base_qty;
    if (pinheiroQty > 0 && tacoFood) {
      return Math.ceil(calcLipid);
    }

    return 0;
  };

  const handleSubmit = () => {
    void toast.promise(addDietaPaciente(dietaPaciente, paciente), {
      error: 'Não foi possível salvar',
      pending: 'Salvando...',
      success: 'Adicionado com sucesso!',
    });
  };

  return (
    <Layout>
      <h2 className='text-2xl'>
        Nome do paciente: {typeof paciente !== 'undefined' ? paciente.nome : ''},{' '}
        {paciente?.dataDeNascimento && getAge(paciente.dataDeNascimento)} anos
      </h2>
      <br />
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary className='text-2xl uppercase'>Plano Dietético</summary>
        <br />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          className='mt-6 mr-12 ml-12  block rounded-lg border border-gray-300 bg-gray-50 p-6 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
        >
          <div className='px-6 py-6 lg:px-8'>
            <h1 className='text-center text-3xl uppercase'>Cadastrar Plano Dietético</h1>
            <hr />
            <br />
            <form
              className='space-y-4'
              action='#'
            >
              <div className='flow-root'>
                <div className='float-left '>
                  <label className='mb-2 block text-sm font-medium text-gray-900'>
                    Nome do Alimento
                  </label>
                  <Combobox
                    defaultValue={selectedTacoFood}
                    onChange={setSelectedTacoFood}
                  >
                    <Combobox.Input
                      onChange={event => setQuery(event.target.value)}
                      className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                </div>
                <div className='float-right '>
                  <label className='mb-2 block text-sm font-medium text-gray-900 '>
                    Descrição do Alimento
                  </label>
                  <Combobox
                    defaultValue={selectedPinheiroFood}
                    onChange={setSelectedPinheiroFood}
                  >
                    <Combobox.Input
                      onChange={event => setQuery(event.target.value)}
                      className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                </div>
              </div>
              <div className='flow-root'>
                <div className='float-left '>
                  <label className=' mb-2 block text-sm font-medium text-gray-900 '>
                    Quantidade em Gramas
                  </label>
                  <input
                    type='number'
                    name='quantidadeCaseiras'
                    id='quantidadeCaseiras'
                    placeholder='Ex: 250 gramas'
                    className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    onChange={handleQty}
                  />
                </div>

                {selectedPinheiroFood && selectedTacoFood && (
                  <div>
                    <div className='float-right'>
                      <label className=' mb-2 block text-sm font-medium text-gray-900'>
                        Unidade em medidas caseiras
                      </label>
                      <select
                        className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                    <div className='float-right '>
                      <label className=' mb-2 block text-sm font-medium text-gray-900 '>
                        Quantidade em Medidas Caseiras
                      </label>
                      <input
                        type='number'
                        name='quantidadeCaseiras'
                        id='quantidadeCaseiras'
                        readOnly
                        placeholder='5 colheres'
                        className='block w-96 cursor-default rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                        value={selectedTacoFood?.id ? convertMedida(selectedTacoFood) : ''}
                      />
                    </div>
                  </div>
                )}
              </div>
              <hr />
              {selectedPinheiroFood && selectedTacoFood && pinheiroMeasureValue && (
                <div className='text-end'>
                  <label className=' mb-2 block text-sm font-medium text-gray-900'>
                    Calorias: {selectedTacoFood?.id ? convertKcal(selectedTacoFood) + ' kcal' : ''}
                  </label>
                  <label className=' mb-2 block text-sm font-medium text-gray-900'>
                    Proteínas:{' '}
                    {selectedTacoFood?.id
                      ? convertProtein(selectedTacoFood) + selectedTacoFood?.protein[0].unit
                      : ''}
                  </label>
                  <label className=' mb-2 block text-sm font-medium text-gray-900'>
                    Carboidratos:{' '}
                    {selectedTacoFood?.id
                      ? convertCarb(selectedTacoFood) + selectedTacoFood?.carbohydrate[0].unit
                      : ''}
                  </label>
                  <label className=' mb-2 block text-sm font-medium text-gray-900'>
                    Gorduras:{' '}
                    {selectedTacoFood?.id
                      ? convertLipid(selectedTacoFood) + selectedTacoFood?.lipid[0].unit
                      : ''}
                  </label>
                </div>
              )}
              <div className='grid content-center items-center justify-items-center'>
                <div className='mr-2 border-separate space-x-4 rounded-b border-gray-200 p-5 dark:border-gray-600'>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    data-modal-toggle='defaultModal'
                    type='submit'
                    className='rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                    onClick={() => {
                      addRefeicao(
                        selectedTacoFood,
                        selectedPinheiroFood,
                        pinheiroMeasureLabel,
                        pinheiroQty,
                        tipoDeRefeicao
                      );
                      handleSubmit();
                      setIsOpen(false);
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        {tiposDeRefeicao && dietaPaciente && (
          <div>
            <FoodDropdown
              foodArray={dietaPaciente}
              setIsOpen={setIsOpen}
              tiposDeRefeicao={tiposDeRefeicao}
              setTipoDeRefeicao={setTipoDeRefeicao}
            />
            <FoodInformationTotal
              foodArray={dietaPaciente}
              tiposDeRefeicao={tiposDeRefeicao}
              setTipoDeRefeicao={setTipoDeRefeicao}
            />
          </div>
        )}

      </details>
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary className='text-2xl uppercase'>Consumo Habitual</summary>
        <ConsumoAlimentarHabitual />
      </details>
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary className='text-2xl uppercase'>Consumo 24H</summary>
        <ConsumoAlimentar24h />
      </details>
    </Layout>
  );
};

export default DietaPaciente;
