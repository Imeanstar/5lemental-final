import InputBox from '@/components/InputBox';
import Button from '@/components/button/Button';
import debounce from '@/utils/debounce';
import S from './SignUp.module.css';
import { useState } from 'react';
import useAuthStore from '@/store/auth';
import pb from '@/api/pocketbase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SignUp() {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);

  const [confirmJoin, setConfirmJoin] = useState(false);

  const [idCheck, setIdCheck] = useState(true);
  const [idAlert, setIdAlert] = useState('사용할 아이디를 작성해주세요.');

  const [nickNameCheck, setNickNameCheck] = useState(true);
  const [nickNameAlert, setNickNameAlert] =
    useState('나만의 닉네임을 지어주세요.');

  const [pwCheck, setPwCheck] = useState(true);
  const [pwAlert, setPwAlert] = useState('비밀번호로 내 정보를 보호해주세요.');

  const [agreeCheck, setAgreeCheck] = useState(false);

  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [formState, setFormState] = useState({
    id: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [checkboxes, setCheckboxes] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
    agreeAll: false,
  });

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 100);

  const handleCheckList = (e) => {
    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
    if (e.target.name === 'agreeAll' && e.target.checked === true) {
      setCheckboxes({
        agree1: true,
        agree2: true,
        agree3: true,
        agreeAll: true,
      });
    } else if (e.target.name === 'agreeAll' && e.target.checked === false) {
      setCheckboxes({
        agree1: false,
        agree2: false,
        agree3: false,
        agreeAll: false,
      });
    }
  };

  const checkSignUp = async (e) => {
    e.preventDefault();
    const { id, nickname, password, passwordConfirm } = formState;

    // 1. 기본 정보 입력, 필수 약관 동의 확인
    if (
      id === '' ||
      nickname === '' ||
      password === '' ||
      passwordConfirm === ''
    ) {
      toast.error('가입 정보를 모두 입력해주세요.');
    }

    if (checkboxes.agree1 !== true || checkboxes.agree2 !== true) {
      toast.error('필수 약관에 동의해주세요.');
    }

    // 2. id, nickname, password, passwordConfirm 유효성 검사
    try {
      const handleIdCheck = async () => {
        console.log('포켓베이스 - id 중복체크');
        const responseID = await pb
          .collection('users')
          .getList(1, 10, { filter: `username = "${id}"` });
        if (/^[a-zA-Z0-9]{5,12}$/.test(id) === true) {
          if (responseID.items.length === 0 && id !== '') {
            setIdCheck(true);
            setIdAlert('멋진 id 네요!');
            setId(id);
          } else if (responseID.items.length > 0) {
            setIdCheck(false);
            setIdAlert('이미 사용중인 아이디입니다.');
            setId('');
          }
        } else {
          setIdCheck(false);
          setIdAlert('영문/숫자 사용, 5 ~ 12자 이내, 특수문자 사용불가');
        }
      };

      const handleNicknameCheck = async () => {
        console.log('포켓베이스 - 닉네임 중복체크');
        const responseNickname = await pb
          .collection('users')
          .getList(1, 10, { filter: `name = "${nickname}"` });
        if (/^[a-zA-Z0-9가-힣]{2,7}$/.test(nickname) === true) {
          if (responseNickname.items.length === 0 && nickname !== '') {
            setNickNameCheck(true);
            setNickNameAlert('멋진 닉네임이네요!');
            setNickname(nickname);
          } else if (responseNickname.items.length > 0) {
            setNickNameCheck(false);
            setNickNameAlert('이미 사용중인 닉네임입니다.');
            setNickname('');
          }
        } else {
          setNickNameCheck(false);
          setNickNameAlert(
            '한글/영문/숫자 사용, 2 ~ 7 자 이내, 특수문자 사용불가'
          );
        }
      };

      const handlepasswordConfirm = () => {
        console.log('비밀번호 입력 확인');
        if (
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{5,12}$/.test(
            password
          ) === true
        ) {
          if (
            password === passwordConfirm &&
            password !== '' &&
            passwordConfirm !== ''
          ) {
            setPwCheck(true);
            setPwAlert('비밀번호가 일치합니다.');
            setPassword(password);
            setPasswordConfirm(passwordConfirm);
          } else if (password !== passwordConfirm) {
            setPwCheck(false);
            setPwAlert('비밀번호가 일치하지 않습니다.');
            setPassword('');
            setPasswordConfirm('');
          }
        } else {
          setPwCheck(false);
          setPwAlert('5 ~ 12자 이내, 특수문자 1개 이상 사용 필수');
        }
      };

      handleIdCheck();
      handleNicknameCheck();
      handlepasswordConfirm();
    } catch (error) {
      console.error(error);
    }

    if (
      (checkboxes.agree1 === true && checkboxes.agree2 === true) ||
      checkboxes.agreeAll === true
    ) {
      setAgreeCheck(true);
    }
  };

  useEffect(() => {
    if (
      id !== '' &&
      nickname !== '' &&
      password !== '' &&
      passwordConfirm !== ''
    ) {
      if (agreeCheck === true) {
        setConfirmJoin(true);
        console.log('회원가입 가능');
      }
    }
  }, [id, nickname, password, passwordConfirm, agreeCheck]);

  useEffect(() => {
    if (confirmJoin === true) {
      console.log('회원가입 시도', confirmJoin);
      handleJoin(id, nickname, password, passwordConfirm);
    }
  }, [confirmJoin]);

  const handleJoin = (username, name, password, passwordConfirm) => {
    const newUser = {
      username,
      name,
      password,
      passwordConfirm,
    };

    signUp(newUser).then(() => {
      toast.success('회원가입이 완료되었습니다.');
      setTimeout(() => {
        navigate('/signin');
      }, 1000);
    });
  };

  return (
    <>
      <div className="wrapper m-auto mt-3">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          limit={1}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <form onSubmit={checkSignUp}>
          <div className="signUpWrapper -bg--fridge-secondary flex justify-center items-center flex-wrap flex-col w-screen pt-3 pb-3">
            <div className="signUpContainer w-full max-w-[820px] px-[20px]">
              <h2 className="font-dohyeon -text--fridge-black text-[15px] text-left mb-1">
                가입 정보
              </h2>
              <InputBox
                id="id"
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요."
                onChange={handleInput}
              />
              <p className={idCheck === true ? S.normal : S.alert}>{idAlert}</p>
              <InputBox
                id="nickname"
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요."
                onChange={handleInput}
              />
              <p className={nickNameCheck === true ? S.normal : S.alert}>
                {nickNameAlert}
              </p>
              <InputBox
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handleInput}
              />
              <InputBox
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호를 다시 입력해주세요."
                onChange={handleInput}
              />
              <p className={pwCheck === true ? S.normal : S.alert}>{pwAlert}</p>
            </div>
          </div>
          <div className="agreementWrapper -bg--fridge-white w-full max-w-[820px] flex justify-center m-auto flex-wrap flex-col px-[20px] py-[10px]">
            <h2 className="font-dohyeon -text--fridge-black text-[15px] text-left mb-1">
              약관 동의
            </h2>
            <div className="agreementContainer w-full px-[10px]">
              <ul className="agreementList flex flex-col gap-1">
                <li className="agreement agree1 text-[13px] font-nanum -text--fridge-input-gray flex justify-between">
                  <span className="-text--fridge-red pr-[2px]">*</span>
                  <label
                    htmlFor="agree1"
                    className={
                      checkboxes.agree1 === true || checkboxes.agreeAll === true
                        ? S.agreed
                        : S.notAgreed
                    }
                  >
                    비우자냉장고 이용약관 동의 (필수)
                  </label>
                  <input
                    className={S.agreeBox}
                    checked={checkboxes.agree1}
                    onChange={handleCheckList}
                    type="checkbox"
                    name="agree1"
                    id="agree1"
                  />
                </li>
                <li className="agreement agree2 text-[13px] font-nanum -text--fridge-input-gray flex justify-between">
                  <span className="-text--fridge-red pr-[2px]">*</span>
                  <label
                    htmlFor="agree2"
                    className={
                      checkboxes.agree2 === true || checkboxes.agreeAll === true
                        ? S.agreed
                        : S.notAgreed
                    }
                  >
                    개인정보 수집 이용 동의 (필수)
                  </label>
                  <input
                    className={S.agreeBox}
                    checked={checkboxes.agree2}
                    onChange={handleCheckList}
                    type="checkbox"
                    name="agree2"
                    id="agree2"
                  />
                </li>
                <li className="agreement agree3 text-[13px] font-nanum -text--fridge-input-gray flex justify-between">
                  <label
                    htmlFor="agree3"
                    className={
                      checkboxes.agree3 === true || checkboxes.agreeAll === true
                        ? S.agreed
                        : S.notAgreed
                    }
                  >
                    이벤트 및 혜택 정보 제공 동의 (선택)
                  </label>
                  <input
                    className={S.agreeBox}
                    checked={checkboxes.agree3}
                    onChange={handleCheckList}
                    type="checkbox"
                    name="agree3"
                    id="agree3"
                  />
                </li>
                <li className="agreement agreeAll text-[13px] font-nanum -text--fridge-black font-semibold flex justify-between">
                  <label
                    htmlFor="agreeAll"
                    className={
                      checkboxes.agreeAll === true ? S.agreed : S.notAgreed
                    }
                  >
                    [전체] 약관 동의하기
                  </label>
                  <input
                    className={S.agreeBox}
                    checked={checkboxes.agreeAll}
                    onChange={handleCheckList}
                    type="checkbox"
                    name="agreeAll"
                    id="agreeAll"
                  />
                </li>
              </ul>
            </div>
            <div className="w-full h-3"></div>
            <Button type="submit">회원가입</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
