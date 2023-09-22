import pb from '@/api/pocketbase';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuthStore from '@/store/auth';
import BigMenuButton from '@/components/BigMenuButton';
function BigMenuList(){

  const { user } = useAuthStore();
  let user2 = [];
  const [cooksList, setCooksList] = useState([]);
  const [ingreList, setIngreList] = useState([]);


  useEffect(() => {
    async function getCookList() {
      const userList = await pb.collection('users').getFullList();
      console.log(userList);
      userList.map((userArr)=>{
        if(userArr.id == user){
          user2 = userArr;
          console.log('user2 : ', user2);
          setIngreList(user2.ingredients_keys);
        }
      })

        // PocketBase 에서 닉네임 가져오기
      const cookList = await pb.collection('cooks').getFullList();
      console.log(cookList);
      setCooksList(cookList);
    }
    getCookList();
  }, []);

  cooksList.map((cook)=>{
    let tmp = 0;
    let cookIngre = cook.ingredients_keys;
    cookIngre.map((ingre)=>{
      ingreList.includes(ingre) ? tmp+0 : tmp+1;
    })
    if(tmp <= 1){
      // 컴포넌트 출력
      return(
        <BigMenuButton key={cook.id} cook={cook}></BigMenuButton>   
      )
      
    }
  })

}

export default BigMenuList;