import { useNavigate } from 'react-router-dom';

function Start() {
  const navigate = useNavigate();
  const handleEntry = () => {
    navigate('signin');
  };
  return (
    <>
      <div
        className="wapper h-screen px-[26px] py-[52px] -bg--fridge-gray  flex flex-nowrap flex-col "
        onClick={handleEntry}
        onTouchEnd={handleEntry}
      >
        <div className="container max-w-[400px] mx-auto flex flex-nowrap flex-col">
          <div className="topFridge -bg--fridge-white rounded-t-[15px] mb-[15px] min-h-[205px] pt-[22px] ">
            <div className="titleContainer flex justify-center items-center flex-col h-full">
              <div className="postItContainer bg-[url('@/assets/images/postIt_start.png')] bg-no-repeat pt-5 pl-7">
                <h1 className="tracking-[0.2em] font-dohyeon text-[50px] -text--fridge-black ">
                  비우자
                </h1>
                <h1 className="tracking-[0.2em] font-dohyeon text-[50px] -text--fridge-black ">
                  냉장고
                </h1>
              </div>
            </div>
          </div>
          <div className="bottomFridge  -bg--fridge-white rounded-b-[15px] min-h-[244px] relative">
            <button className="FridgeHandle w-[14px] h-[52px] -bg--fridge-gray rounded-[15px] absolute top-[20px] right-[24px]"></button>
          </div>

          <p className="-text--fridge-nav-gray font-dohyeon text-[15px] block mt-[9px] mx-auto">
            화면을 터치해 냉장고를 열어주세요!
          </p>
        </div>
      </div>
    </>
  );
}

export default Start;
