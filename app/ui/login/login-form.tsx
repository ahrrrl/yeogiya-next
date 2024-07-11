'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.scss';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    useActionState;
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = await authenticate(undefined, formData);

      if (result === 'Invalid credentials.') {
        setError(result);
      } else {
        // 로그인 성공 시 대시보드로 리다이렉트
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor='email' className={styles.label}>
          Email
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor='password' className={styles.label}>
          Password
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type='submit' disabled={isPending} className={styles.button}>
        {isPending ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}
