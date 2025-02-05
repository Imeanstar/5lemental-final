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
    return <div className=' flex justify-center my-20'>
            <div className='text-center -bg--fridge-bg-gray rounded-3xl w-2/5 h-9 leading-9 text-base font-nanum'>
              로딩 중... 🏃🏻‍♀🏃🏻
            </div>
          </div>;
  }

  if (status === 'error') {
    return <div className=' flex justify-center my-20'>
            <div className='text-center -bg--fridge-bg-gray rounded-3xl w-2/5 h-9 leading-9 text-base font-nanum'>
              🧑🏻‍🔧서버 점검 중 입니다.👨🏻‍🔧<br/>
              불편을 드려 죄송합니다😞
            </div>
          </div>;
  }

  return (
    <>
      <div className="wrapper px-5 w-full max-w-[820px] m-auto h-full pt-[20px] -bg--fridge-white">
        <ul className="w-full flex flex-col gap-3 justify-center">
          {data.map((item) => (
            <MenuBox key={item.id} item={item} name={item.name} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecipeLiked;
