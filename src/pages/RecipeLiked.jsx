import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import { ClientResponseError } from 'pocketbase';
import MenuBox from '@/components/MenuBox';

function RecipeLiked() {
  const [data, setData] = useState([]); // 상태 변수 이름을 data로 변경
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    setStatus('loading');
    async function fetchFoodList() {
      try {
        const cooksList = await pb.collection('cooks').getFullList({
          expand: 'key, description, user, image, summary',
        });
        setData(cooksList); // 데이터를 data 상태 변수에 할당
        console.log(data);

        setStatus('success'); // 데이터 로드가 완료되면 success 상태로 변경
      } catch (error) {
        if (!(error instanceof ClientResponseError)) {
          console.error('Error fetching data:', error);
          setStatus('error'); // 데이터 로드 중 오류가 발생하면 error 상태로 변경
        }
      }
    }

    fetchFoodList();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="wrapper px-5 w-full max-w-[820px] m-auto h-full pt-[20px] -bg--fridge-white flex flex-wrap flex-col justify-center">
        <div className="container w-full max-w-[500px] mx-auto flex flex-col justify-center items-center">
          <ul className="w-full">
            {data.map((item) => (
              <MenuBox key={item.id} item={item} name={item.name} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RecipeLiked;
