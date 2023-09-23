import IngredientButtonGaro from '@/components/IngredientButtonGaro';
import { useState, useRef } from 'react';
import  Button  from '@/components/button/Button';

function AddIngredients() {
  const Add = 'Add';
  const inputRef = useRef(null);
  console.log(inputRef);
  const [inputValue, setInputValue] = useState('');


  return (  
    <div className='px-5 w-full max-w-[820px] m-auto'>
      {/* 검색창 컴포넌트 */}
      <div className="flex mt-6 relative">
        <input
          type='text'
          role='searchbox'
          placeholder='재료를 검색해주세요.'
          className="w-full h-7 pl-1 placeholder:-text--fridge-input-gray font-nanum border-b-2 -border--fridge-gray focus:outline-none"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { setInputValue(inputRef.current.value) }
          }}
        />
        <button
          type='button'
          className="w-5 h-5 bg-search-icon my-auto ml-2 absolute right-[1%]"
          onClick={(e) => {
            e.preventDefault();
            setInputValue(inputRef.current.value);
          }}
          aria-label='검색'
          >
        </button>
      </div>
      <div className="mt-4">
        <IngredientButtonGaro
          ingredientName={inputValue}
          print={Add}
        ></IngredientButtonGaro>
        {/* 여기서 page전달 -> button에서 Add면 전체 출력, Fridge면 보유한 것만 출력하도록 -> item에서 Add면 누르게, Fridge면 못누르게 */}
      </div>
      <div className='items-center flex flex-row mx-[21px]'>
        <Button type="button" navigateTo="-1">재료 추가</Button>
      </div>
    </div>
  );
}

export default AddIngredients;
