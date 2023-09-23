import InputBox from '@/components/InputBox';
// import { useState } from 'react';
// import debounce from '@/utils/debounce';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import useAuthStore from '@/store/auth';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

function SignIn() {
  const navigate = useNavigate();
  // const [formState, setFormState] = useState({
  //   id: '',
  //   password: '',
  // });

  const { isValid, signIn } = useAuthStore();

  const idRef = useRef('');
  const passwordRef = useRef('');

  // const handleInput = debounce((e) => {
  //   const { name, value } = e.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // }, 100);

  const handleSignIn = async (e) => {
    e.preventDefault();
    // const { id, password } = formState;

    console.log('id', idRef.current.value);
    console.log('pw', passwordRef.current.value);
    try {
      await signIn(idRef.current.value, passwordRef.current.value);
    } catch (error) {
      toast.error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    console.log(isValid);
    if (isValid) {
      navigate('/home');
    }
  }, [isValid]);

  return (
    <>
      <div className="loginContainer m-auto flex justify-center flex-wrap flex-col -bg--fridge-secondary w-screen">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="pt-[100px] pb-[15px] h-[188px]">
          <h1 className="text-[35px] -text--fridge-black font-dohyeon font-normal text-center">
            로그인
          </h1>
        </div>
      </div>
      <div className="formContainer w-full flex justify-center items-center flex-wrap flex-col">
        <div className="px-[20px] w-full max-w-[820px]">
          <form onSubmit={handleSignIn}>
            <label
              htmlFor="id"
              className="text-[15px] -text--fridge-black font-dohyeon mt-[43px] block"
            >
              아이디
              <InputBox
                id="id"
                ref={idRef}
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요."
                // onChange={handleInput}
              />
            </label>
            <label
              htmlFor="password"
              className="text-[15px] -text--fridge-black font-dohyeon mt-3 block"
            >
              비밀번호
              <InputBox
                id="password"
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                // onChange={handleInput}
              />
            </label>
            <div className="w-full h-[30px]"></div>
            <Button type="submit">로그인</Button>
          </form>
        </div>

        <div className="linkContainer w-full max-w-[820px] flex items-end justify-end">
          <Link
            to="/signup"
            className="-text--fridge-black text-xs font-nanum decoration-solid mt-2 px-[20px] underline "
          >
            아직 회원이 아니신가요?
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
