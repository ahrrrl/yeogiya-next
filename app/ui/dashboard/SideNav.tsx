import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import styles from './SideNav.module.scss';
import NavLinks from './NavLinks';

export default function SideNav() {
  return (
    <div className={styles.container}>
      <Link className={styles['logo-link']} href='/'>
        <div className={styles.logo}>{/* <AcmeLogo /> */}</div>
      </Link>
      <div className={styles['main-content']}>
        <NavLinks />
        <div className={styles.spacer}></div>
        <form
          className={styles['sign-out-form']}
          // action={async () => {
          //   'use server';
          //   await signOut();
          // }}
        >
          <button className={styles['sign-out-button']}>
            <PowerIcon className={styles['power-icon']} />
            <div className={styles['sign-out-text']}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
