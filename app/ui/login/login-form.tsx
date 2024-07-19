'use client';

import { login } from '@/app/lib/apis/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      // 로그인 성공 시 리다이렉트 또는 다른 동작 수행
      router.push('/dashboard');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '로그인 요청에 실패했습니다.';
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
          required
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
          required
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} type='submit'>
        Login
      </button>
    </form>
  );
}
