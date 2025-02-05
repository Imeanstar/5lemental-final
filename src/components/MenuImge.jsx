import pb from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import MenuImgeitem from '@/components/MenuImgeitem';
import { ClientResponseError } from 'pocketbase';

function FoodlistButton() {
  const [data, setData] = useState([]); // 상태 변수 이름을 data로 변경
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    setStatus('loading');
    async function fetchFoodList() {
      try {
        const userList = await pb.collection('cooks').getFullList({
          expand: 'key, description, user, image',
        });
        setData(userList); // 데이터를 data 상태 변수에 할당
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
    <div className=" bg-slate-400">
      <ul className="bg-sky-300">
        {data.map((item) => (
          <MenuImgeitem
            key={item.id}
            item={item}
            // menu={item.description}
            // user={item.user}
            // image={item.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default FoodlistButton;
