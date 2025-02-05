import {
  homeLine,
  plus,
  heartLine,
  userLine,
  homeFill,
  heartFill,
  userFill,
} from '@/assets/icons/svg-icons.js';
import styles from './Component.module.css';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function NavBar() {
  const { pathname } = useLocation();
  const [homeIcon, setHomeIcon] = useState('');
  const [heartIcon, setHeartIcon] = useState('');
  const [userIcon, setUserIcon] = useState('');

  useEffect(
    () =>
      pathname === '/home' ? setHomeIcon(homeFill) : setHomeIcon(homeLine),
    [pathname]
  );

  useEffect(
    () =>
      pathname === '/recipeliked'
        ? setHeartIcon(heartFill)
        : setHeartIcon(heartLine),
    [pathname]
  );

  useEffect(
    () =>
      pathname === '/myprofile' ? setUserIcon(userFill) : setUserIcon(userLine),
    [pathname]
  );

  if (pathname === '/' || pathname === '/signin' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.items}>
        <Link to="/home" className={styles.item}>
          <img src={homeIcon} className={styles.icon} />
          <span className={styles.text}>홈</span>
        </Link>
        <Link to="/addingredients" className={styles.item}>
          <img src={plus} className={styles.icon} />
          <span className={styles.text}>재료추가</span>
        </Link>
        <Link to="/recipeliked" className={styles.item}>
          <img src={heartIcon} className={styles.icon} />
          <span className={styles.text}>좋아요</span>
        </Link>
        <Link to="/myprofile" className={styles.item}>
          <img src={userIcon} className={styles.icon} />
          <span className={styles.text}>프로필</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
