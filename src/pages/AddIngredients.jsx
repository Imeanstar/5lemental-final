import IngredientButtonGaro from '@/components/IngredientButtonGaro';
import { useState, useRef } from 'react';
import  Button  from '@/components/button/Button';

function AddIngredients() {
  const Add = 'Add';
  const inputRef = useRef(null);
  console.log(inputRef);
  const [inputValue, setInputValue] = useState('');


  return (  
    <div className="h-screen max-w-[820px] m-auto">
      <div className='flex mt-10 ml-[20px] relative '>
        <input
          type='text'
          role='searchbox'
          placeholder={'재료를 검색해주세요.'}
          className="w-11/12 h-7 pl-1 placeholder:-text--fridge-input-gray font-nanum border-b-2 -border--fridge-gray focus:outline-none"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { setInputValue(inputRef.current.value) }
          }}
        />
        <button
          type='button'
          className='w-5 h-5 bg-search-icon my-auto ml-2 absolute right-[9%]'
          onClick={(e) => {
            e.preventDefault();
            setInputValue(inputRef.current.value);
          }}
          aria-label='검색'
          >
        </button>
      </div>
      <div className='h-[10px]'></div>
      <div className="w-screen h-3/5 overflow-y-scroll max-w-[820px] m-auto min-w-[320px]">
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
