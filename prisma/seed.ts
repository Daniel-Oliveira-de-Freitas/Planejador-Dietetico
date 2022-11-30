import pinheiro from '../src/data/pinheiro/measures.json';
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
}

main()
  .catch(err => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
