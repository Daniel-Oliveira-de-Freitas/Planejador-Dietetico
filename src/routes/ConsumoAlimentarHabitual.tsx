import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ConsumoAlimentarHabitual = () => {
  const [consumoHabitual, setConsumoHabitual] = useState({
    acucar: false,
    adocante: false,
    fritura: false,
    carneComGordura: false,
    coposDeAgua: '',
    latasDeOleo: '',
    numeroDePessoas: 1,
    localDoAlmoco: '',
    localDaJanta: '',
    quemPrepara: '', // achar um nome melhor
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsumoHabitual(prev => {
      if (e.target.type === 'checkbox') {
        return { ...prev, [e.target.name]: e.target.checked };
      }

      if (e.target.type === 'number') {
        return { ...prev, [e.target.name]: parseInt(e.target.value) };
      }

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // TODO: colocar react-toastify
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(consumoHabitual);
  };

  return (
    <>
      <h2 className='text-2xl'>Consumo Alimentar Habitual</h2>
      <Link
        to='/'
        className='text-blue-600 hover:underline'
      >
        Voltar para o início
      </Link>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
          <CheckBox
            id='acucar'
            name='acucar'
            text='Açúcar/doces'
            onChange={handleChange}
          />
          <CheckBox
            id='adocante'
            name='adocante'
            text='Adoçante'
            onChange={handleChange}
          />
          <CheckBox
            id='fritura'
            name='fritura'
            text='Frituras'
            onChange={handleChange}
          />
          <CheckBox
            id='carneComGordura'
            name='carneComGordura'
            text='Carne com gordura aparente'
            onChange={handleChange}
          />
          <NumberInput
            name='coposDeAgua'
            text='copos de água por dia'
            value={consumoHabitual.coposDeAgua}
            onChange={handleChange}
          />
          <NumberInput
            name='latasDeOleo'
            text='latas de óleo por mês'
            value={consumoHabitual.latasDeOleo}
            onChange={handleChange}
          />
          <NumberInput
            name='numeroDePessoas'
            text='número de pessoas'
            value={consumoHabitual.numeroDePessoas}
            onChange={handleChange}
          />
          <button type='submit'>Salvar</button>
        </div>
      </form>
    </>
  );
};

interface CheckBoxProps {
  text: string;
  id: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckBox = (props: CheckBoxProps) => {
  return (
    <div>
      <input
        type='checkbox'
        className='mr-1'
        id={props.id}
        name={props.name}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.text}</label>
    </div>
  );
};

interface NumberInputProps {
  text: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: number | string;
}

const NumberInput = (props: NumberInputProps) => {
  return (
    <div>
      <input
        type='number'
        className='border-2 mr-1 appearance-none'
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
      <label>{props.text}</label>
    </div>
  );
};

export default ConsumoAlimentarHabitual;
