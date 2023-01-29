import { Tab } from '@headlessui/react';
import React, { useContext, useState } from 'react';
import ConsumoAlimentar24h from './ConsumoAlimentar24h';
import ConsumoAlimentarHabitual from './ConsumoAlimentarHabitual';
import { PacienteContext } from '../context/PacienteContext';
import PlanoDietetico2 from './PlanoDietetico2';

export default function Tabs() {
  const { setTab } = useContext(PacienteContext);
  let [categories] = useState({
    'Plano dietético': [
      {
        id: 1,
        component: <PlanoDietetico2 />,
      },
    ],
    'Consumo alimentar habitual': [
      {
        id: 1,
        component: <ConsumoAlimentarHabitual />,
      },
    ],
    'Consumo alimentar 24h': [
      {
        id: 1,
        component: <ConsumoAlimentar24h />,
      },
    ],
  });
  return (
    <div className='mx-auto w-full max-w-5xl p-2 sm:px-0'>
      <Tab.Group onChange={setTab}>
        <Tab.List className='flex space-x-1 rounded-xl bg-sky-600 p-1'>
          {Object.keys(categories).map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 font-medium leading-5 text-sky-900',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((items, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames('rounded-xl bg-white py-3', 'focus:outline-none')}
            >
              {items.map(item => (
                <div key={item.id}>{item.component}</div>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
