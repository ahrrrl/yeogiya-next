import { getSpaceDetail } from '@/app/lib/apis/activities';
import styles from './SpaceDetail.module.scss';
import SpaceDetailCalendar from './components/SpaceDetailCalendar';
import Image from 'next/image';

export default async function SpaceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const detail = await getSpaceDetail(params.id);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{detail.title}</h1>
      <div className={styles.bannerImageContainer}>
        <Image
          src={detail.bannerImageUrl}
          alt={detail.title}
          layout='fill'
          objectFit='cover'
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.subtitle}>공간 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>카테고리</span>
            <span className={styles.infoValue}>{detail.category}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>가격</span>
            <span className={styles.infoValue}>
              {detail.price.toLocaleString()}원
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>주소</span>
            <span className={styles.infoValue}>{detail.address}</span>
          </div>
        </div>

        <div className={styles.descriptionBox}>
          <h3 className={styles.descriptionTitle}>설명</h3>
          <p className={styles.description}>{detail.description}</p>
        </div>

        <div className={styles.reviewBox}>
          <h3 className={styles.subtitleSmall}>리뷰</h3>
          <div className={styles.rating}>
            <span className={styles.ratingScore}>{detail.rating}</span>
            <span className={styles.ratingMax}>/5 ★</span>
            <span className={styles.reviewCount}>
              ({detail.reviewCount} 리뷰)
            </span>
          </div>
        </div>

        <div>
          <h2 className={styles.subtitle}>예약 가능한 일정</h2>
          <SpaceDetailCalendar schedules={detail.schedules} />
        </div>
      </div>

      <div className={styles.subImagesContainer}>
        <h2 className={styles.subtitle}>추가 이미지</h2>
        <div className={styles.subImagesGrid}>
          {detail.subImages.map((img) => (
            <div key={img.id} className={styles.subImageContainer}>
              <Image
                src={img.imageUrl}
                alt='공간 이미지'
                layout='fill'
                objectFit='cover'
                className={styles.subImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
