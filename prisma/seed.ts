import pinheiro from '../src/data/pinheiro/measures.json';
import tacoList from '../src/data/taco/categoryList.json';
import tacoFood from '../src/data/taco/foodList.json';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let food of pinheiro) {
    await prisma.alimentoPinheiro.create({
      data: {
        description: food.description,
      },
    });
  }

  for (let i = 0; i < pinheiro.length; i++) {
    for (let k = 0; k < pinheiro[i].measures.length; k++) {
      await prisma.alimentoPinheiro.update({
        data: {
          measures: {
            create: {
              label: pinheiro[i].measures[k].label,
              qty: pinheiro[i].measures[k].qty,
            },
          },
        },
        where: {
          id: i + 1,
        },
      });
    }
  }

  for (let list of tacoList) {
    await prisma.categoriaTACO.create({
      data: {
        label: list.category,
      },
    });
  }

  // Para inserir os dados no banco, substituí as seguintes strings:
  // "NA" = -1
  // "*" = -2
  // "Tr" = -3
  for (let food of tacoFood) {
    await prisma.alimentoTACO.create({
      data: {
        description: food.description,
        base_qty: food.base_qty,
        base_unit: food.base_unit,
        categoriaTACOId: food.category_id,
        humidity: {
          create: {
            qty: food.humidity?.qty,
            unit: food.humidity?.unit,
          },
        },
        protein: {
          create: {
            qty: food.protein?.qty,
            unit: food.protein?.unit,
          },
        },
        lipid: {
          create: {
            qty: food.lipid?.qty,
            unit: food.lipid?.unit,
          },
        },
        cholesterol: {
          create: {
            qty: food.cholesterol?.qty,
            unit: food.cholesterol?.unit,
          },
        },
        carbohydrate: {
          create: {
            qty: food.carbohydrate?.qty,
            unit: food.carbohydrate?.unit,
          },
        },
        fiber: {
          create: {
            qty: food.fiber?.qty,
            unit: food.fiber?.unit,
          },
        },
        ashes: {
          create: {
            qty: food.ashes?.qty,
            unit: food.ashes?.unit,
          },
        },
        calcium: {
          create: {
            qty: food.calcium?.qty,
            unit: food.calcium?.unit,
          },
        },
        magnesium: {
          create: {
            qty: food.magnesium?.qty,
            unit: food.magnesium?.unit,
          },
        },
        phosphorus: {
          create: {
            qty: food.phosphorus?.qty,
            unit: food.phosphorus?.unit,
          },
        },
        iron: {
          create: {
            qty: food.iron?.qty,
            unit: food.iron?.unit,
          },
        },
        sodium: {
          create: {
            qty: food.sodium?.qty,
            unit: food.sodium?.unit,
          },
        },
        potassium: {
          create: {
            qty: food.potassium?.qty,
            unit: food.potassium?.unit,
          },
        },
        copper: {
          create: {
            qty: food.copper?.qty,
            unit: food.copper?.unit,
          },
        },
        zinc: {
          create: {
            qty: food.zinc?.qty,
            unit: food.zinc?.unit,
          },
        },
        retinol: {
          create: {
            qty: food.retinol?.qty,
            unit: food.retinol?.unit,
          },
        },
        thiamine: {
          create: {
            qty: food.thiamine?.qty,
            unit: food.thiamine?.unit,
          },
        },
        riboflavin: {
          create: {
            qty: food.riboflavin?.qty,
            unit: food.riboflavin?.unit,
          },
        },
        pyridoxine: {
          create: {
            qty: food.pyridoxine?.qty,
            unit: food.pyridoxine?.unit,
          },
        },
        niacin: {
          create: {
            qty: food.niacin?.qty,
            unit: food.niacin?.unit,
          },
        },
        saturated: {
          create: {
            qty: food.saturated?.qty,
            unit: food.saturated?.unit,
          },
        },
        monounsaturated: {
          create: {
            qty: food.monounsaturated?.qty,
            unit: food.monounsaturated?.unit,
          },
        },
        polyunsaturated: {
          create: {
            qty: food.polyunsaturated?.qty,
            unit: food.polyunsaturated?.unit,
          },
        },
        energy: {
          create: {
            kcal: food.energy?.kcal,
            kj: food.energy?.kj,
          },
        },
      },
    });
  }

  const tiposDeRefeicao = [
    'Desjejum',
    'Colação',
    'Almoço',
    'Lanche',
    'Jantar',
    'Ceia',
  ];

  for (let nome of tiposDeRefeicao) {
    await prisma.tipoDeRefeicao.create({
      data: {
        nome,
      },
    });
  }
}

main()
  .catch(err => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
