import Image from 'next/image';
import styles from './ActivitiesList.module.scss';
import { Activity } from '@/app/lib/tpyes/Activity';
import Link from 'next/link';

interface ActivitiesListProps {
  activities: Activity[];
}

export default async function ActivitiesList({
  activities,
}: ActivitiesListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {activities.map((item) => {
          return (
            <div key={item.id} className={styles.card}>
              <Link href={`dashboard/space/${item.id}`} passHref>
                <div className={styles.imageContainer}>
                  <Image
                    fill
                    object-fit='cover'
                    src={item.bannerImageUrl}
                    alt='activity'
                    className={styles.image}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
              </Link>
              <div className={styles.content}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.price}>{item.price}</div>
                <div className={styles.rating}>{item.rating} ★</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
