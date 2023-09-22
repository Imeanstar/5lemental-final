import { heartLine, heartFill } from '@/assets/icons/svg-icons.js';
import useAuthStore from '@/store/auth';
import useLikeStore from '@/store/like';

function Like({ menuName = '', isLiked = false }) {
  const user = useAuthStore((state) => state.user);
  const {
    addLikedMenu,
    removeLikedMenu,
    getLikedMenuKey,
    addToPocketBase,
    removeFromPocketBase,
  } = useLikeStore();

  // 좋아요 버튼 클릭 시 마다 zustand 및 pocketbase 의 좋아요 메뉴 list 업데이트
  const handleLikeList = (isLiked) => {
    if (isLiked) {
      removeLikedMenu(menuName);
      getLikedMenuKey(menuName).then(() => {
        removeFromPocketBase(user, menuName);
      });
      isLiked = false;
    } else {
      addLikedMenu(menuName);
      getLikedMenuKey(menuName).then(() => {
        addToPocketBase(user, menuName);
      });
      isLiked = true;
    }
  };

  return (
    <>
      <button type="button" onClick={() => handleLikeList(isLiked)}>
        <img src={isLiked ? heartFill : heartLine} alt="" className="w-5 h-5" />
      </button>
    </>
  );
}

export default Like;
