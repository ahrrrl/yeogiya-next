import styles from './page.module.css';
import { fetchActivities } from './lib/apis/activities';

export default async function Home() {
  const { activities } = await fetchActivities();
  return (
    <main className={styles.main}>
      {activities.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.price}</div>
          </div>
        );
      })}
    </main>
  );
}
