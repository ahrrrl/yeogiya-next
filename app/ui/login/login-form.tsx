'use client';

import Cookies from 'js-cookie';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://sp-globalnomad-api.vercel.app/3-6/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || '로그인 요청에 실패했습니다.');
        return;
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data;

      // 토큰을 쿠키에 저장
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);

      // 로그인 성공 시 리다이렉트 또는 다른 동작 수행
      window.location.href = '/dashboard';
    } catch (err) {
      setError('로그인 요청에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type='submit'>Login</button>
    </form>
  );
}
