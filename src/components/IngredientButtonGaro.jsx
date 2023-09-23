// import './styles/tailwind.css';
import useAuthStore from '@/store/auth';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import IngredientItemGaro from './IngredientItemGaro';
import useStore from '@/store/storeState';

const url = 'https://orimental-final.pockethost.io';
const client = new PocketBase(url);

function IngredientButtonGaro({ingredientName, print}) {
  const { user } = useAuthStore();
  // 사용자 정보 상태
  const [user1, setUser] = useState([]);
  const [status, setStatus] = useState('pending');

  // Zustand 상태 및 업데이트 함수
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  let user2 = [];
  useEffect(() => {
    setStatus('loading');

    async function getIngredientList() {
      const ingredientList = await client
        .collection('ingredients')
        .getFullList();

      const userList = await client.collection('users').getFullList();
      userList.map((userArr)=>{
        if(userArr.id == user){
          user2 = userArr;
        }
      })

      // ingredientList 배열 순환 및 Zustand의 cart 상태 업데이트
      setCart(
        ingredientList.map((ingredient) => {
          let hasId;
          for (const id of user2.ingredients_keys) {
            hasId = id === ingredient.id;
            if (hasId) break;
          }
          return { ...ingredient, stat: hasId ? 1 : 0 };
        })
      );

      // 사용자 정보 업데이트
      setUser(user2);
      setStatus('pending');
    }

    getIngredientList();
  }, [setCart]);

  if (status === 'loading') {
    return <div>loading</div>;
  }


if(print == 'Fridge'){
    console.log(111);
    return (
      <div>
        <ul className="flex flex-wrap justify-center gap-4 mt-6">
          {cart?.map((ingredient) => {
            if((ingredient.id != 'undefined') && (user1.ingredients_keys != 'undefined') && (ingredient.id != null) && (user1.ingredients_keys != null)){
              let ingreid = ingredient.id;
              let useringreid = user1.ingredients_keys;
              if(useringreid.includes(ingreid)){
                return (
                  <IngredientItemGaro
                    key={ingredient.id}
                    item={ingredient}
                    user={user}
                    stat={ingredient.stat}
                    print={print}
                    />
                )
              } 
            }
            
            })}
          </ul>
        </div>
      );
}
else{
  /* console.log(user); */
    return (
      <div>
        <ul className="flex flex-wrap gap-2 justify-around">
          {cart?.map((ingredient) => {
            if (ingredient.name.includes(ingredientName)) {
              return (
                <IngredientItemGaro
                  key={ingredient.id}
                  item={ingredient}
                  user={user}
                  stat={ingredient.stat}
                  print={print}
                />
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default IngredientButtonGaro;
