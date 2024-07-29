import Link from 'next/link';
import styles from './page.module.css';
import Banner from './ui/main/Banner';

export default async function Home() {
  return (
    <main className={styles.main}>
      <Banner />
      <Link href='/dashboard'>대시보드 이동 </Link>
    </main>
  );
}
