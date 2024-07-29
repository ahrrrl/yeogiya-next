'use client';

import React from 'react';
import Image from 'next/image';
import useBanner, { BANNER } from '@/app/hooks/useBanner';
import CarouselArrow from './CarouselArrow';
import styles from './Banner.module.scss';

export default function Banner() {
  const { handleSlide, startAutoSlide, stopAutoSlide, slideRef } = useBanner();

  // YEOGIYA를 스타일링한 React 요소를 반환하는 함수
  const stylizeYeogiya = (text: string, isTitle: boolean) =>
    text
      .replace('YEOGIYA', '##YEOGIYA##')
      .split('##')
      .map((part, index: number) =>
        part === 'YEOGIYA' ? (
          <span
            key={index}
            className={
              isTitle ? styles.yeogiyaTitleText : styles.yeogiyaDescriptionText
            }
          >
            YEOGIYA
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      );

  return (
    <div
      className={styles.bannerContainer}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className={styles.bannerSlideWrapper} ref={slideRef}>
        {BANNER.map((data) => (
          <div key={data.id} className={styles.bannerSlide}>
            <div className={styles.imageWrapper}>
              <Image
                src={data.src}
                alt={data.title}
                layout='fill'
                objectFit='cover'
                className={styles.mainBannerImage}
              />
            </div>
            <div>
              <h1
                className={`${styles.mainBannerTitle} ${
                  data.id === 4 ? styles.specialTitle : ''
                }`}
              >
                {stylizeYeogiya(data.title, true)}
              </h1>
              <h2
                className={`${styles.mainBannerDescription} ${
                  data.id === 4 ? styles.specialDescription : ''
                }`}
              >
                {stylizeYeogiya(data.description, false)}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <CarouselArrow
        className={styles.leftArrow}
        onClick={() => handleSlide(-1)}
      />
      <CarouselArrow
        className={styles.rightArrow}
        onClick={() => handleSlide(1)}
        direction='next'
      />
    </div>
  );
}
