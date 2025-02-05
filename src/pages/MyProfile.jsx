import pb from '@/api/pocketbase';
import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuthStore from '@/store/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProfile() {
  const { user, signOut } = useAuthStore();
  console.log(user);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/myfridge');
  };

  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut().then(() => {
        toast.info('로그아웃 되었습니다.');
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleProfile = async () => {
      try {
        // PocketBase 에서 닉네임 가져오기
        const nameResponse = await pb
          .collection('users')
          .getList(1, 10, { filter: `id = "${user}"` });
        setProfileName(nameResponse.items[0].name);
        console.log(profileName);
      } catch (error) {
        console.error(error);
      }
    };
    handleProfile();
  }, [profileName, user]);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        // PocketBase 에서 프로필 이미지 가져오기
        const imageResponse = await pb
          .collection('users')
          .getList(1, 10, { filter: `id = "${user}"` });
        setProfileImage(
          pb.files.getUrl(
            imageResponse.items[0],
            imageResponse.items[0].avatar,
            {
              thumb: '80x80',
            }
          )
        );
        console.log(profileImage);
      } catch (error) {
        console.error(error);
      }
    };
    handleProfile();
  }, [profileImage, user]);

  return (
    <>
      <div className="wrapper px-[26px] pt-[25px] -bg--fridge-white flex flex-nowrap flex-col">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="container max-w-[400px] mx-auto flex flex-nowrap flex-col">
          <div className="topFridge bg-[#F5F5F5] rounded-t-[15px] mb-[15px] min-h-[123px] px-[22px] py-4 flex flex-nowrap justify-center items-center gap-[20px]">
            <img
              src={profileImage}
              alt="프로필"
              className="w-[80px] h-[80px] rounded-[10px]"
            />

            <div className="profileGreetings">
              <p className="font-nanum text-sm">
                <span className="font-bold mr-2">{profileName}</span>님,
              </p>
              <p className="text-xs">오늘도 즐거운 식사하세요!</p>
              <button
                onClick={handleNavigate}
                className="openFridge -bg--fridge-primary -text--fridge-white font-dohyeon rounded-[5px] text-[12px] pt-[7px] pb-[5px] px-[10px] mt-[13px]"
              >
                내 냉장고 열어보기
              </button>
            </div>
          </div>
          <div className="bottomFridge bg-[#F5F5F5] rounded-b-[15px] h-[268px] relative px-auto pt-[125px] pb-[55px]">
            <div className="FridgeHandle w-[14px] h-[75px] -bg--fridge-gray rounded-[15px] absolute top-[20px] right-[24px]"></div>
            <div className="buttonGroup flex flex-col items-center">
              <Button type="button" navigateTo="/recipeliked" small>
                좋아요 한 음식
              </Button>
              <Button type="button" navigateTo="/menulist" small>
                랜덤메뉴
              </Button>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="logOut text-right text-[10px] font-nanum mt-1 mr-1 decoration-solid underline"
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
