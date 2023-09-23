import IngredientButtonGaro from '../components/IngredientButtonGaro';
// import { NavBar } from '@/components/navBar/NavBar';

function MyFridge() {
  return (
    <div className="max-w-[820px] m-auto min-w-[320px]">
      <div className='h-5'></div>
      <div className="h-[430px] overflow-y-scroll max-w-[820px] m-auto min-w-[320px]">
        <IngredientButtonGaro 
        ingredientName={'1'}
        print={'Fridge'}
      ></IngredientButtonGaro>
      </div>

      {/* <NavBar></NavBar> */}
    </div>
  );
}

export default MyFridge;
