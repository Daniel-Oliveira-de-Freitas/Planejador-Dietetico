import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addConsumoHabitual } from '../utils/addConsumoHabitual';

const ConsumoAlimentarHabitual = () => {
  const [consumoHabitual, setConsumoHabitual] = useState({
    acucar: false,
    adocante: false,
    frituras: false,
    carneComGordura: false,
    coposDeAgua: 0,
    latasDeOleo: 0,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(addConsumoHabitual(1, consumoHabitual), {
      error: 'Não foi possível salvar',
      pending: 'Salvando...',
      success: 'Dados salvos com sucesso!',
    });
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
      <form
        onSubmit={handleSubmit}
        id='consumoHabitualForm'
      >
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
            id='frituras'
            name='frituras'
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
        </div>
        <Button
          type='submit'
          form='consumoHabitualForm'
        >
          Salvar
        </Button>
      </form>
    </>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  form: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className='bg-neutral-200'
      type={props.type}
      form={props.form}
    >
      {props.children}
    </button>
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
