import Link from 'next/link';
import styles from './page.module.scss';
import Banner from './ui/main/Banner';

export default async function Home() {
  return (
    <main className={styles.main}>
      <Banner />
      <Link href='/dashboard'>
        <h1>YEOGIYA 지금 시작하기!</h1>
      </Link>
    </main>
  );
}
