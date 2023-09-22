import pb from '@/api/pocketbase';
import useSearchLogStore from '@/store/searchLog';
import { useState, useEffect, useRef } from 'react';

// 다른 컴포넌트에서 가져올 때 아래의 { } 안에 쓰는 것이다. 저장된 정보를 MenuBox 컴포넌트에
function SearchInput({ searchType }) {
  // 검색 필드 요소 참조
  const inputRef = useRef('');
  // 검색 요소 집합 ( 서버에서 데이터 가져오기 )
  const [cooks, setCooks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  // 검색된 결과 집합 ( 사용자 검색 요청 시 처리 )
  const [searchResult, setSearchResult] = useState([]);
  // 검색 여부
  const [isSearched, setIsSearched] = useState(false);

  const { searchLog, setSearchLog } = useSearchLogStore();

  useEffect(() => {
    async function fetchList() {
      try {
        const list =
          searchType === 'menu'
            ? await pb.collection('cooks').getFullList()
            : await pb.collection('ingredients').getFullList();

        searchType === 'menu'
          ? setCooks(list.map((cook) => cook.name))
          : setIngredients(list.map((ingredient) => ingredient.name));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchList();
  }, [searchType]);

  const toggleInputSearch = () => {
    const searchTerm = inputRef.current.value.trim();

    if (searchTerm) {
      setSearchResult(
        searchType === 'menu'
          ? cooks.filter((cook) => cook.includes(searchTerm))
          : ingredients.filter((ingredient) => ingredient.includes(searchTerm))
      );
      setIsSearched(true);
      inputRef.current.value = '';
    } else {
      setSearchResult([]);
    }
  };

  const handleInputSearch = () => {
    const searchValue = inputRef.current.value;
    setSearchLog(searchValue);
    toggleInputSearch();
  };

  useEffect(() => {
    console.log(searchLog);
  }, [searchLog]);

  return (
    <>
      <div className="flex mt-6 relative">
        <input
          type="text"
          role="searchbox"
          placeholder={
            searchType === 'menu'
              ? '메뉴를 검색해주세요.'
              : '재료를 검색해주세요.'
          }
          className="w-full h-7 pl-1 placeholder:-text--fridge-input-gray font-nanum border-b-2 -border--fridge-gray focus:outline-none"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleInputSearch();
            }
          }}
        />
        <button
          type="button"
          className="w-5 h-5 bg-search-icon my-auto ml-2 absolute right-[1%]"
          onClick={handleInputSearch}
          aria-label="검색"
        ></button>
      </div>
      <div className="mt-4">
        {searchResult.length > 0
          ? searchResult.sort().map((cook, index) => (
              <ul key={index} className="ml-5 text-sm">
                <li>{cook}</li>
              </ul>
            ))
          : isSearched && (
              <div className="text-center mt-9">검색 결과가 없습니다.</div>
            )}
      </div>
    </>
  );
}

export default SearchInput;
