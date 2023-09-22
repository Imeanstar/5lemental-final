import { heartLine, heartFill } from '@/assets/icons/svg-icons.js';
import useLikeStore from '@/store/like';

function Like({ menuName = '', isLiked = false }) {
  const { addLikedMenu, removeLikedMenu } = useLikeStore();

  // 좋아요 버튼 클릭 시 마다 zustand 의 좋아요 메뉴 list 업데이트
  const handleLikeList = (isLiked) => {
    if (isLiked) {
      removeLikedMenu(menuName);
      isLiked = false;
    } else {
      addLikedMenu(menuName);
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
