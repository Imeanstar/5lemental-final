import pb from '@/api/pocketbase';
import MenuBox from '@/components/MenuBox';
import SearchInput from '@/components/SearchInput';
import useSearchLogStore from '@/store/searchLog';
import { useState } from 'react';
import { useEffect } from 'react';

function Search() {
  const searchLog = useSearchLogStore((state) => state.searchLog);
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
    [searchLog]
  );

  return (
    <div className="px-5 w-full max-w-[820px] m-auto mt-9">
      <SearchInput searchType="menu"></SearchInput>
      {cooksList
        .filter((item) => item.name === searchLog)
        .map((item, index) => (
          <MenuBox key={index} item={item} name={item.name} />
        ))}
    </div>
  );
}

export default Search;
