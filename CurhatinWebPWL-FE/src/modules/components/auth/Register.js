import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = { username, email, password };

    axios
      .post('http://localhost:8080/user', postData)
      .then((response) => {
        const userData = response.data.data[0];
        if (!userData) {
          alert('Failed to Register');
        } else {
          localStorage.setItem('userId', userData.id);
          localStorage.setItem('username', userData.username);
          navigate('/home');
          alert('Register successful');
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert('Failed to Register');
        }
      });
  };

  return (
    <div>
      <div className='register container w-50 mb-5 '>
        <div className='row registerForm '>
          <div className='col gambarform bg-register-kiri d-flex flex-center'>
            <div className='d-flex flex-center row'>
              <img
                src={require('../../../asset/undraw_welcome_re_h3d9 1.png')}
                style={{
                  objectFit: 'cover',
                  height: '250px',
                  width: '320px',
                }}
              />
              <div
                className='row text-center mt-3'
                style={{ color: '#1D82E3', fontWeight: 'bold' }}
              >
                <h4 style={{ fontWeight: '600' }}>Hai! Salam Kenal!</h4>
              </div>
            </div>
          </div>
          <div className='col card-1 p-3'>
            <form onSubmit={handleSubmit}>
              <h1
                className='mt-4 mb-4'
                style={{ fontWeight: 'bold', color: '#1D82E3' }}
              >
                Daftar
              </h1>
              <div className='mb-2 px-4'>
                <label htmlFor='usernameForm' className='form-label'>
                  Username
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='usernameForm'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='mb-2 px-4'>
                <label htmlFor='emailForm' className='form-label'>
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='emailForm'
                  placeholder='Email@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='mb-2 px-4'>
                <label htmlFor='passwordForm' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='passwordForm'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='d-grid mt-4 px-4'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  Daftar
                </button>
              </div>
              <div
                className='text-center mt-1 mb-3'
                style={{ fontSize: '16px' }}
              >
                <p>
                  Sudah memiliki akun?{' '}
                  <Link to='/login' className='lupa'>
                    Masuk
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;