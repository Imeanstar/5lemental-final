import CategoryButton from '@/components/categoryButton/CategoryButton';
import useCategoryStore from '@/store/category';
import { useState } from 'react';
import { useEffect } from 'react';
import pb from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import Like from '@/components/like/Like';
import useLikeStore from '@/store/like';
import useAuthStore from '@/store/auth';

function MenuList() {
  const id = useAuthStore((state) => state.id);
  const { category, getMenu, setSelectedMenu } = useCategoryStore();
  const {
    likedMenuList,
    likedMenuKeyList,
    getLikeList,
    setLikeList,
    getLikeKeyList,
    setLikeKeyList,
  } = useLikeStore();

  const [menuNameList, setMenuNameList] = useState([]);
  const [fileNameList, setFileNameList] = useState([]);
  const [imageList, setImageList] = useState([]);

  const keepMenuName = (name) => {
    setSelectedMenu(name);
  };

  useEffect(() => {
    getMenu(category).then((res) => {
      const names = res.map((item) => item.name);
      setMenuNameList(names);
    });
  }, [category]);

  useEffect(() => {
    getMenu(category).then((res) => {
      const fileNames = res.map((item) => item.photo);
      setFileNameList(fileNames);
    });
  }, [category]);

  useEffect(() => {
    getMenu(category).then((res) => {
      const images = res.map((item) =>
        pb.files.getUrl(item, item.photo, {
          thumb: '130x130',
        })
      );
      setImageList(images);
    });
  }, [category]);

  // 현 user 의 좋아요 메뉴 list 가져오기
  useEffect(() => {
    getLikeList(id).then((res) => {
      const likes = res.map((item) => item.name);
      setLikeList(likes);
    });
  }, []);

  useEffect(() => {
    getLikeKeyList(id).then((res) => {
      const keys = res.map((item) => item);
      console.log('keys', keys);
      setLikeKeyList(keys);
    });
  }, []);

  // 좋아요 메뉴 list 확인
  useEffect(() => {
    console.log(likedMenuList);
  }, [likedMenuList]);

  useEffect(() => {
    console.log(likedMenuKeyList);
  }, [likedMenuKeyList]);

  return (
    <>
      <CategoryButton />
      <div className="wrapper w-screen h-full px-[16px] pt-[20px] -bg--fridge-white flex ">
        <div className="container max-w-[820px] mx-auto mb-[70px] flex flex-wrap flex-row gap-[20px] justify-center items-start">
          {menuNameList.map((name, index) => (
            <div
              key={index}
              className="linkWrapper relative w-[130px] h-[157px]"
            >
              <Link to="/recipedetail" onClick={() => keepMenuName(name)}>
                {imageList[index] && (
                  <img
                    className="w-[130px] h-[130px] rounded-[10px]"
                    src={imageList[index]}
                    alt={name}
                  ></img>
                )}
                <p className="inline-block rounded-[10px] mt-[5px] px-[10px] pt-[5px] pb-[4px] -bg--fridge-skyblue font-dohyeon text-[11px]">
                  {name}
                </p>
              </Link>
              <div className="buttonContainer w-5 h-5 absolute right-0 bottom-0">
                <Like menuName={name} isLiked={likedMenuList.includes(name)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuList;
