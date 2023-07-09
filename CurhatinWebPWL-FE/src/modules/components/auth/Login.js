import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = { email, password };

    axios
      .post('http://localhost:8080/user/auth', postData)
      .then((response) => {
        const userData = response.data.data[0];
        if (!userData) {
          alert('Failed to login');
        } else {
          localStorage.setItem('userId', userData.id);
          localStorage.setItem('username', userData.username);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Email atau Password Salah');
      });
  };

  return (
    <div className='login container w-50 mb-5 '>
      <div className='row loginForm '>
        <div className='col card-1 p-3'>
          <h1 className='mt-4 mb-5' style={{ fontWeight: 'bold', color: '#1D82E3' }}>
            Masuk
          </h1>
          <form onSubmit={handleSubmit}>
            <div class='mb-3 px-4'>
              <label for='emailForm' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                class='form-control'
                id='emailForm'
                placeholder='Email@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class='mb-3 px-4'>
              <label for='passwordForm' className='form-label'>
                Password
              </label>
              <input
                type='password'
                class='form-control'
                id='passwordForm'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a className='text-end lupa' style={{ fontSize: '16px' }}>
                <p className='mt-1'>Lupa Kata Sandi?</p>
              </a>
            </div>
            <div className='d-grid mt-4 px-4'>
              <button
                type='submit'
                class='btn btn-primary'
                style={{
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                Masuk
              </button>
            </div>
          </form>
          <div className='text-center mt-1 mb-3' style={{ fontSize: '16px' }}>
            <p>
              Belum memiliki akun? <Link to='/register' className='lupa'>Daftar</Link>
            </p>
          </div>
        </div>
        <div className='col gambarform bg-login-kanan d-flex flex-center'>
          <div className='d-flex flex-center row'>
            <img
              src={require('../../../asset/undraw_login_re_4vu2 1.png')}
              style={{ objectFit: 'cover', height: '220px' }}
            />
            <div className='row text-center mt-3' style={{ color: '#1D82E3', fontWeight: 'bold' }}>
              <h4 style={{ fontWeight: '600' }}>Ada Cerita Baru Apa</h4>
              <h4 style={{ fontWeight: '600' }}>Hari Ini?</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
