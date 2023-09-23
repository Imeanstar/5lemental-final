import { getPbImageURL } from '@/utils/getPbImageURL';
import PocketBase from 'pocketbase';
import useStore from '../store/storeState';

const url = 'https://orimental-final.pockethost.io';
const client = new PocketBase(url);

//? item : 재료 정보 출력
//? user : 현재 회원 정보 출력(매번 출력되면 너무 소모값 클거같은데 처음 한번만 가져오게 할 수는 없을까)
//? stat : item재료를 user회원이 가지고 있는지 정보(가지고 있으면 1)
export default function IngredientItemGaro({ item, user, stat, print }) {
 /*  console.log('item : ',item);
  console.log('user : ',user);
  console.log('stat : ',stat);
  console.log('print : ',print); */
  const changeStateOfCartItem = useStore(
    (state) => state.changeStateOfCartItem
  );
  // console.log('user : ', user);
  async function handle(handleStat) {
    
    try {
      await client.collection('users').update(user, {
        [`ingredients_keys${handleStat === 0 ? '+' : '-'}`]: item.id,
      });
      changeStateOfCartItem(item.id, handleStat ? 0 : 1);

      // handleStat === 0 ? removeUserIngredient(item.id) : addUserIngredient(item.id)
    } catch (error) {
      console.error(error);
    }
  }
  
  if(print=='Fridge'){
    return (
      //! 버튼으로 바꿔주기. 지금은 접근성 이슈 있음
    <button>
        <li
        key={item.id}
        className="-bg--fridge-bg-gray w-[133px] h-[77px] rounded-xl flex flex-row items-center my-[7px]"
      >
        <figure>
          <img
            src={getPbImageURL(item, 'photo')}
            className="w-12 h-12 ml-2"
            alt=""
          />
          {/* <span>{item.name}</span> */}
        </figure>
        <div className="w-20 w- flex flex-row justify-center font-dohyeon">
          <span>{item.name}</span>
        </div>
      </li>
    </button> 
    );
  }
  else{
    return (
      //! 버튼으로 바꿔주기. 지금은 접근성 이슈 있음
      stat ? (
        <li
          key={item.id}
          className="-bg--fridge-skyblue w-[133px] h-[77px] rounded-xl flex flex-row items-center"
          onClick={() => {
            console.log('stat : ', stat);
            handle(stat);
          }}
        >
          <div className='flex flex-row items-center justify-center'>
            <figure>
              <img
                src={getPbImageURL(item, 'photo')}
                className="w-12 h-12 ml-2"
                alt=""
              />
              {/* <span>{item.name}</span> */}
            </figure>
            <div className="w-20 flex flex-row justify-center font-dohyeon">
              <span>{item.name}</span>
            </div>
          </div>
        </li>
      ) : (
        <li
          key={item.id}
          className="-bg--fridge-bg-gray w-[133px] h-[77px] rounded-xl flex flex-row items-center"
          onClick={() => {
            console.log('stat : ', stat);
            handle(stat);
          }}
        >
          <div className='flex flex-row items-center justify-between'>
            <figure>
              <img
                src={getPbImageURL(item, 'photo')}
                className="w-12 h-12 ml-2"
                alt=""
              />
              {/* <span>{item.name}</span> */}
            </figure>
            <div className="w-20 flex flex-row justify-center font-dohyeon">
              <span>{item.name}</span>
            </div>
          </div>
          
        </li>
      )
    );
  }
  
  }
  
