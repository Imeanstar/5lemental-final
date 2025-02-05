import { getPbImageURL } from '@/utils/getPbImageURL';
import client from '@/api/pocketbase';

export default function cookstItem({ item, user, stat }) {
  async function handle(stat, item, user) {
    //빼주기
    if (stat == 1) {
      // 서버 상태 업데이트
      // console.log('stat은 1 입니다.');
      try {
        await client.collection('users').update(user.id, {
          'ingredients_keys-': item.id,
        });
        // 앱 상태 업데이트
        // Zustand 사용자의 재료 변경사항을 화면에 반영
        // 재료 목록 삭제
        // removeUserIngredient(item.id);
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
        // 앱 상태 업데이트
        // Zustand 사용자의 재료 변경사항을 화면에 반영
        // 재료 목록 추가
        // addUserIngredient(item.id);
      } catch (error) {
        console.error(error);
      }
    }
  }

  console.log(item);

  return (
    <li
      key={item.id}
      onClick={() => {
        handle(stat, item, user);
      }}
    >
      <div className="bg-slate-600 float-left py-5">
        <figure className="h-16 w-16 float-left">
          <img src={getPbImageURL(item, 'photo')} alt="" />
          {/* <p src={getPbImageURL(item, 'description')} alt=""></p> */}
        </figure>
        <div className="bg-slate-700 w-36">
          <span className="bg-yellow-600 rounded-md w-20 flex justify-center">
            {item.name}
          </span>
          <span className="bg-blue-700 text-sm w-12 text-ellipsis overflow-hidden ...">
            {item.description}...
          </span>
        </div>
      </div>
    </li>
  );
}
