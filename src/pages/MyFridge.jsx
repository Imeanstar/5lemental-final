import IngredientButtonGaro from '../components/IngredientButtonGaro';

function MyFridge() {
  return (
    <div className='w-full max-w-[820px] m-auto'>
        <IngredientButtonGaro 
          ingredientName={'1'}
          print={'Fridge'}
        />
    </div>
  );
}

export default MyFridge;
