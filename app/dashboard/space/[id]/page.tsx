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

      <div className={styles.grid}>
        <div>
          <h2 className={styles.subtitle}>공간 정보</h2>
          <p>
            <strong>카테고리:</strong> {detail.category}
          </p>
          <p>
            <strong>가격:</strong> {detail.price}원
          </p>
          <p>
            <strong>주소:</strong> {detail.address}
          </p>
          <p>
            <strong>설명:</strong> {detail.description}
          </p>

          <h3 className={styles.subtitleSmall}>리뷰</h3>
          <p>
            <strong>평점:</strong> {detail.rating}/5 ({detail.reviewCount} 리뷰)
          </p>
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
