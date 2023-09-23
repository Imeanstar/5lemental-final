import useCategoryStore from '@/store/category';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { Link } from 'react-router-dom';

function MenuBox({ item, name }) {
  const { setSelectedMenu } = useCategoryStore();

  const keepMenuName = (name) => {
    setSelectedMenu(name);
  };

  console.log(item);
  return (
    <Link to="/recipedetail" onClick={() => keepMenuName(name)}>
      <li
        key={item.id}
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
          <span className="font-nanum ml-1 text-[12px] mt-1">
            {item.summary}
          </span>
        </div>
      </li>
    </Link>
  );
}

export default MenuBox;
