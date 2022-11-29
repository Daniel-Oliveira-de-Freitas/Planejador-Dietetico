import { useState } from 'react';
import { Link } from 'react-router-dom';

const AvaliacaoDietetica = () => {
  const [consumoHabitual, setConsumoHabitual] = useState({
    acucar: false,
    adocante: false,
    fritura: false,
    carneComGordura: false,
    coposDeAgua: 0,
    latasDeOleo: 0,
    numeroDePessoas: 1,
    localDoAlmoco: '',
    localDaJanta: '',
    quemPrepara: '', // achar um nome melhor
  });

  return (
    <>
      <h2 className='text-2xl'>Avaliação dietética</h2>
      <Link to='/'>
        <a className='text-blue-600 hover:underline'>Voltar para o início</a>
      </Link>
      <div>
        <details>
          <summary>Desjejum</summary>
          <table>
            <tr>
              <th>nome</th>
              <th>quantidade</th>
              <th>kcal</th>
              <th>carboidratos</th>
              <th>proteínas</th>
              <th>gorduras</th>
            </tr>
            <tr>
              <td>arroz, cozido, integral</td>
              <td>3 colheres de arroz</td>
              <td>250</td>
              <td>85g</td>
              <td>9,7g</td>
              <td>5,4g</td>
            </tr>
          </table>
        </details>
      </div>
      <form>
        <h2 className='text-2xl'>Consumo Alimentar Habitual</h2>
        <div className='flex flex-col gap-1'>
          <CheckBox
            id='acucar'
            text='Açúcar/doces'
          />
          <CheckBox
            id='adocante'
            text='Adoçante'
          />
          <CheckBox
            id='fritura'
            text='Frituras'
          />
          <CheckBox
            id='carneComGordura'
            text='Carne com gordura aparente'
          />
          <NumberInput text='copos de água por dia' />
          <NumberInput text='latas de óleo por mês' />
          <NumberInput text='número de pessoas' />
        </div>
      </form>
    </>
  );
};

interface CheckBoxProps {
  text: string;
  id: string;
}

const CheckBox = (props: CheckBoxProps) => {
  return (
    <div>
      <input
        type='checkbox'
        className='mr-1'
        id={props.id}
      />
      <label htmlFor={props.id}>{props.text}</label>
    </div>
  );
};

interface NumberInputProps {
  text: string;
}

const NumberInput = (props: NumberInputProps) => {
  return (
    <div>
      <input
        type='number'
        className='border-2 mr-1 appearance-none'
      />
      <label>{props.text}</label>
    </div>
  );
};

export default AvaliacaoDietetica;
