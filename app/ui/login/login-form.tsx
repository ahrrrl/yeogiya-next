'use client';

import { login } from '@/app/lib/apis/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './LoginForm.module.scss';
import useUserStore from '@/app/bearStore/store';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login: setLogin } = useUserStore((state) => state);

  interface CustomError extends Error {
    response?: {
      data: {
        message: string;
      };
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      setLogin(user);
      // 로그인 성공 시 리다이렉트 또는 다른 동작 수행
      window.location.href = '/dashboard';
      // router.push('/dashboard');
    } catch (err) {
      console.log(err);
      const errorMessage =
        err instanceof Error
          ? (err as CustomError).response?.data.message || err.message
          : '로그인 요청에 실패했습니다.';
      setError(errorMessage);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <input
          className={styles.input}
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor='password'>
          Password
        </label>
        <input
          className={styles.input}
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} type='submit'>
        Login
      </button>
    </form>
  );
}
