import { getPbImageURL } from '@/utils/getPbImageURL';
import client from '@/api/pocketbase';

function MenuBox({ item, user, stat }) {
  async function handle(stat, item, user) {
    //빼주기
    if (stat == 1) {
      // 서버 상태 업데이트
      // console.log('stat은 1 입니다.');
      try {
        await client.collection('users').update(user.id, {
          'ingredients_keys-': item.id,
        });
      } catch (error) {
        console.error(error);
      }
    }
    //더해주기
    else if (stat == 0) {
      // console.log('stat은 0 입니다.');
      try {
        await client.collection('users').update(user.id, {
          'ingredients_keys+': item.id,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  // console.log(item);

  return (
    <li
      key={item.id}
      onClick={() => {
        handle(stat, item, user);
      }}
      className="px-[15px] pt-[11px] pb-[12px] mb-2 -bg--fridge-bg-gray rounded-[10px] h-[94px] gap-[14px] flex justify-start"
    >
      <div className="figureWrapper">
        <figure className="w-[70px] h-[70px]">
          <img
            src={getPbImageURL(item, 'photo')}
            alt=""
            className="w-[70px] h-[70px] rounded-[10px]"
          />
        </figure>
      </div>
      <div className="descriptionWrapper flex flex-col pb-3">
        <div className="nameContainer">
          <span className="inline-block -bg--fridge-white text-[12px] rounded-[15px] font-dohyeon px-[19px] pt-[4px] pb-[2px]">
            {item.name}
          </span>
        </div>
        <span className="font-nanum ml-1 text-[12px] mt-1">{item.summary}</span>
      </div>
    </li>
  );
}

export default MenuBox;
