import pb from "@/api/pocketbase";
import { useState, useEffect } from "react";
import { getPbImageURL } from "@/utils/getPbImageURL"
import { Link } from "react-router-dom";
import useCategoryStore from '@/store/category';
import useAuthStore from '@/store/auth';

function BigMenuList() {
  // 전체 메뉴 정보
  const [menu, setMenu] = useState([]);
  const [ingreList, setIngreList] = useState([]);
  // 클릭한 메뉴를 담는 전역 상태
  const { setSelectedMenu } = useCategoryStore();
  const { user } = useAuthStore();
  let temp = 0;
  let user2 = [];

  // 메뉴 이름을 받아 전역상태의 selectedMenu 에 저장하는 함수
  const keepMenuName = (name) => {
    setSelectedMenu(name);
  };
  useEffect(() => {
    async function fetchList() {
      const userList = await pb.collection('users').getFullList();
          console.log(userList);
          userList.map((userArr)=>{
            if(userArr.id == user){
              user2 = userArr;
              console.log('user2 : ', user2);
              setIngreList(user2.ingredients_keys);
            }
          })

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
      menu.map((item) => {
        temp = 0;
        let ingreKeys = item.ingredients_keys;
          if(ingreKeys != 'undefined' && ingreKeys != null){
            ingreKeys.map((ingreKey) =>{
              ingreList.includes(ingreKey) ? temp = temp + 1 : temp = temp + 0;
            })
          }
          console.log('item : ', item);
          console.log('temp : ', temp);
        if(temp > 0 ){
          return(
          <div
            key={item.id}
            //! 여기!!! key={item}으로 하니까 이상하게 출력되는 이슈가 있었는데, item.id로 하니까 잘 출력이 되어요....
            //! 왜...... 결국 다른 item이면 다 item 다르고 같은 item이면 item.id도 같을텐데...
            className="w-[129px] h-[157px] my-[10px] mx-2"
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
          </div>
          )
        }
      
      }
      ))
}

export default BigMenuList;