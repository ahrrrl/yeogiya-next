'use client';

import React, { useState, ChangeEvent } from 'react';
import { useFormState } from 'react-dom';
import styles from './Create.module.scss';
import { create } from '@/app/lib/actions';
import { redirect } from 'next/navigation';

type Schedule = {
  date: string;
  startTime: string;
  endTime: string;
};

function Create() {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);
  const [price, setPrice] = useState<string>('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [state, formAction] = useFormState(create, null);

  const handleBannerImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const handleSubImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3);
      setSubImages(files);
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setPrice(Number(value).toLocaleString());
  };

  const handleScheduleChange = (
    index: number,
    field: keyof Schedule,
    value: string
  ) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = value;
    setSchedules(newSchedules);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { date: '', startTime: '', endTime: '' }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // 가격 처리: 쉼표 제거
    formData.set('price', price.replace(/,/g, ''));

    // 이미지 파일 추가
    if (bannerImage) formData.set('bannerImage', bannerImage);
    subImages.forEach((file, index) => {
      formData.append('subImages', file);
    });

    // 스케줄 데이터 추가
    formData.append('schedules', JSON.stringify(schedules));
    formAction(formData);
  };
  if (state?.id) {
    redirect(`/dashboard`);
  }

  return (
    <main className={styles.main}>
      <h1>추가하기 페이지</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id='title'
            name='title'
            type='text'
            placeholder='제목'
            required
          />
          <input
            id='description'
            name='description'
            type='text'
            placeholder='내용'
            required
          />
          <select name='category' required>
            <option value='문화 · 예술'>문화 · 예술</option>
            <option value='식음료'>식음료</option>
            <option value='스포츠'>스포츠</option>
            <option value='투어'>투어</option>
            <option value='관광'>관광</option>
            <option value='웰빙'>웰빙</option>
          </select>
          <input
            id='address'
            name='address'
            type='text'
            placeholder='주소'
            required
          />
          <input
            id='price'
            name='price'
            type='text'
            placeholder='가격'
            value={price}
            onChange={handlePriceChange}
            required
          />
          <input
            type='file'
            accept='image/*'
            name='bannerImage'
            onChange={handleBannerImageChange}
            required
          />
          {bannerImage && (
            <img src={URL.createObjectURL(bannerImage)} alt='Banner Preview' />
          )}
          <input
            type='file'
            accept='image/*'
            name='subImages'
            multiple
            onChange={handleSubImagesChange}
          />
          {subImages.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Sub Image Preview ${index + 1}`}
            />
          ))}
          {schedules.map((schedule, index) => (
            <div key={index}>
              <input
                type='date'
                value={schedule.date}
                onChange={(e) =>
                  handleScheduleChange(index, 'date', e.target.value)
                }
                required
              />
              <input
                type='time'
                value={schedule.startTime}
                onChange={(e) =>
                  handleScheduleChange(index, 'startTime', e.target.value)
                }
                required
              />
              <input
                type='time'
                value={schedule.endTime}
                onChange={(e) =>
                  handleScheduleChange(index, 'endTime', e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type='button' onClick={addSchedule}>
            스케줄 추가
          </button>
          <button type='submit'>제출</button>
        </form>
      </div>
      {state && <p>{state.message}</p>}
    </main>
  );
}

export default Create;
