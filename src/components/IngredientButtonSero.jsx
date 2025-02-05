import pb from '@/api/pocketbase';
import { useState, useEffect } from "react";
import { getPbImageURL } from "@/utils/getPbImageURL"
import useAuthStore from '@/store/auth';
// 스와이퍼
import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom';

function IngredientButtonSero () {
  // 내 재료 정보
  const [myIngredient, setMyIngredient] = useState([]);
  // 유저 정보
  const { user } = useAuthStore();
  const [status, setStatus] = useState('pending');
  console.log(user);

  useEffect(() => {
    setStatus('loading');
    async function fetchList() {
      try {
        // PocketBase 에서 나의 재료 정보 불러오기
        const loginUser = await pb.collection('users').getOne(user, {
          expand: 'ingredients_keys',
        });
        console.log(
          'expand.ingredients_keys\n',
          loginUser.expand.ingredients_keys
        );
        setMyIngredient(loginUser.expand.ingredients_keys);
        setStatus('success'); // 데이터 로드가 완료되면 success 상태로 변경
      }
      catch (error) {
        console.error('Error fetching data:', error);
        setStatus('error'); // 데이터 로드 중 오류가 발생하면 error 상태로 변경
      }
    }
    fetchList();
  }, []);

  if (status === 'loading') {
    return <div className=' flex justify-center my-5'>
            <div className='text-center -bg--fridge-bg-gray rounded-3xl px-6 py-3 text-base font-nanum'>
              🍖🥬 냉장고에 뭐 있더라? 🥔🥓🥚
            </div>
          </div>;
  }

  if (status === 'error') {
    return <div className=' flex justify-center my-5'>
            <div className='text-center -bg--fridge-bg-gray rounded-3xl p-4 leading-9 text-base font-nanum'>
              🧑🏻‍🔧서버 점검 중 입니다 👨🏻‍🔧<br/>
              불편을 드려 죄송합니다😞
            </div>
          </div>;
  }

  return(
    <Swiper
      slidesPerView='auto'
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode]}
      className="pt-[6px] pb-3"
    >
      {myIngredient === undefined ? (
        <Link to='/addingredients' className='flex justify-center'>
          <div className='text-center -bg--fridge-bg-gray rounded-3xl text-base p-5'>
            클릭하여 재료를 추가해보세요!🧐
          </div>
        </Link>
      ) : (
      myIngredient.map((item) => (
        <SwiperSlide
          className="w-[78px] h-[95px] -bg--fridge-bg-gray border-none rounded-md flex flex-col justify-center self-center"
          key={item.id}>
          <div className="w-[62px] h-[62px] items-center mx-2">
            <img
              src={getPbImageURL(item,'photo')}
              alt={item.name}
              className='mx-auto'
            />
          </div>
          <span className="font-dohyeon text-[12px] text-center mt-[6px]">
            {item.name}
          </span>
        </SwiperSlide>
      ))
      )}
    </Swiper>
  );
}

export default IngredientButtonSero