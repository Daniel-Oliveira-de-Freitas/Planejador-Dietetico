import { Refeicao } from '../types/types';

interface FoodDropdownProps {
  setTipoDeRefeicao: (
    periodo: 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia'
  ) => void;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  timeOnChange: React.ChangeEventHandler<HTMLInputElement>;
  foodArray: Refeicao[];
  title: string;
  tipoDeRefeicao: 'Colação' | 'Desjejum' | 'Almoço' | 'Lanche' | 'Jantar' | 'Ceia';
}

const FoodDropdown = (props: FoodDropdownProps) => {
  return (
    <details>
      <summary className='group mt-2 flex items-center justify-between rounded-xl border border-gray-200 py-2 px-4 text-left font-medium text-gray-500 hover:cursor-pointer hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 group-first:mt-4'>
        <div className='group-hover:text-white'>{props.title}</div>
        <button
          onClick={() => {
            props.setTipoDeRefeicao(props.tipoDeRefeicao);
            props.setIsOpen(true);
          }}
          className='flex-end mr-2 mb-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300'
        >
          +
        </button>
      </summary>
      <table className='w-full rounded-b-lg text-left text-sm text-gray-500'>
        {props.foodArray.length > 0 && (
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
            <tr>
              <th className='text-left text-sm font-thin uppercase tracking-wider'>nome</th>
              <th className='text-left text-sm font-thin uppercase tracking-wider'>qtd</th>
              <th className='text-sm font-thin uppercase tracking-wider'>kcal</th>
              <th className='text-sm font-thin uppercase tracking-wider'>carb.</th>
              <th className='text-sm font-thin uppercase tracking-wider'>prot.</th>
              <th className='text-sm font-thin uppercase tracking-wider'>gord.</th>
            </tr>
          </thead>
        )}
        <tbody>
          {props.foodArray.map(alimento => (
            <tr
              key={alimento.alimentoPinheiro.id}
              className='border-b bg-white'
            >
              <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                {alimento.alimentoTACO.description}
              </td>
              <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                {alimento.quantidade} {alimento.alimentoPinheiro.measures[0].label}
              </td>
              <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                {Math.ceil(alimento.alimentoTACO.energy[0].kcal)}
              </td>
              <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                {Math.ceil(alimento.alimentoTACO.carbohydrate[0].qty) +
                  alimento.alimentoTACO.carbohydrate[0].unit}
              </td>
              <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                {Math.ceil(alimento.alimentoTACO.protein[0].qty) +
                  alimento.alimentoTACO.protein[0].unit}
              </td>
              <td className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                {Math.ceil(alimento.alimentoTACO.lipid[0].qty) +
                  alimento.alimentoTACO.lipid[0].unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
};

export default FoodDropdown;
