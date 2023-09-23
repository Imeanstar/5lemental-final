import { arrowLeft } from '@/assets/icons/svg-icons.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCategoryStore from '@/store/category';

function Heading() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const selectedMenu = useCategoryStore((state) => state.selectedMenu);

  useEffect(
    () => (pathname === '/signup' ? setTitle('회원가입') : undefined),
    [pathname]
  );

  useEffect(
    () => (pathname === '/home' ? setTitle('메뉴 찾기') : undefined),
    [pathname]
  );

  useEffect(
    () =>
      pathname === '/fridgemenu'
        ? setTitle('내 냉장고를 비워줄 메뉴')
        : undefined,
    [pathname]
  );

  useEffect(
    () => (pathname === '/myprofile' ? setTitle('프로필') : undefined),
    [pathname]
  );

  useEffect(
    () =>
      pathname === '/addingredients'
        ? setTitle('내 냉장고 재료 추가하기')
        : undefined,
    [pathname]
  );

  useEffect(
    () =>
      pathname === '/recipeliked' ? setTitle('좋아요 누른 레시피') : undefined,
    [pathname]
  );

  useEffect(
    () => (pathname === '/myfridge' ? setTitle('내 냉장고') : undefined),
    [pathname]
  );

  useEffect(
    () => (pathname === '/menulist' ? setTitle('오늘 뭐먹지?') : undefined),
    [pathname]
  );

  useEffect(
    () => (pathname === '/recipedetail' ? setTitle(selectedMenu) : undefined),
    [pathname, selectedMenu]
  );

  useEffect(
    () => (pathname === '/search' ? setTitle('') : undefined),
    [pathname]
  );

  useEffect(
    () => (pathname === '/searchresult' ? setTitle('') : undefined),
    [pathname]
  );

  if (pathname === '/' || pathname === '/signin') {
    return null;
  }

  return (
    <>
      <header className="w-screen flex justify-center items-center fixed top-0 left-0 -bg--fridge-white pb-4 z-[1000]">
        <div className="wrapper max-w-[820px] w-full m-auto pt-[20px] relative flex justify-center items-center">
          <button
            className="w-[20px] h-[20px] absolute left-[20px] top-[20px]"
            onClick={() => navigate(-1)}
          >
            <img className="w-full h-full" src={arrowLeft} alt="뒤로가기" />
          </button>
          <h1 className="font-dohyeon -text--fridge-black text-[20px]">
            {title}
          </h1>
        </div>
      </header>
    </>
  );
}

export default Heading;
