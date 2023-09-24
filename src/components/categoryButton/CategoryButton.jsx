import S from './CategoryButton.module.css';
import useCategoryStore from '@/store/category';

function CategoryButton() {
  const { category, setCategory } = useCategoryStore();

  const handleSelect = (category) => {
    setCategory(category);
  };

  return (
    <>
      <div className="wrapper m-auto flex flex-col justify-start items-center mt-[20px]">
        <div className="container flex justify-center items-center gap-2">
          <button
            onClick={() => {
              handleSelect('한식');
            }}
            className={category === '한식' ? S.selected : S.notSelected}
          >
            한식
          </button>
          <button
            onClick={() => {
              handleSelect('일식');
            }}
            className={category === '일식' ? S.selected : S.notSelected}
          >
            일식
          </button>
          <button
            onClick={() => {
              handleSelect('중식');
            }}
            className={category === '중식' ? S.selected : S.notSelected}
          >
            중식
          </button>
          <button
            onClick={() => {
              handleSelect('양식');
            }}
            className={category === '양식' ? S.selected : S.notSelected}
          >
            양식
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoryButton;
