import Layout from '../components/Layout';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { Paciente } from '.prisma/client';
import { getPaciente } from '../utils/getPaciente';
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
  RefeicaoConsumo24h,
} from '@prisma/client';
import { getAllPinheiroFoods } from '../utils/pinheiro/getAllPinheiroFoods';

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

interface Refeicao {
  alimentoTACO: AlimentoTACOComMacros;
  alimentoPinheiro: AlimentoPinheiroComMedidas;
  horario: Date;
  tipoDeRefeicaoId: number;
}

const DietaPaciente = () => {
  const MAX_RESULTS = 5;
  const [query, setQuery] = useState('');
  const [horario, setHorario] = useState<Date>();
  const [dietaPaciente, setdietaPaciente] = useState({
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
  const [pinheiroFoods, setPinheiroFoods] = useState<
    AlimentoPinheiroComMedidas[]
  >([]);
  const [selectedPinheiroFood, setSelectedPinheiroFood] = useState(
    pinheiroFoods[0]
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const [paciente, setPaciente] = useState<Paciente>();

  useEffect(() => {
    getAllTacoFoods().then(setTacoFoods);
    getAllPinheiroFoods().then(setPinheiroFoods);
    getPaciente(1).then(setPaciente); // TODO: mudar para id do paciente selecionado
  }, []);

  const [dieta, setDieta] = useState({
    alimentoTacoId: 1,
    alimentoPinheiroId: 1,
    tipoRefeicao: '',
    horario: 'dd',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(addDietaPaciente(1, dieta), {
      error: 'Não foi possível salvar',
      pending: 'Salvando...',
      success: 'Dados salvos com sucesso!',
    });
  };

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

  const handleHorario = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setHorario(e.target.valueAsDate);
  };

  const setTipoDeRefeicao = (
    periodo: 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia'
  ) => {
    setdietaPaciente(prev => {
      return { ...prev, periodoSelecionado: periodo };
    });
  };

  const addRefeicao = (
    periodo: 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia',
    refeicao: Refeicao
  ) => {
    switch (periodo) {
      case 'Colação':
        dietaPaciente.colacao.push(refeicao);
        break;
      case 'Desjejum':
        dietaPaciente.desjejum.push(refeicao);
        break;
      case 'Almoço':
        dietaPaciente.almoco.push(refeicao);
        break;
      case 'Lanche':
        dietaPaciente.lanche.push(refeicao);
        break;
      case 'Jantar':
        dietaPaciente.jantar.push(refeicao);
        break;
      case 'Ceia':
        dietaPaciente.ceia.push(refeicao);
        break;
    }
  };

  return (
    <Layout>
      <div className='float-right'>
        <button
          type='button'
          className=' mr-2 mb-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300'
          onClick={handleOpenModal}
        >
          + Adicionar Refeição
        </button>
      </div>
      <h1 className='text-2xl'>Dieta do paciente</h1>
      <h2>
        Nome do paciente: {typeof paciente != 'undefined' ? paciente.nome : ''}
      </h2>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className='mt-6 mr-12 ml-12  block rounded-lg border border-gray-300 bg-gray-50 p-6 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
      >
        <div className='px-6 py-6 lg:px-8'>
          <h2 className='mb-4 text-center text-xl font-medium text-gray-900'>
            Prescrição dietética
          </h2>
          <form
            onSubmit={handleSubmit}
            className='space-y-4'
            action='#'
          >
            <div className='flow-root'>
              <div className='float-left '>
                <label className='mb-2 block text-sm font-medium text-gray-900'>
                  Refeição:
                </label>
                <select
                  name='refeicao'
                  id='refeicao'
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  onChange={choice => setTipoDeRefeicao('Jantar')}
                >
                  <option value='Desjejum'>Desjejum</option>
                  <option value='Colacao'>Colacao</option>
                  <option value='Almoco'>Almoço</option>
                  <option value='Lanche'>Lanche</option>
                  <option value='Jantar'>Jantar</option>
                  <option value='Ceia'>Ceia</option>
                </select>
              </div>
              <div className='float-right '>
                <label className='mb-2 block text-sm font-medium text-gray-900 '>
                  Horário da Refeição
                </label>
                <input
                  type='time'
                  defaultValue={'00:00'}
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  onChange={handleHorario}
                />
              </div>
            </div>
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
                      (food as unknown as AlimentoTACOComMacros)?.description ??
                      ''
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
                      (food as unknown as AlimentoPinheiroComMedidas)
                        ?.description ?? ''
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
                  type=''
                  name='quantidadeCaseiras'
                  id='quantidadeCaseiras'
                  placeholder='Ex: 250 gramas'
                  className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>

              {selectedPinheiroFood && (
                <div>
                  <div className='float-right '>
                    <label className=' mb-2 block text-sm font-medium text-gray-900 '>
                      Quantidade em Medidas Caseiras
                    </label>
                    <input
                      type=''
                      name='quantidadeCaseiras'
                      id='quantidadeCaseiras'
                      readOnly
                      placeholder='5 colheres'
                      className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                  <div className='float-right'>
                    <label className=' mb-2 block text-sm font-medium text-gray-900'>
                      Unidade em mediadas caseiras
                    </label>
                    <select className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'>
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
                </div>
              )}
            </div>
            <hr />
            <div className='text-end'>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Calorias:{' '}
                {selectedTacoFood?.id
                  ? Math.ceil(selectedTacoFood?.energy[0].kcal)
                  : ''}
              </label>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Proteínas:{' '}
                {selectedTacoFood?.id
                  ? Math.ceil(selectedTacoFood?.protein[0].qty) +
                    selectedTacoFood?.protein[0].unit
                  : ''}
              </label>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Carboidratos:{' '}
                {selectedTacoFood?.id
                  ? Math.ceil(selectedTacoFood?.carbohydrate[0].qty) +
                    selectedTacoFood?.carbohydrate[0].unit
                  : ''}
              </label>
              <label className=' mb-2 block text-sm font-medium text-gray-900'>
                Gorduras:{' '}
                {selectedTacoFood?.id
                  ? Math.ceil(selectedTacoFood?.lipid[0].qty) +
                    selectedTacoFood?.lipid[0].unit
                  : ''}
              </label>
            </div>
            <div className=''>
              <div className='mr-2 border-separate space-x-4 rounded-b border-gray-200 p-5 dark:border-gray-600'>
                <button
                  data-modal-toggle='defaultModal'
                  type='button'
                  className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                >
                  Cancelar
                </button>
                <button
                  data-modal-toggle='defaultModal'
                  type='submit'
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
                  onClick={() => {
                    addRefeicao(dietaPaciente.periodoSelecionado, {
                      alimentoTACO: selectedTacoFood,
                      alimentoPinheiro: selectedPinheiroFood,
                      tipoDeRefeicaoId: 3,
                      horario: horario,
                    });
                    setIsOpen(false);

                    console.log(dietaPaciente);
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Desjejum</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          {dietaPaciente.desjejum.length > 0 && (
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Nome
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Quantidade
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  kcal
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Carboidratos
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Proteinas
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Gorduras
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {dietaPaciente.desjejum.map(alimento => (
              <tr
                key={alimento.alimentoPinheiro.id}
                className='border-b bg-white'
              >
                <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                  {alimento.alimentoTACO.description}
                </td>
                <td className='py-4 px-6'>
                  {alimento.alimentoPinheiro.measures[0].label}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.energy[0].kcal)}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                    alimento.alimentoTACO.carbohydrate[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                    alimento.alimentoTACO.protein[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                    alimento.alimentoTACO.lipid[0].unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Colação</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          {dietaPaciente.colacao.length > 0 && (
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Nome
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Quantidade
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  kcal
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Carboidratos
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Proteinas
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Gorduras
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {dietaPaciente.colacao.map(alimento => (
              <tr
                key={alimento.alimentoPinheiro.id}
                className='border-b bg-white'
              >
                <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                  {alimento.alimentoTACO.description}
                </td>
                <td className='py-4 px-6'>
                  {alimento.alimentoPinheiro.measures[0].label}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.energy[0].kcal)}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                    alimento.alimentoTACO.carbohydrate[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                    alimento.alimentoTACO.protein[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                    alimento.alimentoTACO.lipid[0].unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Almoço</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          {dietaPaciente.almoco.length > 0 && (
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Nome
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Quantidade
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  kcal
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Carboidratos
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Proteinas
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Gorduras
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {dietaPaciente.almoco.map(alimento => (
              <tr
                key={alimento.alimentoPinheiro.id}
                className='border-b bg-white'
              >
                <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                  {alimento.alimentoTACO.description}
                </td>
                <td className='py-4 px-6'>
                  {alimento.alimentoPinheiro.measures[0].label}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.energy[0].kcal)}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                    alimento.alimentoTACO.carbohydrate[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                    alimento.alimentoTACO.protein[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                    alimento.alimentoTACO.lipid[0].unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Lanche</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          {dietaPaciente.lanche.length > 0 && (
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Nome
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Quantidade
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  kcal
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Carboidratos
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Proteinas
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Gorduras
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {dietaPaciente.lanche.map(alimento => (
              <tr
                key={alimento.alimentoPinheiro.id}
                className='border-b bg-white'
              >
                <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                  {alimento.alimentoTACO.description}
                </td>
                <td className='py-4 px-6'>
                  {alimento.alimentoPinheiro.measures[0].label}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.energy[0].kcal)}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                    alimento.alimentoTACO.carbohydrate[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                    alimento.alimentoTACO.protein[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                    alimento.alimentoTACO.lipid[0].unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Jantar</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          {dietaPaciente.jantar.length > 0 && (
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Nome
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Quantidade
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Medidas Caseiras
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  kcal
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Carboidratos
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Proteinas
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Gorduras
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Horario
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {dietaPaciente.jantar.map(alimento => (
              <tr
                key={alimento.alimentoPinheiro.id}
                className='border-b bg-white'
              >
                <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                  {alimento.alimentoTACO.description}
                </td>
                <td className='py-4 px-6'>
                  {alimento.alimentoPinheiro.measures[0].label}
                </td>
                <td className='py-4 px-6'>
                  {alimento.alimentoPinheiro.measures[0].label}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.energy[0].kcal)}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                    alimento.alimentoTACO.carbohydrate[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                    alimento.alimentoTACO.protein[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                    alimento.alimentoTACO.lipid[0].unit}
                </td>
                <td className='py-4 px-6'></td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <hr />
      <details className='flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'>
        <summary>Ceia</summary>
        <table className='w-full text-left text-sm text-gray-500'>
          {dietaPaciente.ceia.length > 0 && (
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Nome
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Quantidade
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  kcal
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Carboidratos
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Proteinas
                </th>
                <th
                  scope='col'
                  className='py-3 px-6'
                >
                  Gorduras
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {dietaPaciente.ceia.map(alimento => (
              <tr
                key={alimento.alimentoPinheiro.id}
                className='border-b bg-white'
              >
                <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                  {alimento.alimentoTACO.description}
                </td>
                <td className='py-4 px-6'>
                  {alimento.alimentoPinheiro.measures[0].label}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.energy[0].kcal)}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                    alimento.alimentoTACO.carbohydrate[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {' '}
                  {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                    alimento.alimentoTACO.protein[0].unit}
                </td>
                <td className='py-4 px-6'>
                  {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                    alimento.alimentoTACO.lipid[0].unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </Layout>
  );
};

export default DietaPaciente;
