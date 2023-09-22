import IngredientButtonSero from '@/components/IngredientButtonSero';
import SearchInput from '@/components/SearchInput';
import SeeAll from '@/components/SeeAll';
import Title from '@/components/Title';
import Button from '@/components/button/Button';
import FridgeMenu from './FridgeMenu';

function Home() {

  return(
    <div className='px-5 w-full max-w-[820px] m-auto'>
      <SearchInput searchType='menu'></SearchInput>
      <Title size='base' contents='내 재료'/>
      <IngredientButtonSero></IngredientButtonSero>
      <div className='flex justify-between'>
        <Title size='xl' contents='오늘 뭐 먹지?'/>
        <SeeAll/>
      </div>
      <Button type='button'>
        내 냉장고 속 재료로 요리하기
      </Button>
    </div>
  )
}

export default Home;