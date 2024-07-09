import SideNav from '../ui/dashboard/SideNav';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['layout-container']}>
      <div className={styles['sidenav-container']}>
        <SideNav />
      </div>
      <div className={styles['main-content']}>{children}</div>
    </div>
  );
}
