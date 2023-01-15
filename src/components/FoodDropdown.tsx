import { Refeicao } from '../routes/ConsumoAlimentar24h/types';

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
      <summary className='flex items-center gap-2 bg-neutral-100 hover:cursor-pointer'>
        <button
          onClick={() => {
            props.setTipoDeRefeicao(props.tipoDeRefeicao);
            props.setIsOpen(true);
          }}
          className='self-center bg-neutral-500 p-2 text-lg font-semibold text-white hover:bg-neutral-400'
        >
          +
        </button>
        <input
          type='time'
          className='rounded-md border p-1 text-center'
          defaultValue={'00:00'}
          onChange={props.timeOnChange}
        />
        <div>{props.title}</div>
      </summary>
      <table>
        {props.foodArray.length > 0 && (
          <thead>
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
            <tr key={alimento.alimentoPinheiro.id}>
              <td>{alimento.alimentoTACO.description}</td>
              <td>
                {alimento.quantidade} {alimento.alimentoPinheiro.measures[0].label}
              </td>
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
  );
};

export default FoodDropdown;
