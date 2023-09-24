import IngredientButtonGaro from '../components/IngredientButtonGaro';
// import { NavBar } from '@/components/navBar/NavBar';

function MyFridge() {
  return (
    <div className='px-5 w-full max-w-[820px] m-auto'>
        <IngredientButtonGaro 
          ingredientName={'1'}
          print={'Fridge'}
        />
    </div>
  );
}

export default MyFridge;
