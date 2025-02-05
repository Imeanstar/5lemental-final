import useCategoryStore from '@/store/category';
import { getPbImageURL } from '@/utils/getPbImageURL';
import { Link } from 'react-router-dom';

function MenuBox({ item, name }) {
  const { setSelectedMenu } = useCategoryStore();

  const keepMenuName = (name) => {
    setSelectedMenu(name);
  };

  return (
    <Link to="/recipedetail" onClick={() => keepMenuName(name)}>
      <li
        key={item.id}
        className="px-[15px] py-3 -bg--fridge-bg-gray rounded-[10px] gap-[14px] flex justify-start"
      >
        <div className="figureWrapper">
          <figure className="w-[70px] h-[70px]">
            <img
              src={getPbImageURL(item, 'photo')}
              alt={item.name}
              className="object-cover w-[70px] h-[70px] rounded-[10px]"
            />
          </figure>
        </div>
        <div className="descriptionWrapper flex flex-col pb-3">
          <div className="nameContainer">
            <span className="inline-block -bg--fridge-white text-[15px] leading-6 rounded-[15px] font-dohyeon px-[19px]">
              {item.name}
            </span>
          </div>
          <span className="font-nanum ml-2 mt-2 text-[13px]">
            {item.summary}
          </span>
        </div>
      </li>
    </Link>
  );
}

export default MenuBox;
