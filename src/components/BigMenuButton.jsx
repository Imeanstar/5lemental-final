//! 임시 컴포넌트 입니다. 최종 배포시 삭제 예정.

import { useState, useEffect } from "react";
import { getPbImageURL } from "@/utils/getPbImageURL"
import { Link } from "react-router-dom";

function BigMenuButton(cook) {
  // 전체 메뉴 정보
  const [menu, setMenu] = useState([]);

  setMenu(cook);

  console.log(menu);
  return (
    <div className=" flex flex-wrap gap-4 ">
        <div key={cook.id}>
          <Link to="/recipedetail">
            <img
              src={getPbImageURL(cook,'photo')}
              alt="{item.name}"
              className="w-full h-[131px] rounded-[10px]"
            />
            <p className="inline-block rounded-[10px] mt-[5px] px-[10px] pt-[5px] pb-[4px] -bg--fridge-skyblue font-dohyeon text-[11px]">
              {cook.name}
            </p>
          </Link>
        </div>
    </div>
      
  );
}

export default BigMenuButton;

//   cooksList.map((cook)=>{
//     <BigMenuItem cook={cook}></BigMenuItem>
//   })