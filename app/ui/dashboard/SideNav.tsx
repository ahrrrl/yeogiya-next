import Link from 'next/link';
import styles from './SideNav.module.scss';
import NavLinks from './NavLinks';
import Image from 'next/image';
import LogoutButton from './LogoutButton';

export default function SideNav() {
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
        <LogoutButton />
      </div>
    </div>
  );
}
