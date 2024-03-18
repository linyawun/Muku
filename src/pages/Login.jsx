import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../components/FormElement';
import Loading from '../components/Loading';

function Login() {
  const navigate = useNavigate();
  const defaultVal = useRef({
    username: '',
    password: '',
  });
  const [loginMsg, setLoginMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultVal.current,
    mode: 'onTouched',
  });

  const submit = async (data) => {
    try {
      const res = await axios.post('/v2/admin/signin', data);
      const { token, expired } = res.data;
      if (res.data.success) {
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`; //將 token 存入 cookie
        setLoginMsg('');

        setTimeout(() => {
          navigate('/admin/products');
        }, 500);
      }
    } catch (error) {
      let { code } = error?.response?.data?.error ?? {};
      if (code === 'auth/user-not-found') {
        setLoginMsg('此帳號不存在');
      } else if (code === 'auth/wrong-password') {
        setLoginMsg('密碼錯誤');
      } else if (code === 'auth/invalid-email') {
        setLoginMsg('信箱格式錯誤');
      } else {
        setLoginMsg('登入失敗');
      }
    }
  };

  //取出 token
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];
  axios.defaults.headers.common['Authorization'] = token;
  useEffect(() => {
    //路由保護，確認有token
    if (!token) {
      document.cookie = 'hexToken=';
    }
    //確認token正確性與時效
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.post('/v2/api/user/check');
        if (res.data.success) {
          navigate('/admin/products');
        }
        setIsLoading(false);
      } catch (error) {
        if (!error.response.data.success) {
          document.cookie = 'hexToken=';
        }
        setIsLoading(false);
      }
    })();
  }, [navigate, token]);

  return (
    <div className='container login'>
      <Loading isLoading={isLoading} />
      <div className='row justify-content-center align-items-center flex-md-row flex-column-reverse'>
        <div className='col-md-5 d-flex'>
          <form onSubmit={handleSubmit(submit)} className='col'>
            <small className='text-muted mb-2'>Muku. 純粹美好的穿衣日常</small>
            <h2 className='mb-3'>登入帳號</h2>
            <div
              className={`alert alert-danger ${
                loginMsg ? 'd-block' : 'd-none'
              }`}
              role='alert'
            >
              {loginMsg}
            </div>
            <div className='mb-3'>
              <Input
                register={register}
                errors={errors}
                id='username'
                type='email'
                labelText='帳號'
                rules={{
                  required: {
                    value: true,
                    message: '帳號為必填',
                  },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: '信箱格式錯誤，需有@與.等符號',
                  },
                }}
              />
            </div>
            <div className='mb-3'>
              <Input
                register={register}
                errors={errors}
                id='password'
                type='password'
                labelText='密碼'
                rules={{
                  required: {
                    value: true,
                    message: '密碼為必填',
                  },
                  minLength: {
                    value: 8,
                    message: '密碼長度需大於 8',
                  },
                }}
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              aria-label='Login'
            >
              登入
            </button>
          </form>
        </div>
        <div className='col-md-6'>
          <img
            src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            alt=''
            className='object-cover img-fluid mb-md-0 mb-4'
            height={800}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
