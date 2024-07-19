'use client';

import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './LogoutButton.module.scss';

function LogoutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    setIsLoggedIn(!!refreshToken);
  }, []);
  const handleLogout = () => {
    // 쿠키 삭제
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    // 로그인 페이지로 리디렉션
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return isLoggedIn ? (
    <form className={styles['sign-out-form']}>
      <button
        type='button'
        className={styles['sign-out-button']}
        onClick={handleLogout}
      >
        <PowerIcon className={styles['power-icon']} />
        <div className={styles['sign-out-text']}>로그아웃</div>
      </button>
    </form>
  ) : (
    <form className={styles['sign-out-form']}>
      <button
        type='button'
        className={styles['sign-out-button']}
        onClick={handleLogin}
      >
        <PowerIcon className={styles['power-icon']} />
        <div className={styles['sign-out-text']}>로그인</div>
      </button>
    </form>
  );
}

export default LogoutButton;
