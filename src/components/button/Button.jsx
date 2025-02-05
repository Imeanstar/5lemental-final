import { useNavigate } from 'react-router-dom';
import S from './Button.module.css';

function Button({
  small = false,
  type = 'button',
  navigateTo = '/',
  ...restProps
}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (type === 'button') {
      if (navigateTo === '-1') {
        navigate(-1);
      } else {
        navigate(navigateTo);
      }
    }
  };
  return (
    <button
      type={type}
      className={small ? S.small : S.large}
      {...restProps}
      onClick={handleNavigate}
    ></button>
  );
}

export default Button;
