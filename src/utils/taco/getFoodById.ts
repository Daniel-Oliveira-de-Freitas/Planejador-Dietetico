import foodList from '../../data/taco/foodList.json';

const getFoodById = (foodId: number) => {
  return foodList.filter(food => food.id.toString() === foodId.toString());
};

export default getFoodById;
