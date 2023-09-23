import pb from '@/api/pocketbase';
import MenuBox from '@/components/MenuBox';
import SearchInput from '@/components/SearchInput';
import useSearchLogStore from '@/store/search';
import { useState } from 'react';
import { useEffect } from 'react';

function Search() {
  const searchList = useSearchLogStore((state) => state.searchList);
  const [cooksList, setCooksList] = useState([]);

  useEffect(
    () =>
      async function fetchFoodList() {
        try {
          const cooksList = await pb.collection('cooks').getFullList({
            expand: 'key, description, user, image, summary',
          });
          setCooksList(cooksList); // 데이터를 data 상태 변수에 할당
        } catch (error) {
          console.log(error);
        }
      },
    []
  );

  return (
    <div className="px-5 w-full max-w-[820px] m-auto mt-9">
      <SearchInput searchType="menu"></SearchInput>
      {searchList.length > 0 ? (
        searchList.map((searchItem) =>
          cooksList
            .filter((item) => item.name === searchItem)
            .map((item, index) => (
              <MenuBox key={index} item={item} name={item.name} />
            ))
        )
      ) : (
        <div className="container flex justify-center w-full mt-5">
          <div className="text-center -bg--fridge-bg-gray rounded-3xl h-8 leading-8 text-sm px-3">
            흠.. 검색 결과가 없군요. 🧐
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
