import IngredientItem from '@/components/IngredientItem';
import useCategoryStore from '@/store/category';
import pb from '@/api/pocketbase';
import { useEffect } from 'react';
import { useState } from 'react';

function RecipeDetail() {
  const selectedMenu = useCategoryStore((state) => state.selectedMenu);
  const [menuImage, setMenuImage] = useState('');
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    const getMenuImage = async () => {
      try {
        // PocketBase 에서 메뉴 이미지 가져오기
        const imageResponse = await pb
          .collection('cooks')
          .getList(1, 10, { filter: `name = "${selectedMenu}"` });
        setMenuImage(
          pb.files.getUrl(
            imageResponse.items[0],
            imageResponse.items[0].photo,
            {
              thumb: '80x80',
            }
          )
        );
      } catch (error) {
        console.error(error);
      }
    };
    getMenuImage();
  }, [selectedMenu]);

  useEffect(() => {
    const getMenuRecipe = async () => {
      try {
        // PocketBase 에서 메뉴 레시피 가져오기
        const imageResponse = await pb
          .collection('cooks')
          .getList(1, 10, { filter: `name = "${selectedMenu}"` });
        setRecipe(imageResponse.items[0].description);
      } catch (error) {
        console.error(error);
      }
    };
    getMenuRecipe();
  }, [selectedMenu]);

  return (
    <>
      <div className="wrapper w-screen h-full px-[16px] pt-[20px] -bg--fridge-white flex flex-wrap flex-col justify-center">
        <div className="container max-w-[820px] mx-auto mb-[70px] flex flex-col justify-center items-center">
          <div className="imageContainer max-w-[500px] flex justify-center mx-auto mb-[20px]">
            <img
              className=" rounded-[10px] flex justify-center items-center"
              src={menuImage}
              alt={selectedMenu}
            />
          </div>
          <IngredientItem />
          <div className="recipeContainer w-full mt-[14px] max-w-[500px] px-[15px] py-[20px] font-nanum font-semibold text-[14px] rounded-[10px] -bg--fridge-bg-gray">
            {recipe.split('\n').map((recipeLine, index) => (
              <p key={index}>{recipeLine}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetail;
