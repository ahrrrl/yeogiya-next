'use client';

import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import styles from './SideNav.module.scss';
import NavLinks from './NavLinks';
import Image from 'next/image';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const router = useRouter();
  const handleLogout = () => {
    // 쿠키 삭제
    Cookies.remove('accessToken');
    // 로그인 페이지로 리디렉션
    router.push('/login');
  };
  return (
    <div className={styles.container}>
      <Link className={styles['logo-link']} href='/'>
        <div className={styles.logo}>
          <Image fill src='/logo-big.svg' alt='logo' />
        </div>
      </Link>
      <div className={styles['main-content']}>
        <NavLinks />
        <div className={styles.spacer}></div>
        <form className={styles['sign-out-form']}>
          <button
            type='button'
            className={styles['sign-out-button']}
            onClick={handleLogout}
          >
            <PowerIcon className={styles['power-icon']} />
            <div className={styles['sign-out-text']}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
