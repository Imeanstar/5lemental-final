import pb from "@/api/pocketbase";
import { useState, useEffect } from "react";
import { getPbImageURL } from "@/utils/getPbImageURL"
import { Link } from "react-router-dom";
import useCategoryStore from '@/store/category';
// 스와이퍼
import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

function MenuItem() {
  // 전체 메뉴 정보
  const [menu, setMenu] = useState([]);
  // 클릭한 메뉴를 담는 전역 상태
  const { setSelectedMenu } = useCategoryStore();


  // 메뉴 이름을 받아 전역상태의 selectedMenu 에 저장하는 함수
  const keepMenuName = (name) => {
    setSelectedMenu(name);
  };

  useEffect(() => {
    async function fetchList() {
      try {
        // 전체 메뉴 정보 불러오기
        const list = await pb.collection('cooks').getFullList();
        setMenu(list)
        console.log(list)
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchList();
  }, []);

  return (
    <Swiper
    slidesPerView='auto'
    spaceBetween={5}
    freeMode={true}
    modules={[FreeMode]}
    className="py-3"
    >
      {menu.map((item) => (
        <SwiperSlide
          key={item}
          className="w-[133px] h-[157px]"
        >
          <Link
            to="/recipedetail"
            onClick={() => keepMenuName(item.name)}
          >
            <img
              src={getPbImageURL(item,'photo')}
              alt="{item.name}"
              className="w-full h-[131px] rounded-[10px]"
            />
            <p className="inline-block rounded-[10px] mt-[5px] px-[10px] pt-[5px] pb-[4px] -bg--fridge-skyblue font-dohyeon text-[11px]">
              {item.name}
            </p>
          </Link>
        </SwiperSlide>
      ))}
      </Swiper>
  );
}

export default MenuItem;